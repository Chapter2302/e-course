<template>
    <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="newDate"
        width="290px"
    >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="newDate"
            :label="label"
            prepend-icon="mdi-calendar"
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="newDate"
          color="primary"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="modal = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="okClick"
          >
            OK
          </v-btn>
        </v-date-picker>
    </v-dialog>
</template>

<script>
export default {
    props: {
        date: {type: String},
        label: {type: String}
    },
    data() {
        return {
            menu: false,
            modal: false,
            newDate: this.date,
        }
    },
    methods: {
        okClick() {
            this.$refs.dialog.save(this.newDate)
            this.$emit('handleTimePicker', this.newDate);
        }
    }
}
</script>

<style>

</style>