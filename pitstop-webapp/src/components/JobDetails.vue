<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="secondary" text v-bind="attrs" v-on="on">
        <v-icon left>mdi-account-details</v-icon> More details
      </v-btn>
    </template>

    <v-card :loading="loading" v-if="details !== null">
      <v-card-title class="text-h5">
        <v-icon left>mdi-information</v-icon> Job details
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text class="d-flex flex-column mt-3">
        <!-- Description -->
        <div class="d-flex flex-column">
          <span class="text-h6 black--text"
            ><v-icon left>mdi-image-text</v-icon> Description:
          </span>
          <div class="d-flex align-center justify-center">
            <span class="text-subtitle-1 ml-3"
              ><v-chip>{{ details.description }}</v-chip></span
            >
          </div>
        </div>

        <!-- Vehicle informations -->
        <div class="d-flex flex-column mt-3">
          <span class="text-h6 black--text">
            <v-icon left>mdi-car</v-icon> Vehicle Information:</span
          >
          <div class="d-flex align-center justify-center">
            <v-chip class="mr-2">{{ details.Vehicle.license }}</v-chip>
            <v-chip class="mr-2">{{ details.Vehicle.type }}</v-chip>
            <v-chip class="mr-2">{{ details.Vehicle.brand }}</v-chip>
          </div>
        </div>

        <!-- Customer informations -->
        <div class="d-flex flex-column mt-3">
          <span class="text-h6 black--text">
            <v-icon left>mdi-account</v-icon> Customer Information:</span
          >
          <div class="d-flex align-center justify-center">
            <v-chip class="mr-2">{{ details.Vehicle.Customer.name }}</v-chip>
            <v-chip class="mr-2">{{ details.Vehicle.Customer.number }}</v-chip>
          </div>
          <div class="d-flex align-center justify-center mt-2">
            <v-chip class="mr-2">{{ details.Vehicle.Customer.email }}</v-chip>
          </div>
        </div>

        <!-- Job Status -->
        <div class="d-flex flex-column">
          <span class="text-h6 black--text"
            ><v-icon left>mdi-list-status</v-icon> Status:
          </span>
          <div class="d-flex align-center justify-center">
            <v-chip dark v-if="details.status == 'planned'" color="orange">
                    <v-icon left>mdi-wrench-clock</v-icon> Planned</v-chip
                  >
                  <v-chip dark v-if="details.status == 'completed'" color="green">
                    <v-icon left>mdi-check</v-icon> Completed</v-chip
                  >
          </div>
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" text @click="dialog = false"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["id"],
  data: () => ({
    dialog: false,
    details: null,
    loading: false,
  }),
  watch: {
    async dialog(visible) {
      if (visible) {
        //TODO Fetch job details
        this.loading = true;
        this.$store
          .dispatch("FETCH_JOB_DETAILS", this.id)
          .then((details) => {
            this.details = details;
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
            this.dialog = false;
          });
      } else {
        this.loading = false;
        console.log("closing job details for job id: " + this.id);
      }
    },
  },
};
</script>