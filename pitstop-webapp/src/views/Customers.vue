<template>
  <v-container class="pa-15" fluid>
    <!-- Offline service overlay -->
    <v-overlay :absolute="true" :value="true" color="white" opacity="1" v-if="getCustomerServiceOffline">
      <v-row class="fill-height no-gutters justify-center align-center">
        <v-col cols="12" class="d-flex flex-column align-center justify-center">
          <img
            src="@/assets/no-internet.png"
            alt="Offline service"
            width="250"
          />
          <span class="text-h6 black--text text-center mt-5 font-weight-light"
            >We're sorry customer service is offline</span
          >
        </v-col>
      </v-row>
    </v-overlay>

    <!-- Title -->
    <v-row class="px-2 d-flex align-baseline">
      <h4 class="grey--text text-uppercase font-weight-medium">
        Customer management
      </h4>
      <v-spacer></v-spacer>

      <!--New Customer -->
      <new-customer />
    </v-row>

    <!-- Data table -->
    <v-row class="mt-10 fill-height no-gutters">
      <v-col cols="12" class="fill-height">
        <v-card class="elevation-0 fill-height" :loading="getLoadingCustomers">
          <v-data-table
            :headers="headers"
            :items="getCustomers"
            :items-per-page="14"
            class="elevation-0"
            sort-by="name"
          >
            <!-- Customer delete confirmation-->
            <template v-slot:item.actions="{ item }">
              <customer-delete :customer="item" />
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
import NewCustomer from "../components/NewCustomer.vue";
import CustomerDelete from "../components/CustomerDelete";

export default {
  components: {
    "new-customer": NewCustomer,
    "customer-delete": CustomerDelete,
  },
  computed: {
    ...mapGetters(["getLoadingCustomers", "getCustomers", "getCustomerServiceOffline"]),
  },
  data: () => ({
    headers: [
      {
        text: "Full name",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Address", value: "address" },
      { text: "City", value: "city" },
      { text: "Email address", value: "email" },
      { text: "Postal code", value: "postCode" },
      { text: "Phone Number ", value: "number" },
      { text: "Actions", value: "actions" },
    ],
    deleteConfirmation: false,
  }),
  methods: {
    ...mapActions(["FETCH_CUSTOMERS", "CUSTOMER_SERVICE_AVAILABILITY"]),
    editItem(item) {
      console.log(item);
    },
    deleteItem(item) {
      console.log(item);
    },
  },
  async beforeMount(){
    await this.CUSTOMER_SERVICE_AVAILABILITY();
  },
  async mounted() {
    //TODO Load Customers
    if(!this.getCustomerServiceOffline){
      await this.FETCH_CUSTOMERS();
    }
  },
};
</script>