<template>
  <v-dialog v-model="deleteConfirmation" persistent max-width="450">
    <template v-slot:activator="{ on, attrs }">
      <v-icon small v-bind="attrs" v-on="on"> mdi-delete </v-icon>
    </template>
    <v-card class="elevation-0" :loading="getLoadingVehicles">
      <v-card-title class="text-h5"> Delete confirmation ? </v-card-title>
      <v-card-text
        >Are you sure you wanna delete car with license
        <span class="font-weight-black">{{ vehicle.license }}</span> of customer
        <span class="font-weight-black">{{ vehicle.owner }}</span>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" text @click="deleteConfirmation = false">
          Cancel
        </v-btn>
        <v-btn color="red" text @click="deleteVehicle">
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["vehicle"],
  data: () => ({
    deleteConfirmation: false,
  }),
  computed: {
    ...mapGetters(["getLoadingVehicles"]),
  },
  methods: {
    ...mapActions(["DELETE_VEHICLE", "FETCH_VEHICLES"]),
    async deleteVehicle() {
      //TODO delete vehicle
      let deleted = await this.DELETE_VEHICLE(this.vehicle.license);
      if (deleted) {
        this.deleteConfirmation = false;
        await this.FETCH_VEHICLES();
        alert(`Vehicle ${this.vehicle.license} has been deleted successfully`);
      }
    },
  },
};
</script>