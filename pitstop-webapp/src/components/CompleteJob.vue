<template>
  <v-dialog v-model="completeJob" persistent max-width="450">
    <template v-slot:activator="{ on, attrs }">
      <v-icon small v-bind="attrs" v-on="on"> mdi-check </v-icon>
    </template>
    <v-card class="elevation-0" :loading="getLoadingWorkshop">
      <v-card-title class="text-h5"> Complete this job ? </v-card-title>
      <v-card-text
        >Are you sure you wanna complete job
        <span class="font-weight-black">{{ job.name }}</span>
        of car
        <span class="font-weight-black">{{ job.license }}</span>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondat" text @click="completeJob = false">
          Cancel
        </v-btn>
        <v-btn color="green" text @click="finishJob"> Complete </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["job"],
  data: () => ({
    completeJob: false,
  }),
  computed: {
    ...mapGetters(["getLoadingWorkshop"]),
  },
  methods: {
    ...mapActions(["FETCH_JOBS", "COMPLETE_JOB"]),
    async finishJob() {
      //TODO complete job
        let completed = await this.COMPLETE_JOB(this.job.id);
        if (completed) {
          this.completeJob = false;
          await this.FETCH_JOBS();
          alert(completed);
        }
    },
  },
};
</script>