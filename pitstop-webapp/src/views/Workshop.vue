<template>
  <v-container class="pa-15" fluid>
    <!-- Offline service overlay -->
    <v-overlay
      :absolute="true"
      :value="true"
      color="white"
      opacity="1"
      v-if="getWorkshopServiceOffline"
    >
      <v-row class="fill-height no-gutters justify-center align-center">
        <v-col cols="12" class="d-flex flex-column align-center justify-center">
          <img
            src="@/assets/no-internet.png"
            alt="Offline service"
            width="250"
          />
          <span class="text-h6 black--text text-center mt-5 font-weight-light"
            >We're sorry workshop service is offline</span
          >
        </v-col>
      </v-row>
    </v-overlay>

    <!-- Title -->
    <v-row class="px-2 d-flex align-baseline">
      <h4 class="grey--text text-uppercase font-weight-medium">
        Workshop management
      </h4>
      <v-spacer></v-spacer>

      <!-- Plan a maintenance job -->
      <plan-maintenance-job :date="date" />
    </v-row>

    <v-row class="mt-10 no-gutters fill-height">
      <v-col cols="12" class="fill-height">
        <v-card class="elevation-0">
          <!-- <v-sheet height="500">
            <v-calendar color="primary" type="day" :events="events">
              <template v-slot:day-header="{ present }">
                <template v-if="present" class="text-center"> Today </template>
              </template>

            </v-calendar>
          </v-sheet> -->

          <!-- Tabs header -->
          <v-tabs
            v-model="tab"
            background-color="primary"
            centered
            icons-and-text
            dark
          >
            <v-tabs-slider></v-tabs-slider>
            <v-tab href="#data-table">
              Data Table
              <v-icon>mdi-table</v-icon>
            </v-tab>

            <v-tab href="#calendar">
              Calendar
              <v-icon>mdi-calendar</v-icon>
            </v-tab>
          </v-tabs>

          <!-- Tabs Items -->
          <v-tabs-items v-model="tab">
            <!-- Data table item -->
            <v-tab-item value="data-table">
              <v-data-table
                :headers="headers"
                :items="getMaintenanceJobs"
                :items-per-page="14"
                class="elevation-0"
                sort-by="license"
                :loading="getLoadingWorkshop"
                loading-text="Please wait ..., one moment until we prepare the date for you"
              >
                <!-- Start time -->
                <template v-slot:item.start="{ item }">
                  {{ moment(item.start).format("LLLL") }}
                </template>

                <!-- End time -->
                <template v-slot:item.end="{ item }">
                  {{ moment(item.end).format("LLLL") }}
                </template>

                <!-- End time -->
                <template v-slot:item.duration="{ item }">
                  {{
                    moment
                      .utc(
                        moment
                          .duration(moment(item.end).diff(moment(item.start)))
                          .as("milliseconds")
                      )
                      .format("HH:mm:ss")
                  }}
                </template>

                <!-- Status -->
                <template v-slot:item.status="{ item }">
                  <v-chip dark v-if="item.status == 'planned'" color="orange">
                    <v-icon left>mdi-wrench-clock</v-icon> Planned</v-chip
                  >
                  <v-chip dark v-if="item.status == 'completed'" color="green">
                    <v-icon left>mdi-check</v-icon> Completed</v-chip
                  >
                </template>

                <!-- Actions -->
                <template v-slot:item.actions="{ item }">
                  <maintenance-job-delete :job="item" />
                  <complete-job v-if="item.status == 'planned'" :job="item" />
                </template>

                <!-- Details -->
                <template v-slot:item.details="{ item }">
                  <job-details :id="item.id" />
                </template>
              </v-data-table>
            </v-tab-item>

            <!-- CAlendar item-->
            <v-tab-item value="calendar">
              <v-sheet height="64">
                <v-toolbar flat>
                  <v-btn
                    outlined
                    class="mr-4"
                    color="grey darken-2"
                    @click="setToday"
                  >
                    Today
                  </v-btn>
                  <v-btn fab text small color="grey darken-2" @click="prev">
                    <v-icon small> mdi-chevron-left </v-icon>
                  </v-btn>
                  <v-btn fab text small color="grey darken-2" @click="next">
                    <v-icon small> mdi-chevron-right </v-icon>
                  </v-btn>
                  <v-toolbar-title class="ml-3" v-if="$refs.calendar">
                    {{ $refs.calendar.title }}
                  </v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
              </v-sheet>
              <v-sheet height="600">
                <v-calendar
                  ref="calendar"
                  v-model="date"
                  color="primary"
                  type="day"
                  :events="getMaintenanceJobs.filter(function(job) { return job.status === 'planned'})"
                ></v-calendar>
              </v-sheet>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import moment from "moment";
import { mapGetters, mapActions } from "vuex";

//components
import PlanMaintenanceJob from "../components/PlanMaintenanceJob.vue";
import MaintenanceJobDelete from "../components/MaintenanceJobDelete.vue";
import CompleteJob from "../components/CompleteJob.vue";
import JobDetails from "../components/JobDetails.vue";

export default {
  components: {
    "plan-maintenance-job": PlanMaintenanceJob,
    "maintenance-job-delete": MaintenanceJobDelete,
    "complete-job": CompleteJob,
    "job-details": JobDetails,
  },
  data: () => ({
    date: moment(new Date()).format("YYYY-MM-DD"),
    tab: null,
    headers: [
      {
        text: "License number",
        value: "license",
        align: "start"
      },
      { text: "Start Time", value: "start" },
      { text: "End Time", value: "end" },
      { text: "Duration", value: "duration", sortable: false, },
      { text: "Description", value: "name", sortable: false, },
      { text: "Status", value: "status" },
      { text: "Actions", value: "actions", sortable: false, },
      { text: "", value: "details", sortable: false, },
    ],
  }),
  computed: {
    ...mapGetters([
      "getMaintenanceJobs",
      "getLoadingWorkshop",
      "getWorkshopServiceOffline",
    ]),
  },
  methods: {
    ...mapActions(["WORKSHOP_SERVICE_AVAILABILITY", "FETCH_JOBS"]),
    setToday() {
      this.date = moment(new Date()).format("YYYY-MM-DD");
    },
    async prev() {
      await this.$refs.calendar.prev();
      // await this.FETCH_JOBS(this.date);
    },
    async next() {
      await this.$refs.calendar.next();
      // await this.FETCH_JOBS(this.date);
    },
  },
  mounted() {
    //TODO Load todays planning
    this.FETCH_JOBS();
  },
  async beforeMount() {
    await this.WORKSHOP_SERVICE_AVAILABILITY();
  },
};
</script>