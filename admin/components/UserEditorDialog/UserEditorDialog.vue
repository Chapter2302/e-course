<template>
    <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
    >
        <MediaDialog 
            @insertNewUrl="insertNewUrl"
            @closeMediaDialog="closeMediaDialog" 
            :dialog="mediaDialog"
        />
        <v-card>
            <v-card-title class="d-flex headline primary white--text">
                <span>User Editor</span>
                <v-spacer></v-spacer>
                <v-btn small @click="clickClose" dark icon>
                    <v-icon>fas fa-times</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text class="mt-4">
                <v-row>
                    <v-col cols="3">
                        <img style="width: 100%" :src="user.avatar ? user.avatar : 'http://localhost:4000/media-resource/default-avatar.png'"/>
                        <v-btn color="primary" style="width: 100%" @click="mediaDialog = true">
                            Upload Avatar<v-icon small right color="white">fas fa-file-upload</v-icon>
                        </v-btn>
                        <v-btn color="primary" style="width: 100%" class="mt-2" @click="clickSaveChange">
                            Save Change
                        </v-btn>
                        <v-alert class="mt-2" dense v-if="saveAlert.message != ''" :type="saveAlert.type">{{saveAlert.message}}</v-alert>
                    </v-col>
                    <v-col cols="9">
                        <v-row>
                            <v-col cols="4">
                                <v-text-field 
                                    v-model="user.full_name"
                                    label="Fullname"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field 
                                    type="email"
                                    v-model="user.local_email"
                                    label="Local Email"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-combobox
                                    v-model="user.role"
                                    :items="['admin', 'student', 'teacher']"
                                    label="Role"
                                ></v-combobox>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-combobox
                                    v-model="user.sex"
                                    :items="['male', 'female']"
                                    label="Gender"
                                ></v-combobox>
                            </v-col>
                            <v-col cols="4">
                                <DatePicker :date="user.birthday" label="Birthday"/>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field 
                                    v-model="user.phone_number"
                                    label="Phone Number"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-text-field 
                                    v-model="user.work_place"
                                    label="Work Place"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field 
                                    v-model="user.address"
                                    label="Address"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field 
                                    v-model="user.bank_id"
                                    label="Bank ID"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-textarea dense outlined v-model="user.bio" label="Biology"></v-textarea>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import MediaDialog from "../MediaDialog/MediaDialog.vue"
import DatePicker from "../DatePicker/DatePicker.vue"
export default {
    components: { MediaDialog, DatePicker },
    props: {
        dialog: {type: Boolean},
        user: {type: Object}
    },
    data() {
        return {
            mediaDialog: false,
            saveAlert: {
                message: "",
                type: ""
            },
        }
    },
    methods: {
        clickClose() {
            this.$emit('closeDialog', false)
        },
        insertNewUrl(media) {
            this.user.avatar = media.url
        },
        closeMediaDialog(dialog) {
            this.mediaDialog = dialog
        },
        clickSaveChange() {
            const user = this.user
            this.$store.dispatch("updateUser", {
                data: user,
                onSuccess: async data => {
                    console.log('hello: ', data)
                    this.saveAlert.message = "User Update Success"
                    this.saveAlert.type = "success"
                    setTimeout(() => {
                        this.saveAlert.message = ""
                        this.saveAlert.type = ""
                    }, 5000)
                },
                onError: err => {
                    console.log("Course Update Error: ", err)
                    this.saveAlert.message = "User Update Fail"
                    this.saveAlert.type = "error"
                    setTimeout(() => {
                        this.saveAlert.message = ""
                        this.saveAlert.type = ""
                    }, 5000)
                }
            })
        }
    }
}
</script>

<style>

</style>