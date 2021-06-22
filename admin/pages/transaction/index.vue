<template>
    <div class="wrapper px-4">
        <v-row class="mt-3">
            <v-col cols="4">
                <v-combobox
                    :items="['all', 'succes', 'pending', 'fail']"
                    label="Status" dense outlined hide-details="true"
                ></v-combobox>
            </v-col>
            <v-col cols="4">
                <v-text-field
                    dense label="Created Date" outlined hide-details="true"
                ></v-text-field>
            </v-col>
            <v-col cols="2" class="flex align-center">
                <v-btn color="primary" style="width: 100%">
                    Filter
                    <v-icon small right>mdi-filter</v-icon>
                </v-btn>
            </v-col>
        </v-row>

        <v-row :v-if="userRole === 'admin'">
            <v-col cols="4" class="d-flex">
                <v-text-field 
                    dense v-model="newTransaction.course" outlined
                    label="Course" append-icon="fas fa-book-medical"
                    @click:append="courseDialog = true"
                ></v-text-field>
            </v-col>
            <v-col cols="4" class="d-flex">
                <v-text-field 
                    dense v-model="newTransaction.user" outlined
                    label="User" append-icon="fas fa-user-plus"
                    @click:append="userDialog = true"
                ></v-text-field>
            </v-col>
            <v-col cols="2" class="flex align-center">
                <v-btn color="primary" @click="clickCreateBtn" style="width: 100%">
                    Create
                    <v-icon small right>fas fa-plus</v-icon>
                </v-btn>
            </v-col>
            <v-col>
                <v-alert dense :type="editorAlert.type">{{editorAlert.message}}</v-alert>
                <v-alert dense :type="createAlert.type">{{createAlert.message}}</v-alert>
            </v-col>
        </v-row>
        
        <v-row>
            <v-col cols="4">
                <PieChart :data="pieChartData" :options="pieChartOptions" :height="250"/>
                <div class="text-center pt-2">Status Ratio</div>
            </v-col>
            <v-col cols="8">
                <AreaChart :data="areaChartData" :options="areaChartOptions" :height="250"/>
                <div class="text-center pt-2">Area Status Chart</div>
            </v-col>
        </v-row>

        <!-- Course Dialog -->
        <CourseDialog 
            @returnCourse="insertCourse"
            @closeDialog="closeCourseDialog"  
            :dialog="courseDialog"
        />
        <!-- Course Dialog -->

        <!-- User Dialog -->
        <UserDialog 
            @returnUser="insertUser"
            @closeDialog="closeUserDialog"  
            :dialog="userDialog"
        />
        <!-- User Dialog -->

        <!-- Editor Dialog -->
        <v-dialog max-width="300" v-model="editorDialog" >
            <v-card class="py-4">
                <v-card-title class="d-flex justify-center">Update Status</v-card-title>
                <v-card-text>
                    <v-combobox
                        v-model="selectedTransaction.status"
                        :items="['success', 'pending', 'fail']"
                        label="Status" dense outlined hide-details="true"
                    ></v-combobox>
                </v-card-text>
                <v-card-actions class="d-flex justify-center ">
                    <v-btn color="primary" class="mr-2" @click="editorDialog = false">
                        Close
                    </v-btn>
                    <v-btn color="primary" @click="clickUpdateBtn">
                        Update
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- Editor Dialog -->

        <!-- Transaction Table -->
        <v-data-table
            :headers="transactionTableHeaders"
            :items="transactionTableItems"
            :single-select="false" class="mt-8"
            item-key="_id"
        >
            <!-- Course Custom -->
            <template v-slot:[`item.course`]="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <a :href="`/course/${item.course}`" target="blank">
                            <v-btn 
                                small icon
                                class="mx-1"
                                color="primary"
                                v-on="on" v-bind="attrs"
                            >
                                <v-icon small dense>
                                    fas fa-book
                                </v-icon>
                            </v-btn>
                        </a>
                    </template>
                    <span>This Course</span>
                </v-tooltip>
            </template>
            <!-- Course Custom -->

            <!-- User Custom -->
            <template v-slot:[`item.user`]="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <a :href="`/user/${item.user}`" target="blank">
                            <v-btn 
                                small icon @click="onStatusClick"
                                class="mx-1"
                                color="primary"
                                v-on="on" v-bind="attrs"
                            >
                                <v-icon small dense>
                                    fas fa-user
                                </v-icon>
                            </v-btn>
                        </a>
                    </template>
                    <span>This User</span>
                </v-tooltip>
            </template>
            <!-- User Custom -->

            <!-- Transaction Custom -->
            <template v-slot:[`item.status`]="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn 
                            small icon @click="onStatusClick(item)"
                            class="mx-1"
                            v-on="on" v-bind="attrs"
                        >
                            <v-icon color="#22BB33" v-if="item.status === 'success'" small dense>
                               fas fa-check-circle
                            </v-icon>
                            <v-icon color="#F0AD4E" v-else-if="item.status === 'pending'" small dense>
                                fas fa-hourglass-half
                            </v-icon>
                            <v-icon color="#BB2124" v-else small dense>
                                fas fa-times-circle
                            </v-icon>
                        </v-btn>
                    </template>
                    <span v-if="item.status === 'success'">Success</span>
                    <span v-else-if="item.status === 'pending'">Pending</span>
                    <span v-else>Fail</span>
                </v-tooltip>
            </template>
            <!-- Transaction Custom -->
        </v-data-table>
        <!-- Transaction Table -->
    </div> 
</template>

