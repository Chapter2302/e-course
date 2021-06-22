<template>
    <div class="wrapper px-4">
        <div class="d-flex mt-3">
            <v-btn color="primary">
                Filter
                <v-icon small right>mdi-filter</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-alert dense :type="deleteAlert.type">{{deleteAlert.message}}</v-alert>
            <v-btn class="ml-2" color="primary" @click="openCreatorDialog">
                Create
                <v-icon small right>fas fa-plus</v-icon>
            </v-btn>
        </div>

        <!-- CreatorDialog -->
            <UserCreatorDialog @closeDialog="closeCreatorDialog" :dialog="creatorDialog"/>
        <!-- CreateDialog -->

        <!-- EditorDialog -->
            <UserEditorDialog @closeDialog="closeEditorDialog" :user="selectedUser" :dialog="editorDialog"/>
        <!-- EdiorDialog -->

        <!-- Delete Dialog -->
        <v-dialog max-width="300" v-model="deleteDialog" >
            <v-card class="py-4">
                <v-card-title class="d-flex justify-center">Do you want to delete?</v-card-title>
                <v-card-actions class="d-flex justify-center ">
                    <v-btn color="primary" class="mr-2" @click="deleteDialog = false">
                        Close
                    </v-btn>
                    <v-btn color="primary" @click="clickConfirmDelete">
                        Confirm
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- Delete Dialog -->

        <!-- User Table -->
        <v-data-table
            :headers="userTableHeaders"
            :items="userTableItems" dense
            :single-select="false" class="mt-8"
            item-key="_id"
        >
            <!-- Name Custom -->
            <template v-slot:[`item.full_name`]="{ item }">
                <nuxt-link style="color: black; text-decoration: none" :to="`/user/${item._id}`">
                    <div><b>{{item.full_name}}</b></div>
                </nuxt-link>
            </template>
            <!-- Name Custom -->

            <!-- Avatar Custom -->
            <template v-slot:[`item.avatar`]="{ item }">
                <img class="my-2" width="100" height="100" :src="item.avatar"/>
            </template>
            <!-- Avatar Custom -->

            <!-- 3 Actions Buttons -->
            <template v-slot:[`item.actions`]="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn 
                            small icon @click="openChat(item)"
                            class="mx-1" 
                            color="primary"
                            v-on="on" v-bind="attrs"
                        >
                            <v-icon small dense>
                                fas fa-paper-plane
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>Inbox</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn 
                            small icon @click="selectedUser = item; editorDialog = true"
                            class="mx-1" 
                            color="primary"
                            v-on="on" v-bind="attrs"
                        >
                            <v-icon small dense>
                                fas fa-pen
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>Edit</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn 
                            small icon @click="openDeleteDialog(item)"
                            class="mx-1" 
                            color="primary"
                            v-on="on" v-bind="attrs"
                        >
                            <v-icon small dense>
                                fas fa-trash
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>Delete</span>
                </v-tooltip>
            </template>
            <!-- 3 Actions Buttons -->
        </v-data-table>
        <!-- User Table -->
    </div> 
</template>

<script>
import rules from "@/mixins/validationRules"
import UserCreatorDialog from "../../components/UserCreatorDialog/UserCreatorDialog"
import UserEditorDialog from "../../components/UserEditorDialog/UserEditorDialog"
import * as socketio from "../../plugins/socket.client"

export default {
    mixins: { rules },
    components:  { UserCreatorDialog, UserEditorDialog },
    data() {
        return {
            isLoading: false,
            userId: "",
            selectedUser: {},
            deleteAlert: {
                message: "",
                type: ""
            },
            creatorDialog: false,
            editorDialog: false,
            deleteDialog: false,
            userTableHeaders: [
                { text: "Avatar", sortable: false, value: 'avatar' },
                { text: 'Name', value: 'full_name' },
                { text: 'Gender', value: 'sex' },
                { text: 'Birthday', value: 'birthday' },
                { text: 'Role', value: 'role' },
                { text: 'Phone Number', value: 'phone_number' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            userTableItems: []
        }
    },
    async created() {
        const session = JSON.parse(localStorage.getItem("session"))
        this.userId = session.id
        await this.fetchUserList()
    },
    methods: {
        async fetchUserList() {
            this.isLoading = true;
            await this.$store.dispatch("getUserList", {
                onSuccess: async data => {
                    this.userTableItems = data
                },
                onError: async data => {
                    console.log('users fetch error: ', data)
                }
            })
        },
        openCreatorDialog() {
            this.creatorDialog = true
        },
        openDeleteDialog(item) {
            this.selectedUser = item
            this.deleteDialog = true
        },
        async closeCreatorDialog(dialog) {
            await this.fetchUserList()
            this.creatorDialog = dialog
        },
        async closeEditorDialog(dialog) {
            await this.fetchUserList()
            this.editorDialog = dialog
        },
        clickConfirmDelete() {
            const userId = this.selectedUser._id
            this.$store.dispatch("deleteUser", {
                userId,
                onSuccess: async data => {
                    console.log('hii: ', data)
                    await this.fetchUserList()
                    this.deleteAlert.message = "Delete user Success"
                    this.deleteAlert.type = "success"
                    setTimeout(() => {
                        this.deleteAlert.message = ""
                        this.deleteAlert.type = ""
                    }, 5000)
                },
                onError: err => {
                    console.log("user delete error: ", err)
                    this.deleteAlert.message = "Delete user Fail"
                    this.deleteAlert.type = "error"
                    setTimeout(() => {
                        this.deleteAlert.message = ""
                        this.deleteAlert.type = ""
                    }, 5000)
                }
            });
            this.deleteDialog = false
        },
        openChat(item) {
            socketio.sendEvent({
                type: "get_message_list",
                data: {
                    senderID: this.userId, 
                    recieverID: item._id
                }
            })
            this.$store.commit('chat/openChat')
            this.$store.commit('chat/setReciver', {
                id: item._id,
                name: item.full_name,
                avatar: item.avatar
            })
        }
    }   
}
</script>