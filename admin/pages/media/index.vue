<template>
    <div class="wrapper px-4">
        <div class="d-flex justify-space-between mt-3">
            <v-text-field
                outlined dense color="primary"
                label="Filter"
                append-icon="mdi-filter"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="primary">
                <label for="file-upload" style="cursor: pointer">
                    Upload File<v-icon small right color="white">fas fa-file-upload</v-icon>
                </label>
                <input
                    :multiple="false"
                    id="file-upload"
                    type="file" style="display:none"
                    @change="uploadFile"
                    accept="application/pdf, image/*, video/*"
                />
            </v-btn>
        </div>
        <v-alert v-if="alertSuccess" text dense type="success">{{alertMessage}}</v-alert>
        <v-alert v-if="alertFail" text dense type="error">{{alertMessage}}</v-alert>

        <!-- Delete Dialog -->
        <v-dialog max-width="300" v-model="deleteDialog" >
            <v-card class="py-4">
                <v-card-title class="d-flex justify-center">Do you want to delete?</v-card-title>
                <v-card-actions class="d-flex justify-center ">
                    <v-btn color="primary" class="mr-2" @click="deleteDialog = false">
                        Close
                    </v-btn>
                    <v-btn color="primary" @click="deleteMedia">
                        Confirm
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- Delete Dialog -->

        <!-- Media Table -->
        <v-data-table
            :headers="mediaTableHeaders"
            :items="mediaTableItems"
            :single-select="false" class="mt-8"
            item-key="_id" dense
        >
            <!-- Featured Image Custom -->
            <template v-slot:[`item.media`]="{ item }">
                <img v-if="item.type == 'image'" class="my-2" width="150" height="100" :src="item.url"/>
                <video v-if="item.type == 'video'" class="my-2" width="150" height="100" controls>
                    <source :src="item.url" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </template>
            <!-- Featured Image Custom -->

            <!-- Quantity Custom -->
            <template v-slot:[`item.quantity`]="{ item }">
                {{item.quantity ? item.quantity : 0}}
            </template>
            <!-- Quantity Custom -->

            <!-- 3 Actions Buttons -->
            <template v-slot:[`item.actions`]="{ item }">
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
        <!-- Media Table -->
    </div> 
</template>

<script>
import rules from "@/mixins/validationRules";
import checkType from "@/mixins/checkType.js";
export default {
    mixins: [rules, checkType],
    data() {
        return {
            alertSuccess: false,
            alertFail: false,
            alertMessage: "",
            isLoading: false,
            selectedMedia: "",
            deleteDialog: false,
            mediaTableHeaders: [
                { text: "Media", sortable: false, value: 'media' },
                { text: 'Url', value: 'url', sortable: false },
                { text: 'Created Date', value: 'created_date' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            mediaTableItems: []
        }
    },
    async created() {
        this.fetchMediaList()
    },
    methods: {
        async fetchMediaList() {
            this.isLoading = true;
            await this.$store.dispatch("getMediaList", {
                onSuccess: async data => {
                    this.mediaTableItems = data
                },
                onError: async data => {
                    console.log('media fetch error: ', data)
                }
            })
        },
        uploadFile(e) {
            let fileType = "";
            let formData = new FormData();
            if(e.target.files[0]) {
                if (this.isImage(e.target.files[0].name)) {
                    fileType = "image";
                } else if (this.isVideo(e.target.files[0].name)) { 
                    fileType = "video";
                } else if (this.isPdf(e.target.files[0].name)) {
                    fileType = "pdf" 
                } else {
                    alert("Extension is not supported!")
                    return
                } 
                formData.append("files", e.target.files[0]);
                formData.append("type", fileType);
                this.$store.dispatch("uploadMedia", {
                    data: formData,
                    onSuccess: async data => {
                        console.log('hello: ', data)
                        await this.fetchMediaList()
                        this.alertMessage = "Upload Success"
                        this.alertSuccess = true
                        this.alertFail = false
                        setTimeout(() => {
                            this.alertMessage = ""
                            this.alertSuccess = false
                            this.alertFail = false
                        }, 5000)
                    },
                    onError: err => {
                        console.log("media upload error: ", err)
                        this.alertMessage = "Upload Fail"
                        this.alertSuccess = false
                        this.alertFail = true
                        setTimeout(() => {
                            this.alertMessage = ""
                            this.alertSuccess = false
                            this.alertFail = false
                        }, 5000)
                    }
                });
            }
        },
        openDeleteDialog(item) {
            this.deleteDialog = true
            this.selectedMedia = item
        },
        deleteMedia() {
            const mediaId = this.selectedMedia._id
            this.$store.dispatch("deleteMedia", {
                mediaId,
                onSuccess: async data => {
                    console.log('hii: ', data)
                    await this.fetchMediaList()
                    this.alertMessage = "Delete Success"
                    this.alertSuccess = true
                    this.alertFail = false
                    setTimeout(() => {
                        this.alertMessage = ""
                        this.alertSuccess = false
                        this.alertFail = false
                    }, 5000)
                },
                onError: err => {
                    console.log("media delete error: ", err)
                    this.alertMessage = "Delete Fail"
                    this.alertSuccess = false
                    this.alertFail = true
                    setTimeout(() => {
                        this.alertMessage = ""
                        this.alertSuccess = false
                        this.alertFail = false
                    }, 5000)
                }
            });
            this.deleteDialog = false
        }
    }   
}
</script>