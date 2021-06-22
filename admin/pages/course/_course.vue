<template>
    <v-row>
        <MediaDialog 
            @insertNewUrl="insertNewUrl"
            @closeMediaDialog="closeMediaDialog" 
            :dialog="mediaDialog"
        />
        <UserDialog 
            @returnUser="insertTeacher"
            @closeDialog="closeUserDialog" 
            :dialog="userDialog"
        />
        <v-col cols="6">
            <div class="featured-image-container mb-8">
                <img style="width: 100%; height: 320px" :src="course.featured_image"/>
                <v-btn color="primary" style="width: 100%" @click="mediaDialog = true">
                    Upload Featured Image<v-icon small right color="white">fas fa-file-upload</v-icon>
                </v-btn>
            </div>
            <v-card>
                <v-card-text>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field v-model="course.name" label="Course Name"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-combobox
                                v-model="course.category"
                                :items="['Information Technology', 'Design', 'Marketing', 'Language', 'Economy']"
                                label="Category"
                            ></v-combobox>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <DatePicker @handleTimePicker="handleStartDateTimePicker" :date="course.created_date" label="Created Date"/>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field disabled v-model="course.quantity" label="Quantity"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field type="number" v-model="course.price" label="Price"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-combobox
                                v-model="course.is_active"
                                :items="[true, false]"
                                label="Active"
                            ></v-combobox>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" class="d-flex">
                            <v-text-field dense v-model="course.teacher" label="Teacher"></v-text-field>
                            <v-btn small color="primary" @click="userDialog = true">Choose Teacher</v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-textarea outlined v-model="course.description" label="Description"></v-textarea>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-alert dense v-if="saveAlert.message != ''" :type="saveAlert.type">{{saveAlert.message}}</v-alert>
                            <v-btn 
                                color="primary" style="width: 100%" 
                                @click="clickSaveCourse"
                            >
                                Save Change<v-icon small right color="white">fas fa-save</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="6">
            <div class="mt-5">
                <v-card class="mb-8">
                    <v-card-text 
                       v-if="course == '' || course.content.length == 0"
                    >No Lesson</v-card-text>
                    <v-list-group
                        :value="true" v-else
                        v-for="part in course.content"
                        :key="part.index"
                    >
                        <template v-slot:activator>
                            <v-list-item-title>
                                <v-text-field 
                                    v-model="part.name" color="primary"
                                    :label="`Part ${part.index}`" 
                                    dense class="mt-6"
                                ></v-text-field>
                            </v-list-item-title>
                        </template>

                        <v-list-item
                            v-for="(lesson, i) in part.lessons"
                            :key="i" link dense class="d-flex"
                        >
                            <video class="mb-4" width="140" height="120" controls :src="lesson.videoUrl"></video>
                            <div class="ml-4">
                                <v-text-field
                                    v-model="lesson.name" 
                                    :label="`Lesson ${lesson.index}`" 
                                    dense
                                ></v-text-field>
                                <div class="d-flex">
                                    <v-btn 
                                        small color="primary" class="mr-2" 
                                        @click="clickChangeVideo(part, lesson)"
                                    >
                                        <label for="upload-video" style="cursor: pointer">
                                            Change Video
                                        </label>
                                    </v-btn>
                                </div>
                            </div>
                        </v-list-item>
                    </v-list-group>
                </v-card>
                <v-card class="py-4 px-4 mb-8">
                    <v-row>
                        <v-col cols="6">
                            <v-text-field 
                                v-model="newPart.partIndex"
                                type="number" dense label="Part Index"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field 
                                :disabled="newPart.partIndex == ''"
                                v-model="newPart.partName"
                                dense label="Part Name"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row v-if="newPart.message != ''">
                        <v-col cols="12">
                            <v-alert dense :type="newPart.type">{{newPart.message}}</v-alert>
                       </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="d-flex">
                            <v-spacer></v-spacer>
                            <v-btn color="primary" class="mr-2" @click="clickDeletePart()">Delete</v-btn>
                            <v-btn color="primary" @click="clickAddNewPart()">Add Part</v-btn>
                        </v-col>
                    </v-row>
                </v-card>
                <v-card class="py-4 px-4">
                    <v-row>
                        <v-col cols="6">
                            <v-text-field 
                                v-model="newLesson.partIndex"
                                type="number" dense label="Part Index"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                :disabled="newLesson.partIndex == ''"
                                v-model="newLesson.lessonIndex" 
                                type="number" dense label="Lesson Index"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                :disabled="newLesson.partIndex == ''"
                                v-model="newLesson.lessonName" 
                                dense label="Lesson Name"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row v-if="newLesson.message != ''">
                        <v-col cols="12">
                            <v-alert dense :type="newLesson.type">{{newLesson.message}}</v-alert>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="d-flex">
                            <v-spacer></v-spacer>
                            <v-btn color="primary" class="mr-2" @click="clickDeleteLesson()">Delete</v-btn>
                            <v-btn color="primary" @click="clickAddNewLesson()">Add Lesson</v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </div>
        </v-col>
    </v-row>
</template>

<script>
import DatePicker from "../../components/DatePicker/DatePicker.vue" 
import MediaDialog from "../../components/MediaDialog/MediaDialog.vue"
import UserDialog from "../../components/UserDialog/UserDialog"

