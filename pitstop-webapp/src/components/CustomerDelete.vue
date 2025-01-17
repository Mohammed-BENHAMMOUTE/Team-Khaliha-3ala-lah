<template>
  <v-dialog v-model="deleteConfirmation" persistent max-width="450">
    <template v-slot:activator="{ on, attrs }">
      <v-icon small v-bind="attrs" v-on="on"> mdi-delete </v-icon>
    </template>
    <v-card class="elevation-0" :loading="getLoadingCustomers">
      <v-card-title class="text-h5"> Delete confirmation ? </v-card-title>
      <v-card-text
        >Are you sure you wanna delete customer:
        {{ customer.name }} ?</v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" text @click="deleteConfirmation = false">
          Cancel
        </v-btn>
        <v-btn color="red" text @click="deleteCustomer">
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["customer"],
  data: () => ({
    deleteConfirmation: false,
  }),
  computed: {
    ...mapGetters(["getLoadingCustomers"]),
  },
  methods: {
    ...mapActions(["DELETE_CUSTOMER", "FETCH_CUSTOMERS"]),
    async deleteCustomer() {
      //TODO delete customer
      let deleted = await this.DELETE_CUSTOMER(this.customer.id);
      if(deleted) {
        this.deleteConfirmation = false;
        await this.FETCH_CUSTOMERS();
        alert(`Customer ${this.customer.name} has been deleted successfully`)
      }
    },
  },
}
</script>