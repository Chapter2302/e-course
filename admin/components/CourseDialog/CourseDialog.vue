<template>
    <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
    >
        <v-card>
            <v-card-title class="d-flex headline primary white--text">
                <span>Course Selector</span>
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
                            v-model="filter.category"
                            :items="['all', 'admin', 'student', 'teacher']"
                            label="Category" dense outlined
                        ></v-combobox>
                    </v-col>
                    <v-col cols="3">
                        <v-combobox
                            v-model="filter.createdDate"
                            :items="['all', 'admin', 'student', 'teacher']"
                            label="Created Date" dense outlined
                        ></v-combobox>
                    </v-col>
                    <v-col cols="3">
                        <v-row>
                            <v-col cols="6">
                                <v-btn style="width: 100%" color="primary" @click="clickFilter">Filter</v-btn>
                            </v-col>
                            <v-col cols="6">
                                <v-btn style="width: 100%" v-if="selectedCourse.length != 0" color="primary" @click="clickSelect">Select</v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-text>
                <div class="wrapper px-4">
                    <!-- CreatorDialog -->
                    <CourseCreatorDialog @closeDialog="closeDialog" :dialog="creatorDialog"/>
                    <!-- CreateDialog -->

                    <!-- Course Table -->
                    <v-data-table
                        v-model="selectedCourse"
                        :headers="courseTableHeaders"
                        :items="courseTableItems" show-select
                        :single-select="true" class="mt-8"
                        item-key="_id"
                    >
                        <!-- Name Custom -->
                        <template v-slot:[`item.name`]="{ item }">
                            <div style="color: black; text-decoration: none"><b>{{item.name}}</b></div>
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
                    </v-data-table>
                    <!-- Warehouse Table -->
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import CourseCreatorDialog from "../CourseCreatorDialog/CourseCreatorDialog.vue"
export default {
    components: { CourseCreatorDialog },
    props: {
        dialog: {type: String}
    },
    data() {
        return {
            selectedCourse: [],
            filter: {
                createdDate: "all",
                category: "all",
                courseName: ""
            },
            courseTableHeaders: [
                { text: "Image", sortable: false, value: 'featured_image' },
                { text: 'Name', value: 'name' },
                { text: 'Rate', value: 'rating' },
                { text: 'Created Date', value: 'created_date' },
                { text: 'Category', value: 'category', sortable: false },
                { text: 'Price', value: 'price' },
                { text: 'Quantity', value: 'quantity' }
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
        },
        clickClose() {
            this.filter = {
                createdDate: "all",
                category: "all",
                courseName: ""
            }
            this.$emit('closeDialog', false)
        },
        async clickFilter() {
            this.selectedCourse = []
            await this.fetchCourseList()
        },
        clickSelect() {
            this.$emit('returnCourse', this.selectedCourse[0]._id)
            this.selectedCourse = []
            this.filter = {
                createdDate: "all",
                category: "all",
                courseName: ""
            }
            this.$emit('closeDialog', false)
        }
    } 
}
</script>

<style>

</style>