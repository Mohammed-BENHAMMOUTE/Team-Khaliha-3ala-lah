<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" depressed color="primary">
        <v-icon left>mdi-car-arrow-right</v-icon>
        Register a vehicle
      </v-btn>
    </template>
    <v-card :loading="getLoadingVehicles" class="pb-4">
      <v-card-title>
        <span class="text-lg-headline text-h6">
          <v-icon left>mdi-car-arrow-right</v-icon>
          Register a vehicle</span
        >
      </v-card-title>
      <v-card-text>
        <v-container fluid>
          <v-form ref="registerVehicle" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="Brand*"
                  v-model="vehicle.brand"
                  :rules="brandRules"
                  hide-details="auto"
                  :disabled="getLoadingVehicles"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Type*"
                  v-model="vehicle.type"
                  :rules="typeRules"
                  hide-details="auto"
                  :disabled="getLoadingVehicles"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="License number*"
                  v-model="vehicle.license"
                  :rules="licenseRules"
                  hide-details="auto"
                  :disabled="getLoadingVehicles"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="vehicle.owner"
                  :items="getCustomersVehicles"
                  :rules="ownerRules"
                  label="Owner*"
                  hide-details="auto"
                  :disabled="getLoadingVehicles"
                  item-text="name"
                  item-value="id"
                  outlined
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" :disabled="getLoadingVehicles" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn
          color="primary"
          :disabled="getLoadingVehicles"
          depressed
          @click="addVehicle"
        >
          <v-icon left>mdi-plus</v-icon> Add
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      // Data
      dialog: false,
      valid: true,
      vehicle: {
        brand: "",
        type: "",
        license: "",
        owner: null,
      },
      //Form validation fields rules
      brandRules: [
        (v) => !!v || "Brand is required",
        (v) =>
          (v.length >= 2 && v.length <= 26) ||
          "Please enter brand name at least 2 letters",
      ],
      typeRules: [
        (v) => !!v || "Type is required",
        (v) =>
          (v.length >= 2 && v.length <= 26) ||
          "Please enter type name at least 2 letters",
      ],
      licenseRules: [
        (v) => !!v || "License is required",
        (v) =>
          /^\d{5}[|][A-Z]{1}[|]\d{1,2}$/.test(v) ||
          "License plate should be like: 45884|A|10",
      ],
      ownerRules: [(v) => !!v || "Owner is required"],
      items: [
        {
          id: 1,
          name: "MSALEK Mouad",
        },
        {
          id: 2,
          name: "ANDERSON Anthoine",
        },
        {
          id: 3,
          name: "DOE Jane",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["getLoadingVehicles", "getCustomersVehicles"]),
  },
  methods: {
    ...mapActions(["ADD_VEHICLE", "FETCH_CUSTOMERS_VEHICLES"]),
    async addVehicle() {
      await this.$refs.registerVehicle.validate();
      if (this.valid) {
        console.log(this.vehicle);
        //TODO register vehicle
        let added = await this.ADD_VEHICLE(this.vehicle);
        if(added){
          this.dialog = false;
          alert(`customer ${this.vehicle.license} has been added successfully`);
        }
      }
    },
  },
  async beforeMount() {
    //TODO load customers
    await this.FETCH_CUSTOMERS_VEHICLES()
  },
};
</script>