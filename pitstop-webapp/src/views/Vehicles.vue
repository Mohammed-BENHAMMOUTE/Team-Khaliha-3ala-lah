<template>
  <v-container class="pa-15" fluid>
    <!-- Offline service overlay -->
    <v-overlay
      :absolute="true"
      :value="true"
      color="white"
      opacity="1"
      v-if="getVehicleServiceOffline"
    >
      <v-row class="fill-height no-gutters justify-center align-center">
        <v-col cols="12" class="d-flex flex-column align-center justify-center">
          <img
            src="@/assets/no-internet.png"
            alt="Offline service"
            width="250"
          />
          <span class="text-h6 black--text text-center mt-5 font-weight-light"
            >We're sorry vehicle service is offline</span
          >
        </v-col>
      </v-row>
    </v-overlay>

    <!-- Title -->
    <v-row class="px-2 d-flex align-baseline">
      <h4 class="grey--text text-uppercase font-weight-medium">
        Vehicle management
      </h4>
      <v-spacer></v-spacer>

      <!--Register vehicle -->
      <register-vehicle />
    </v-row>

    <!-- Data table -->
    <v-row class="mt-10 fill-height no-gutters">
      <v-col cols="12" class="fill-height">
        <v-card class="elevation-0 fill-height" :loading="getLoadingVehicles">
          <v-data-table
            :headers="headers"
            :items="getVehicles"
            :items-per-page="14"
            class="elevation-0"
            sort-by="name"
          >
            <template v-slot:item.actions="{ item }">
              <vehicle-delete :vehicle="item" />
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

//components
import RegisterVehicle from "../components/RegisterVehicle.vue";
import VehicleDelete from "../components/VehiculeDelete.vue";

export default {
  components: {
    "register-vehicle": RegisterVehicle,
    "vehicle-delete": VehicleDelete,
  },
  data: () => ({
    headers: [
      {
        text: "License number",
        value: "license",
        align: "start",
        sortable: false,
      },
      { text: "Brand", value: "brand" },
      { text: "Type", value: "type" },
      { text: "Owner", value: "owner" },
      { text: "Actions", value: "actions" },
    ],
  }),
  computed: {
    ...mapGetters([
      "getVehicles",
      "getLoadingVehicles",
      "getVehicleServiceOffline",
    ]),
  },
  methods: {
    ...mapActions(["FETCH_VEHICLES", "VEHICLE_SERVICE_AVAILABILITY"]),
    editItem(item) {
      console.log(item);
    },
    deleteItem(item) {
      console.log(item);
    },
  },
  async beforeMount() {
    await this.VEHICLE_SERVICE_AVAILABILITY();
  },
  async mounted() {
    //TODO Load Vehicules
    if (!this.getVehicleServiceOffline) {
      await this.FETCH_VEHICLES();
    }
  },
};
</script>