<script>
import rules from "@/mixins/validationRules"
import CourseDialog from "../../components/CourseDialog/CourseDialog.vue"
import UserDialog from "../../components/UserDialog/UserDialog.vue"
import PieChart from "../../components/PieChart.vue"
import AreaChart from "../../components/AreaChart.vue"

export default {
    mixins: [rules],
    components: { CourseDialog, UserDialog, PieChart, AreaChart },
    data() {
        return {
            userRole: "",
            isLoading: false,
            selectedTransaction: {},
            createAlert: {
                message: "",
                type: ""
            },
            editorAlert: {
                message: "",
                type: ""
            },
            courseDialog: false,
            userDialog: false,
            editorDialog: false,
            deleteDialog: false,
            newTransaction: {
                course: "",
                user: "",
                status: "pending",
                review: "",
                rate: "",
                date: (new Date()).toISOString().slice(0, 10),
            },
            transactionTableHeaders: [
                { text: "ID", sortable: false, value: '_id' },
                { text: 'Course', value: 'course', sortable: false },
                { text: 'User', value: 'user', sortable: false },
                { text: 'Status', value: 'status', sortable: false },
                { text: 'Review', value: 'review', sortable: false },
                { text: 'Rate', value: 'rating' },
                { text: 'Date', value: 'date' }
            ],
            transactionTableItems: [],
            pieChartData: {
                labels: ["Success", "Pending", "Fail"],
                datasets: [
                    {
                        label: "Status Pie Chart",
                        borderWidth: 1,
                        borderColor: "rgba(0, 0, 0, 0.5)",
                        backgroundColor: ["rgb(0, 204, 0, 0.5)", "rgb(255, 204, 0, 0.5)", "rgba(255, 0, 0, 0.5)"],
                        data: [60, 20, 5]
                    }
                ]
            },
            pieChartOptions: { responsive: true, maintainAspectRatio: false },
            areaChartData: {
                labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July"
                ],
                datasets: [
                    {
                        label: "Success",
                        borderColor: "rgb(0, 204, 0)",
                        pointBackgroundColor: "rgb(0, 204, 0)",
                        backgroundColor: "rgb(0, 0, 0, 0.04)",
                        borderWidth: 2,
                        data: [40, 48, 42, 50, 57, 41, 30]
                    },
                    {
                        label: "Pending",
                        borderColor: "rgb(255, 204, 0)",
                        pointBackgroundColor: "rgb(255, 204, 0)",
                        borderWidth: 2,
                        backgroundColor: "rgb(0, 0, 0, 0.04)",
                        data: [20, 35, 24, 30, 18, 32, 12]
                    },
                    {
                        label: "Fail",
                        borderColor: "rgba(255, 0, 0, 0.5)",
                        pointBackgroundColor: "rgba(255, 0, 0, 0.5)",
                        backgroundColor: "rgb(0, 0, 0, 0.04)",
                        borderWidth: 2,
                        data: [10, 20, 12, 16, 25, 17, 15]
                    }
                ]
            },
            areaChartOptions: { responsive: true, maintainAspectRatio: false }
        }
    },
    async created() {
        const session = JSON.parse(localStorage.getItem("session"))
        this.userRole = session.role
        await this.fetchTransactionList()
    },
    methods: {
        async fetchTransactionList() {
            this.isLoading = true;
            await this.$store.dispatch("getTransactionList", {
                onSuccess: async data => {
                    this.transactionTableItems = data
                },
                onError: async data => {
                    console.log('transactions fetch error: ', data)
                }
            })
        },
        onStatusClick(item) {
            this.selectedTransaction = {...item}
            this.editorDialog = true
        },
        clickCreateBtn() {
            const data = this.newTransaction
            this.$store.dispatch("createTransaction", {
                data,
                onSuccess: async data => {
                    console.log('hii: ', data)
                    await this.fetchTransactionList()
                    this.createAlert.message = "Create Success"
                    this.createAlert.type = "success"
                    setTimeout(() => {
                        this.createAlert.message = ""
                        this.createAlert.type = ""
                    }, 5000)
                },
                onError: err => {
                    console.log("transaction create error: ", err)
                    this.createAlert.message = "Create Fail"
                    this.createAlert.type = "error"
                    setTimeout(() => {
                        this.createAlert.message = ""
                        this.createAlert.type = ""
                    }, 5000)
                }
            });
            this.createAlert = false
        },
        clickUpdateBtn() {
            const tranId = this.selectedTransaction._id
            const data = this.selectedTransaction
            this.$store.dispatch("updateTransaction", {
                tranId,
                data,
                onSuccess: async data => {
                    console.log('update: ', data)
                    await this.fetchTransactionList()
                    this.editorAlert.message = "Edit Success"
                    this.editorAlert.type = "success"
                    setTimeout(() => {
                        this.editorAlert.message = ""
                        this.editorAlert.type = ""
                    }, 5000)
                },
                onError: err => {
                    console.log("transaction update error: ", err)
                    this.editorAlert.message = "Edit Fail"
                    this.editorAlert.type = "error"
                    setTimeout(() => {
                        this.editorAlert.message = ""
                        this.editorAlert.type = ""
                    }, 5000)
                }
            });
            this.editorDialog = false
        },
        insertCourse(courseId) {
            this.newTransaction.course = courseId
        },
        closeCourseDialog(dialog) {
            this.courseDialog = dialog
        },
        insertUser(userId) {
            this.newTransaction.user = userId
        },
        closeUserDialog(dialog) {
            this.userDialog = dialog
        }
    }   
}
</script>