<template>
  <v-dialog v-model="dialog" persistent max-width="40%">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" depressed color="primary">
        <v-icon left>mdi-wrench-clock</v-icon>
        Plan a maintenance job
      </v-btn>
    </template>
    <v-card class="pb-4" :loading="getLoadingWorkshop">
      <v-card-title>
        <span class="text-lg-headline text-h6">
          <v-icon left>mdi-wrench-clock</v-icon> Plan a maintenance job</span
        >
      </v-card-title>
      <v-card-text>
        <v-container fluid>
          <v-form ref="planMaintenance" v-model="valid" lazy-validation>
            <v-row>
              <!-- Start time-->
              <v-col cols="6">
                <v-menu
                  ref="startTimeMenu"
                  v-model="startTimeMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="startTimeMenu"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="maintenanceJob.startTime"
                      label="Start time"
                      readonly
                      outlined
                      v-bind="attrs"
                      v-on="on"
                      :rules="startTimeRules"
                      hide-details="auto"
                      prepend-inner-icon="mdi-clock-time-four-outline"
                      :disabled="getLoadingWorkshop"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="startTimeMenu"
                    v-model="maintenanceJob.startTime"
                    :max="maintenanceJob.endTime"
                    full-width
                    @click:minute="
                      $refs.startTimeMenu.save(maintenanceJob.startTime)
                    "
                  ></v-time-picker>
                </v-menu>
              </v-col>
              <!-- Start time-->
              <v-col cols="6">
                <v-menu
                  ref="endTimeMenu"
                  v-model="endTimeMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="endTimeMenu"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="maintenanceJob.endTime"
                      label="End time"
                      readonly
                      outlined
                      v-bind="attrs"
                      v-on="on"
                      :rules="endTimeRules"
                      hide-details="auto"
                      prepend-inner-icon="mdi-clock-time-four-outline"
                      :disabled="getLoadingWorkshop"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="endTimeMenu"
                    v-model="maintenanceJob.endTime"
                    :min="maintenanceJob.startTime"
                    full-width
                    @click:minute="
                      $refs.endTimeMenu.save(maintenanceJob.endTime)
                    "
                  ></v-time-picker>
                </v-menu>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Job Description*"
                  v-model="maintenanceJob.description"
                  :rules="descriptionRules"
                  hide-details="auto"
                  outlined
                  required
                  :disabled="getLoadingWorkshop"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="maintenanceJob.vehicle"
                  :items="getWorkshopVehicles"
                  :rules="vehicleRules"
                  label="Vehicle*"
                  hide-details="auto"
                  item-value="license"
                  :item-text="
                    (row) => {
                      return row.brand + ' ' + row.type + ' - ' + row.license + ' - ' + row.owner.name;
                    }
                  "
                  outlined
                  required
                  :disabled="getLoadingWorkshop"
                >
                  <!-- <template slot="selection" slot-scope="item">
                    {{ item.brand }} {{ item.type }}-{{ item.license }}
                  </template> -->
                </v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          :disabled="getLoadingWorkshop"
          text
          @click="dialog = false"
        >
          Close
        </v-btn>
        <v-btn
          color="primary"
          :disabled="getLoadingWorkshop"
          depressed
          @click="planMaintenance"
        >
          <v-icon left>mdi-clock-outline</v-icon> schedule
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["date"],
  data() {
    return {
      // Data
      startTimeMenu: false,
      endTimeMenu: false,
      dialog: false,
      valid: true,

      maintenanceJob: {
        startTime: "",
        endTime: "",
        description: "",
        status: "planned",
        vehicle: "",
      },
      //Form validation fields rules
      startTimeRules: [(v) => !!v || "Start time is required"],
      endTimeRules: [(v) => !!v || "End time is required"],
      vehicleRules: [(v) => !!v || "Vehicle is required"],
      descriptionRules: [(v) => !!v || "Job description is required"],
    };
  },
  computed: {
    ...mapGetters(["getLoadingWorkshop", "getWorkshopVehicles"]),
  },
  methods: {
    ...mapActions(["FETCH_WORKSHOP_VEHICLES", "SCHEDULE_JOB", "FETCH_JOBS"]),
    async planMaintenance() {
      await this.$refs.planMaintenance.validate();
      if (this.valid) {
        // console.log(this.customer);
        //TODO plan a maintenance job
        let added = await this.SCHEDULE_JOB({
          date: this.date,
          ...this.maintenanceJob
        });
         if(added != false){
          this.dialog = false;
          alert(added);
        }
      }
    },
  },
  watch: {
    async dialog(visible) {
      if (visible) {
        await this.FETCH_WORKSHOP_VEHICLES();
      } else {
        this.$store.commit("setWorkshopVehicles", []);
        await this.FETCH_JOBS(this.date);
      }
    },
  },
  mounted() {
    //console.log(moment(new Date()).format('YYYY-MM-DD'))
  },
};
</script>