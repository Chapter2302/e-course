<template>
    <div class="container">
        <!-- Media Tool Bar -->
        <div v-if="!isMultipleSelect" class="row">
            <div class="col-12 col-sm-6 col-md-3">
                <v-select
                    :items="selectTypeItems"
                    label="Type" 
                ></v-select>
            </div>
            <div class="d-flex align-center col-12 col-sm-6 col-md-3">
                <v-btn outlined color="primary" small class="mr-1">
                    <v-icon small>fas fa-calendar-day</v-icon>
                    <span class="ml-1">Date</span>
                </v-btn>
                <v-btn outlined color="primary" small @click="isMultipleSelect = true">
                    <v-icon small>fas fa-check-double</v-icon>
                    <span class="ml-1">Select</span>
                </v-btn>
            </div>
            <div class="col-12 col-sm-6 col-md-3">
                <v-text-field
                    label="Search"
                    append-icon="mdi mdi-magnify"
                ></v-text-field>
            </div>
            <div class="d-flex align-center col-12 col-sm-6 col-md-3">
                <v-btn color="primary" small class="mr-1">
                    <v-icon small>fas fa-file-upload</v-icon>
                    <span class="ml-1">Upload</span>
                </v-btn>
                <v-btn color="primary" small>
                    <v-icon small>fas fa-folder-plus</v-icon>
                    <span class="ml-1">Folder</span>
                </v-btn>
            </div>
        </div>
        <!-- Media Tool Bar -->

        <!-- Multiple Select -->
        <v-row v-if="isMultipleSelect">
            <v-col class="d-flex align-center col-12 py-8">
                <v-btn color="primary" small>
                    <v-icon small>fas fa-check-double</v-icon>
                    <span class="ml-1">Select All</span>
                </v-btn>
                <v-btn outlined color="primary" small class="mx-1" :disabled="true">
                    <v-icon small>fas fa-trash</v-icon>
                    <span class="ml-1">Delete Forever</span>
                </v-btn>
                <v-btn outlined color="primary" small @click="isMultipleSelect = false">
                    <span class="ml-1">Cancel</span>
                </v-btn>
            </v-col>
        </v-row>
        <!-- Multiple Select -->

        <!-- Media View  -->
        <div class="d-flex align-content-start flex-wrap mt-4">
            <div 
                v-for="index in 10" 
                :key="index" class="col-12 col-sm-6 col-md-3 col-lg-2 py-2"
            >
                <div class="py-4 media-wrapper">
                    <v-img :src="defaultImg" class="media"></v-img>
                    <div class="media-overlay">
                        <div class="d-flex justify-end">
                            <v-checkbox 
                                class="my-0 py-0 px-0 col-2" dense :hide-details="true"
                            ></v-checkbox>
                        </div>
                        <div class="media-btn">
                            <v-btn block small><v-icon left small>mdi-magnify</v-icon>View</v-btn>
                            <v-btn block small class="mt-2"><v-icon left small>mdi-download</v-icon>Save</v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Media View  -->
    </div>
    
</template>

<script>
export default {
    data() {
        return {
            isMultipleSelect: false,
            defaultImg: "https://otoday.vn/wp-content/themes/ws247/assets/images/default-thumbnail.jpg",
            selectTypeItems: [
                "All",
                "Image",
                "Video",
                "File",
                "Folder"
            ]
        }
    }
}
</script>
<style>
    .media-wrapper {
        position: relative;
        border: 1px solid #808080;
    }

    .media {
    }

    .media-overlay {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        visibility: visible;
        opacity: 1;
        transition: 0.2s ease;
        z-index: 2;
    }

    .media-wrapper:hover .media-overlay {
        visibility: visible;
        opacity: 1;
    }

    .media-overlay::before {
        content: "";
        width: 100%;
        height: 100%;
        opacity: 0.3;
        position: absolute;
        top: 0;
        left: 0;
        background: var(--v-secondary-lighten5);
    }

    .media-btn {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
</style>