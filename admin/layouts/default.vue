<template>
  <v-app light>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      fixed 
      :width="$device.isMobile ? '260' : '200'"
      app
    >
      <v-list class="pt-0">
        <v-list-item class="site-info px-4">
          <v-list-item-action>
            <div class="logo-page">
              <img src="" style="width : 100%" alt />
            </div>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">ECourse</v-list-item-title>
            <v-list-item-subtitle>
              <a
                href="/"
                target="_blank"
                class="white--text text-decoration-none"
              >
                abc.com.vn
              </a>
              <v-icon
                style="float: right"
                small
                color="white"
              >mdi-cog</v-icon>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <!-- Render navigation's items -->
        <v-list class="py-0" v-for="item in navigationContent" :key="item.name">

          <!-- Render with subitems -->
          <v-list-group
            :value="false"
            v-if="item.subItems"
          >
            <template v-slot:activator>
              <v-list-item-action class="mr-2">
                <v-icon small>{{item.icon}}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="text-sm-body-2">{{item.name}}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list class="py-0" v-for="subItem in item.subItems" :key="subItem.name">
              <!-- Render with children -->
              <v-list-group v-if="subItem.children">
                <template v-slot:activator>
                  <v-list-item-action class="pl-3 mr-2">
                    <v-icon small>{{subItem.icon}}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title class="text-sm-body-2">{{subItem.name}}</v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item 
                  v-for="child in subItem.children" 
                  :key="child.name" class="pl-12" 
                  :to="child.link" exact
                >
                  <v-list-item-action class="mr-2">
                    <v-icon small>{{child.icon}}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title class="text-sm-body-2" v-text="child.name"/>
                  </v-list-item-content>  
                </v-list-item>
              </v-list-group>

              <!-- Render with no children -->
              <v-list-item class="pl-6" v-if="!subItem.children" :to="subItem.link">
                <v-list-item-action class="mr-2">
                  <v-icon small>{{subItem.icon}}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="text-sm-body-2" v-text="subItem.name"/>
                </v-list-item-content>  
              </v-list-item>
            </v-list>
          </v-list-group>

          <!-- Render with no subitems -->
          <v-list-item exact :to="item.link" v-if="!item.subItems || item.subItems === 0">
            <v-list-item-action class="mr-2">
              <v-icon small>{{item.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="text-sm-body-2" v-text="item.name" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app fixed height="61" flat>
      <v-btn class="hidden-lg-and-up" icon @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-btn class="hidden-md-and-down" icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-spacer />
      <Notification />
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <div v-on="on" v-bind="attrs">
            <v-avatar height="40" width="40">
              <img :src="userAva ? userAva : require('../assets/medias/images/defaultuserimg.png')"/>
            </v-avatar>
            <span>{{userName}}</span>
          </div>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title 
              class="logout-btn" 
              @click="handleLogout"
              style="cursor: pointer"
            >Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <beautiful-chat
      :participants="[reciever]"
      :onMessageWasSent="onMessageWasSent"
      :messageList="messageList"
      :newMessagesCount="0"
      :isOpen="isChatOpen"
      :close="onChatClose"
      :open="onChatOpen"
      :colors="colors"
      :disableUserListToggle="true"
      :showLauncher="false"
    >
      <template v-slot:header>
        <img 
          :src="reciever.avatar" 
          alt="" class="sc-header--img"
        >
        <div class="sc-header--title">{{reciever.name}}</div>
      </template>
    </beautiful-chat>
    <v-footer
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import {adminNavigationContent, teacherNavigationContent} from "../static/navigation.js";
import Notification from "../components/Notification/Notification.vue"
import * as socketio from "../plugins/socket.client"

export default {
  components: { Notification },
  computed: {
    isChatOpen() {
      return this.$store.state.chat.isOpen
    },
    senderID() {
      return this.$store.state.chat.senderID
    },
    reciever() {
      return this.$store.getters['chat/getReciever']
    },
    messageList() {
      return this.$store.state.chat.messageList
    },
  },
  data () {
    return {
      colors: {
        header: {
          bg: '#821431', 
          text: '#ffffff'
        },
        launcher: {
          bg: '#4e8cff'
        },
        messageList: {
          bg: '#f2f2f2'
        },
        sentMessage: {
          bg: '#821431',
          text: '#ffffff'
        },
        receivedMessage: {
          bg: '#eaeaea',
          text: '#222222'
        },
        userInput: {
          bg: '#f4f7f9',
          text: '#821431'
        }
      },
      drawer: true,
      navigationContent: "",
      userName: "",
      userAva: "",
      userRole: "",
      miniVariant: false,
      title: 'E-Course',
      chatRooms: []
    }
  },
  async created() {
    const session = JSON.parse(localStorage.getItem("session"))
    if(!session) {
      this.$router.push("/login");
    } else {
      const userId = session.id
      this.userRole = session.role
      this.userName = session.fullName
      this.userAva = session.photoUser

      this.$store.commit('chat/setSenderID', userId)

      if(session.role === "admin")
        this.navigationContent = adminNavigationContent
      else 
        this.navigationContent = teacherNavigationContent
        
      await this.$store.dispatch("authCheck", {
          userId,
          onSuccess: async data => {
            console.log('hello: ', data)
          },
          onError: err => {
              console.log("Auth Error: ", err)
              this.$router.push("/login");
          }
      });
    }
  },
  mounted() {
    socketio.addEventListener({
      type: `recieve_message_${this.senderID}`,
      callback: (data) => {
        console.log('recieve: ', data)
        const message = {
          ...data.message,
          author: data.message.author == this.senderID ? 'me' : data.message.author
        }
        this.$store.commit('chat/insertNewMessage', message) 
      }
    })

    socketio.addEventListener({
      type: `recieve_message_list_${this.senderID}`,
      callback: (data) => {
        console.log('recieve_message_list: ', data, this.senderID)
        const messageList = data.messageList.map(message => {
          return {
            ...message,
            author: message.author == this.senderID ? 'me' : message.author
          }
        })
        this.$store.commit('chat/setMessageList', messageList) 
      }
    })
  },
  methods: {
    barNavClick: function() {
      if (this.$device.isDesktop) {
        this.miniVariant = !this.miniVariant;
      } else {
        console.log(this.$device)
        this.drawer = !this.drawer;
      }
    },
    handleLogout() {
      localStorage.removeItem("session")
      this.$router.push("/login");
    },
    onMessageWasSent(message) {
      socketio.sendEvent({
        type: "send_message",
        data: {
          message: message,
          senderID: this.senderID, 
          recieverID: this.reciever.id
        }
      })

      this.$store.commit('chat/insertNewMessage', message) 
    },
    onChatOpen() {
      this.$store.commit('chat/openChat')
    },
    onChatClose() {
      this.$store.commit('chat/closeChat')
    }
  }
}
</script>
<style>
.site-info {
  background: var(--v-primary-base);
}

.logo-page {
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background-color: white;
}

.sc-chat-window {
  z-index: 1000;
  right: 0px !important;
  bottom: 0px !important;
  width: 350px !important;
  height: calc(100vh - 140px) !important;
}

.sc-header--img {
  padding: 0px !important;
  margin: 5px 10px;
  width: 45px;
  height: 45px;
  background-color: white;
}

.sc-header--title {
  font-size: 18px !important;
}

.sc-message--text-content {
  margin: 10px 0px !important
}
</style>
