import Vue from 'vue'
import Vuex from 'vuex'


//modules
import customer from "./modules/customer"
import vehicle from "./modules/vehicle"
import workshop from "./modules/workshop"



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    customer,
    vehicle,
    workshop
  }
})