export default {
    components: [DatePicker, MediaDialog, UserDialog],
    async asyncData({ params }) {
      const courseId = params.course
      return { courseId }
    },
    data() {
        return {
            course: "",
            mediaDialog: false,
            userDialog: false,
            saveAlert: {
                message: "",
                type: ""
            },
            newPart: {
                partIndex: "",
                partName: "",
                message: "",
                type: ""
            },
            newLesson: {
                partIndex: "",
                lessonIndex: "",
                lessonName: "",
                message: "",
                type: ""
            },
            selectedLesson: "",
        }
    },
    async created() {
        await this.fetchCourse()
    },
    methods: {
        async fetchCourse() {
            const courseId = this.courseId
            await this.$store.dispatch("getCourse", {
                courseId,
                onSuccess: async data => {
                    this.course = data.course
                    console.log(this.course)
                },
                onError: async data => {
                    console.log('course fetch error: ', data)
                }
            })
        },
        closeUserDialog(dialog) {
            this.userDialog = dialog
        },
        closeMediaDialog(dialog) {
            this.mediaDialog = dialog
        },
        handleStartDateTimePicker(newDate) {
            this.course.start_date = newDate
        },
        handleEndDateTimePicker(newDate) {
            this.course.end_date = newDate
        },
        clickDeletePart() {
            this.newPart.type = ""
            this.newPart.message = ""
            this.course.content = this.course.content.filter(part => {
                if(part.index == this.newPart.partIndex) {
                    this.newPart.type = "success"
                    this.newPart.message = `Success`
                    return false
                } else {
                    return true
                }
            })
            if(this.newPart.message == "") {
                this.newPart.type = "error"
                this.newPart.message = `Not Existed`
            }
            setTimeout(() => {
                this.newPart.type = ""
                this.newPart.message = ""
            }, 5000)
        },
        clickDeleteLesson() {
            this.newLesson.type = ""
            this.newLesson.message = ""
            const partContain = this.course.content.filter(part => (part.index == this.newLesson.partIndex))[0]
            if(partContain) {
                const isExist = partContain.lessons.some(lesson => (lesson.index == this.newLesson.lessonIndex))
                if(isExist) {
                    partContain.lessons = partContain.lessons.filter(lesson => {
                        if(lesson.index == this.newLesson.lessonIndex) return false
                        else return true
                    })
                    this.course.content.map(part => {
                        if(part.index == partContain.index) return partContain
                    })
                    this.newLesson.type = "success"
                    this.newLesson.message = "Success"
                } else {
                    this.newLesson.type = "error"
                    this.newLesson.message = "Not Existed"
                }
            } else {
                this.newLesson.type = "error"
                this.newLesson.message = "Part Not Existed"
            }

            setTimeout(() => {
                this.newLesson.type = ""
                this.newLesson.message = ""
            }, 5000)
        },
        clickAddNewPart() {
            this.newPart.type = ""
            this.newPart.message = ""
            const isExist = this.course.content.some(part => (part.index == this.newPart.partIndex))
            if(!isExist) {
                this.course.content.push({
                    index: this.newPart.partIndex,
                    name: this.newPart.partName,
                    lessons: []
                })
                this.course.content.sort((a, b) => (a.index - b.index))
                this.newPart.type = "success"
                this.newPart.message = "Success"
            } else {
                this.newPart.type = "error"
                this.newPart.message = "Existed"
            }
            setTimeout(() => {
                this.newPart.type = ""
                this.newPart.message = ""
            }, 5000)
        },
        clickAddNewLesson() {
            this.newLesson.type = ""
            this.newLesson.message = ""
            const partContain = this.course.content.filter(part => (part.index == this.newLesson.partIndex))[0]
            if(partContain) {
                const isExist = partContain.lessons.some(lesson => (lesson.index == this.newLesson.lessonIndex))
                if(!isExist) {
                    partContain.lessons.push({
                        index: this.newLesson.lessonIndex,
                        name: this.newLesson.lessonName,
                        videoUrl: ""
                    })
                    partContain.lessons.sort((a, b) => (a.index - b.index))
                    this.course.content.map(part => {
                        if(part.index == partContain.index)
                            return partContain
                    })
                    this.newLesson.type = "success"
                    this.newLesson.message = "Success"
                } else {
                    this.newLesson.type = "error"
                    this.newLesson.message = "Existed"
                }
            } else {
                this.newLesson.type = "error"
                this.newLesson.message = "Part Not Existed"
            }
            setTimeout(() => {
                this.newLesson.type = ""
                this.newLesson.message = ""
            }, 5000)
        },
        insertTeacher(teacherId) {
            this.course.teacher = teacherId
        },
        insertNewUrl(media) {
            if(this.selectedLesson == "") {
                this.course.featured_image = media.url
            } else {
                this.course.content = this.course.content.map(part => {
                    if(part.index == this.selectedLesson.partIndex) {
                        part.lessons = part.lessons.map(lesson => {
                            if(lesson.index == this.selectedLesson.lessonIndex) {
                                lesson.videoUrl = media.url
                            }
                            return lesson
                        })
                    }
                    return part
                })
                console.log(this.course.content)
            }
            this.selectedLesson = ""
        },
        clickChangeVideo(part, lesson) {
            this.selectedLesson = {
                partIndex: part.index,
                lessonIndex: lesson.index, 
            }; 
            this.mediaDialog = true
        },
        clickSaveCourse() {
            const course = this.course
            this.$store.dispatch("updateCourse", {
                data: course,
                onSuccess: async data => {
                    console.log('hello: ', data)
                    await this.fetchCourse()
                    this.saveAlert.message = "Course Update Success"
                    this.saveAlert.type = "success"
                    setTimeout(() => {
                        this.saveAlert.message = ""
                        this.saveAlert.type = ""
                    }, 5000)
                },
                onError: err => {
                    console.log("Course Update Error: ", err)
                    this.saveAlert.message = "Course Update Fail"
                    this.saveAlert.type = "error"
                    setTimeout(() => {
                        this.saveAlert.message = ""
                        this.saveAlert.type = ""
                    }, 5000)
                }
            });
        }
    }
}
</script>

<style scoped>
.featured-image-container {
}
</style>