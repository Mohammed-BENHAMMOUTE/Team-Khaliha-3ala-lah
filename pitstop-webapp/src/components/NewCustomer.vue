<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" depressed color="primary">
        <v-icon left>mdi-account-plus</v-icon>
        New Customer
      </v-btn>
    </template>
    <v-card :loading="getLoadingCustomers" class="pb-4">
      <v-card-title>
        <span class="text-lg-headline text-h6">
          <v-icon left>mdi-account-plus</v-icon> New Customer</span
        >
      </v-card-title>
      <v-card-text>
        <v-container fluid>
          <v-form ref="addCustomer" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="Full name*"
                  v-model="customer.name"
                  :rules="nameRules"
                  hide-details="auto"
                  :disabled="getLoadingCustomers"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Email*"
                  v-model="customer.email"
                  :rules="emailRules"
                  hide-details="auto"
                  :disabled="getLoadingCustomers"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Address*"
                  v-model="customer.address"
                  :rules="addressRules"
                  hide-details="auto"
                  :disabled="getLoadingCustomers"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="City*"
                  v-model="customer.city"
                  :rules="cityRules"
                  hide-details="auto"
                  :disabled="getLoadingCustomers"
                  outlined
                  required
                ></v-text-field>
              </v-col>
               <v-col cols="6">
                <v-text-field
                  label="Postal code*"
                  v-model="customer.postCode"
                  :rules="postCodeRules"
                  hide-details="auto"
                  :disabled="getLoadingCustomers"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Phone Number*"
                  v-model="customer.number"
                  :rules="numberRules"
                  hide-details="auto"
                  :disabled="getLoadingCustomers"
                  outlined
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" :disabled="getLoadingCustomers" text @click="dialog = false"> Close </v-btn>
        <v-btn color="primary" :disabled="getLoadingCustomers" depressed  @click="addCustomer">
          <v-icon left>mdi-plus</v-icon> Add
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapGetters, mapActions} from "vuex"
export default {
  data() {
    return {
      // Data
      dialog: false,
      valid: true,
      customer: {
        name: "",
        address: "",
        city: "",
        email: "",
        postCode: "",
        number: ""
      },
      //Form validation fields rules
      nameRules: [
        (v) => !!v || "Full name is required",
        (v) =>
          (v.length >= 5 && v.length <= 26) ||
          "Please enter valid name at least 5 letters",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      ],
      addressRules: [
        (v) => !!v || "Address is required",
        (v) =>
          (v.length >= 8 && v.length <= 50) ||
          "Please enter valid address at least 8 letters",
      ],
      cityRules: [
        (v) => !!v || "City is required",
        (v) =>
          (v.length >= 2 && v.length <= 26) ||
          "Please enter valid city at least 2 letters",
      ],
      numberRules: [
        (v) => !!v || "Phone number is required",
        (v) =>
          /^(?:(?:(?:\+|00)212[\s]?(?:[\s]?\(0\)[\s]?)?)|0){1}(?:5[\s.-]?[2-3]|6[\s.-]?[13-9]){1}[0-9]{1}(?:[\s.-]?\d{2}){3}$/.test(v) ||
          "Phone number must be moroccan valid: 0(5-6-4)xxxxxxxx or +212(5-6-7)xxxxxxxxxx",
      ],
      postCodeRules: [
        (v) => !!v || "Postal code is required is required",
        (v) =>
          (v.length >= 5 && v.length <= 7) ||
          "Please enter valid postal code min 5 max 7",
      ],
    };
  },
  computed:{
    ...mapGetters(["getLoadingCustomers"])
  },
  methods: {
    ...mapActions(["ADD_CUSTOMER"]),
    async addCustomer() {
      await this.$refs.addCustomer.validate();
      if (this.valid) {
        console.log(this.customer);
        //TODO Add customer
        let added = await this.ADD_CUSTOMER(this.customer);
        if(added){
          this.dialog = false;
          alert(`customer ${this.customer.name} has been added successfully`);
        }
      }
    },
  },
};
</script>