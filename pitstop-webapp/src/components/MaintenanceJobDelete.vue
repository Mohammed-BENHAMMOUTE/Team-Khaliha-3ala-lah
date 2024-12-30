<template>
  <v-dialog v-model="deleteConfirmation" persistent max-width="450">
    <template v-slot:activator="{ on, attrs }">
      <v-icon small v-bind="attrs" v-on="on"> mdi-delete </v-icon>
    </template>
    <v-card class="elevation-0" :loading="getLoadingWorkshop">
      <v-card-title class="text-h5"> Delete confirmation ? </v-card-title>
      <v-card-text
        >Are you sure you wanna delete job of car
        <span class="font-weight-black">{{ job.license }}</span>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondat" text @click="deleteConfirmation = false">
          Cancel
        </v-btn>
        <v-btn color="red" text @click="deleteJob">
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters, mapActions} from "vuex";

export default {
  props: ["job"],
  data: () => ({
    deleteConfirmation: false,
  }),
  computed: {
    ...mapGetters(["getLoadingWorkshop"]),
  },
  methods: {
    ...mapActions(["DELETE_JOB", "FETCH_JOBS"]),
    async deleteJob() {
      //TODO delete job
      let deleted = await this.DELETE_JOB(this.job.id);
      if (deleted) {
        this.deleteConfirmation = false;
        await this.FETCH_JOBS();
        alert(deleted);
      }
    },
  },
};
</script>