<template>
  <div class="text-center">
    <v-menu
      :close-on-content-click="false"
      :nudge-width="250"
      offset-y
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                icon
                v-bind="attrs"
                v-on="on"
            >
                <v-badge v-if="isNotiOn" color="pink" overlap dot>
                    <v-icon>mdi-email</v-icon>
                </v-badge>
                <v-icon v-if="!isNotiOn">mdi-email</v-icon>
            </v-btn>
        </template>

        <v-card class="mx-auto" max-width="300" tile>
            <v-toolbar
                color="primary"
                dark
            >
                <v-toolbar-title>Notification</v-toolbar-title>

                <v-spacer></v-spacer>
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            icon
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item class="hoverNotification">
                            <v-list-item-title>Mark as read all</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-toolbar>
            <v-list dense>
                <template>
                    <template>
                        <Message 
                            v-for="item in chatRooms" 
                            :key="item.recieverID" 
                            :chatRoom="item"
                        />
                    </template>
                </template>
            </v-list>
        </v-card>
    </v-menu>
  </div>
</template>

<script>
import Message from '../Message/Message.vue'
import * as socketio from "../../plugins/socket.client"

export default {
    components: { Message },
    props: {

    },
    computed: {
        senderID() {
            return this.$store.state.chat.senderID
        }
    },
    async created() {
        await this.getChatRooms()
    },
    mounted() {
        socketio.addEventListener({
            type: `create_new_room_${this.senderID}`,
            callback: async data => {
                console.log('create room: ', data)
                await this.getChatRooms()
            }
        })

        socketio.addEventListener({
            type: `recieve_message_${this.senderID}`,
            callback: async data => {
                console.log('recieve ')
                await this.getChatRooms()
            }
        })

        socketio.addEventListener({
            type: `recieve_message_list_${this.senderID}`,
            callback: async data => {
                console.log('recieve_message_list ')
                await this.getChatRooms()
            }
        })
    },
    methods: {
        async getChatRooms() {
            const userId = this.senderID
            await this.$store.dispatch("getChatRooms", {
                userId,
                onSuccess: data => {
                    console.log('rooms: ', data)

                    this.chatRooms = data.map(room => {
                        const recieverID = room.members.find(member => member != this.senderID)
                        console.log((room.is_read && (room.latest_message.author != this.senderID)) ? this.isNotiOn : true)
                        if(!room.is_read && room.latest_message.author != this.senderID) {
                            this.isNotiOn = true
                        }
                        return { ...room, recieverID }
                    })

                    this.chatRooms.sort((a, b) => {
                        return new Date(b.latest_update) - new Date(a.latest_update);
                    })
                },
                onError: err => {
                    console.log("Chat Error: ", err)
                }
            })
        },
        handleRouteToArticle(noti) {
            
        },
        showDotsDialog(e) {
            this.dotsDialog = !this.dotsDialog;
        },
        handleCreateNotification() {
            this.createNotiDialog = !this.createNotiDialog;
        }
    },
    data: () => ({
        createNotiDialog: false,
        dotsDialog: false,
        menuPosition: {
            x: 0,
            y: 0
        },
        changes: '',
        limit: 1000,
        skip: 0,
        isLoading: true,
        chatRooms: [],
        isNotiOn: false
    }),
}
</script>

<style scoped>
.hoverNotification {
    cursor: pointer;
}

.hoverNotification:hover {
    background-color: #F6F6F6
}

.line-clamp {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>