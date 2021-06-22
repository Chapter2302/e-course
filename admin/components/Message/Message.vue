<template>
    <v-list-item class="px-6" @click="openChat">
        <v-list-item-action class="mr-4">
            <v-avatar size="40px">
                <img
                    :src="recieverAva"
                    alt="John"
                >
            </v-avatar>
        </v-list-item-action>
        <v-list-item-content>
            <div class="font-weight-bold">{{recieverName}}</div>
            <div :class="!chatRoom.is_read && chatRoom.latest_message.author != senderID ? 'unseen' : ''" class="text-sm-body-2 line-clamp">{{chatRoom.latest_message.data.text}}</div>
        </v-list-item-content>
    </v-list-item>
</template>

<script>
import * as socketio from "../../plugins/socket.client"

export default {
    props: {
        chatRoom: { typpe: Object }
    },
    computed: {
        senderID() {
            return this.$store.state.chat.senderID
        },
    },
    async created() {
        const userId = this.chatRoom.recieverID
        await this.$store.dispatch("getUser", {
            userId,
            onSuccess: data => {
                console.log('user: ', data.full_name)
                this.recieverName = data.full_name
                this.recieverAva = data.avatar
            },
            onError: err => {
                console.log("Get User Error: ", err)
            }
        })
    },
    data() {
        return {
            recieverName: "",
            recieverAva: ""
        }
    },
    methods: {
        openChat() {
            socketio.sendEvent({
                type: "get_message_list",
                data: {
                    senderID: this.senderID, 
                    recieverID: this.chatRoom.recieverID
                }
            })
            this.$store.commit('chat/openChat')
            this.$store.commit('chat/setReciver', {
                id: this.chatRoom.recieverID,
                name: this.recieverName,
                avatar: this.recieverAva
            })
        }
    }
}
</script>

<style>
.line-clamp {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.unseen {
    color: #bc4d5f;
    font-weight: 600 !important;
}
</style>