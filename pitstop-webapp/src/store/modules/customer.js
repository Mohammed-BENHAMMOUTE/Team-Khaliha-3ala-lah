import {API_GATEWAY } from "../../utils/axios"

const state = {
    customers: [],
    customerLoading: false,
    customerServiceOffline: false
};
const getters = {
    getCustomers: (state) => {
        return state.customers;
    },
    getLoadingCustomers: (state) => {
        return state.customerLoading;
    },
    getCustomerServiceOffline: (state) => {
        return state.customerServiceOffline;
    }
};
const mutations = {
    setCustomers: (state, payload) => {
        state.customers = payload;
    },
    setLoadingCustomers: (state, payload) => {
        state.customerLoading = payload;
    },
    addCustomer: (state, payload) => {
        state.customers.push(payload);
    },
    setCustomerServiceOffline: (state, payload) => {
        state.customerServiceOffline =payload;
    }
}
const actions = {
    CUSTOMER_SERVICE_AVAILABILITY: ({commit}) => {
        return new Promise((resolve, reject) => {
            API_GATEWAY.get("/api/customers/ping")
                .then((res) => {
                    if(res.status == 200){
                        commit("setCustomerServiceOffline", false);
                        resolve();
                    }
                })
                .catch(err => {
                    if(err.message == "Network Error"){
                        commit("setCustomerServiceOffline", true);
                        reject();
                    }
                })
        });
    },
    FETCH_CUSTOMERS: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit("setLoadingCustomers", true);
            API_GATEWAY.get("/api/customers/all")
                .then((customers) => {
                    commit("setCustomers", customers.data);
                    commit("setLoadingCustomers", false);
                    resolve();
                })
                .catch(err => {
                    commit("setLoadingCustomers", false);
                    reject(err);
                })
        });
    },
    DELETE_CUSTOMER: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            commit("setLoadingCustomers", true);
            API_GATEWAY.delete(`/api/customers/${payload}`)
                .then((res) => {
                    commit("setLoadingCustomers", false);
                    if (res.status == 200) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
                .catch(err => {
                    commit("setLoadingCustomers", false);
                    reject(err);
                })
        });
    },
    ADD_CUSTOMER: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            commit("setLoadingCustomers", true);
            API_GATEWAY.post(`/api/customers/add`, payload)
                .then((res) => {
                    commit("setLoadingCustomers", false);
                    if (res.status == 200) {
                        commit("addCustomer", payload);
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
                .catch(err => {
                    commit("setLoadingCustomers", false);
                    reject(err);
                })
        });
    }
};
export default {
    state,
    getters,
    mutations,
    actions
}
