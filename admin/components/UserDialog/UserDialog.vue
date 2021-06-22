<template>
    <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
    >
        <v-card>
            <v-card-title class="d-flex headline primary white--text">
                <span>User</span>
                <v-spacer></v-spacer>
                <v-btn small @click="clickClose" dark icon>
                    <v-icon>fas fa-times</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text class="pt-8">
                <v-row>
                    <v-col cols="3">
                        <v-text-field
                            v-model="filter.fullName"
                            label="Fullname" dense outlined
                        ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-combobox
                            v-model="filter.role"
                            :items="['all', 'admin', 'student', 'teacher']"
                            label="Role" dense outlined
                        ></v-combobox>
                    </v-col>
                    <v-col cols="3">
                        <v-combobox
                            v-model="filter.gender"
                            :items="['all', 'male', 'female']"
                            label="Gender" dense outlined
                        ></v-combobox>
                    </v-col>
                    <v-col cols="3">
                        <v-row>
                            <v-col cols="6">
                                <v-btn style="width: 100%" color="primary" @click="clickFilter">Filter</v-btn>
                            </v-col>
                            <v-col cols="6">
                                <v-btn style="width: 100%" v-if="selectedUser.length != 0" color="primary" @click="clickSelect">Select</v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-text class="mt-4">
                <v-data-table
                    v-model="selectedUser"
                    :headers="userTableHeaders"
                    :items="userTableItems" show-select
                    :single-select="true" class="mt-8"
                    item-key="_id"
                >
                    <!-- Name Custom -->
                    <template v-slot:[`item.full_name`]="{ item }">
                        <div><b>{{item.full_name}}</b></div>
                    </template>
                    <!-- Name Custom -->

                    <!-- Avatar Custom -->
                    <template v-slot:[`item.avatar`]="{ item }">
                        <img class="my-2" width="100" height="100" :src="item.avatar"/>
                    </template>
                    <!-- Avatar Custom -->
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        dialog: {type: Boolean},
    },
    data() {
        return {
            selectedUser: [],
            filter: {
                role: "all",
                gender: "all",
                fullName: ""
            },
            userTableHeaders: [
                { text: "Avatar", sortable: false, value: 'avatar' },
                { text: 'Name', value: 'full_name' },
                { text: 'Gender', value: 'sex' },
                { text: 'Birthday', value: 'birthday' },
                { text: 'Role', value: 'role' },
                { text: 'Phone Number', value: 'phone_number' },
            ],
            userTableItems: []
        }
    },
    async created() {
        await this.fetchUserList()
    },
    methods: {
        async fetchUserList() {
            await this.$store.dispatch("getUserList", {
                onSuccess: async data => {
                    this.userTableItems = data.filter(user => {
                        return (
                            (this.filter.fullName == "" ? true : user.full_name.includes(this.filter.fullName))
                            && (this.filter.gender == "all" || (user.sex == this.filter.gender))
                            && (this.filter.role == "all" || user.role == this.filter.role)
                        )
                    })
                },
                onError: async data => {
                    console.log('users fetch error: ', data)
                }
            })
        },
        clickClose() {
            this.filter = {
                role: "all",
                gender: "all",
                fullName: ""
            }
            this.$emit('closeDialog', false)
        },
        async clickFilter() {
            this.selectedUser = []
            await this.fetchUserList()
        },
        clickSelect() {
            this.$emit('returnUser', this.selectedUser[0]._id)
            this.selectedUser = []
            this.filter = {
                role: "all",
                gender: "all",
                fullName: ""
            }
            this.$emit('closeDialog', false)
        }
    }
}
</script>

<style>

</style>