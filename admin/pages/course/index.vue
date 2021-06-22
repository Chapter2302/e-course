<template>
    <div class="wrapper px-4">
        <div class="d-flex mt-3">
            <v-btn color="primary">
                Filter
                <v-icon small right>mdi-filter</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-alert dense :type="deleteAlert.type">{{deleteAlert.message}}</v-alert>
            <v-btn class="ml-2" color="primary" @click="openCreatorDialog()">
                Create
                <v-icon small right>fas fa-plus</v-icon>
            </v-btn>
        </div>

        <!-- CreatorDialog -->
        <CourseCreatorDialog @closeDialog="closeDialog" :dialog="creatorDialog"/>
        <!-- CreateDialog -->

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

        <!-- Course Table -->
        <v-data-table
            :headers="courseTableHeaders"
            :items="courseTableItems"
            :single-select="false" class="mt-8"
            item-key="_id"
        >
            <!-- Name Custom -->
            <template v-slot:[`item.name`]="{ item }">
                <nuxt-link style="color: black; text-decoration: none" :to="`/course/${item._id}`">
                    <div><b>{{item.name}}</b></div>
                </nuxt-link>
            </template>
            <!-- Name Custom -->

            <!-- Featured Image Custom -->
            <template v-slot:[`item.featured_image`]="{ item }">
                <img class="my-2" width="100" height="60" :src="item.featured_image"/>
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
        <!-- Warehouse Table -->
    </div> 
</template>

<script>
import rules from "@/mixins/validationRules";
import CourseCreatorDialog from "../../components/CourseCreatorDialog/CourseCreatorDialog.vue"
export default {
    mixins: [rules],
    components:  { CourseCreatorDialog },
    data() {
        return {
            isLoading: false,
            selectedCourse: "",
            deleteAlert: {
                message: "",
                type: ""
            },
            creatorDialog: false,
            deleteDialog: false,
            courseTableHeaders: [
                { text: "Image", sortable: false, value: 'featured_image' },
                { text: 'Name', value: 'name' },
                { text: 'Rate', value: 'rating' },
                { text: 'Created Date', value: 'created_date' },
                { text: 'Category', value: 'category', sortable: false },
                { text: 'Price', value: 'price' },
                { text: 'Quantity', value: 'quantity' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            courseTableItems: []
        }
    },
    async created() {
        this.fetchCourseList()
    },
    methods: {
        async fetchCourseList() {
            this.isLoading = true;
            await this.$store.dispatch("getCourseList", {
                onSuccess: async data => {
                    this.courseTableItems = data
                },
                onError: async data => {
                    console.log('warehouse fetch error: ', data)
                }
            })
        },
        openCreatorDialog() {
            this.creatorDialog = true
        },
        openDeleteDialog(item) {
            this.selectedCourse = item
            this.deleteDialog = true
        },
        closeDialog(dialog) {
            this.fetchCourseList()
            this.creatorDialog = dialog
        },
        clickConfirmDelete() {
            const courseId = this.selectedCourse._id
            this.$store.dispatch("deleteCourse", {
                courseId,
                onSuccess: async data => {
                    console.log('hii: ', data)
                    await this.fetchCourseList()
                    this.deleteAlert.message = "Delete Course Success"
                    this.deleteAlert.type = "success"
                    setTimeout(() => {
                        this.deleteAlert.message = ""
                        this.deleteAlert.type = ""
                    }, 5000)
                },
                onError: err => {
                    console.log("Course delete error: ", err)
                    this.deleteAlert.message = "Delete Course Fail"
                    this.deleteAlert.type = "error"
                    setTimeout(() => {
                        this.deleteAlert.message = ""
                        this.deleteAlert.type = ""
                    }, 5000)
                }
            });
            this.deleteDialog = false
        }
    }   
}
</script>