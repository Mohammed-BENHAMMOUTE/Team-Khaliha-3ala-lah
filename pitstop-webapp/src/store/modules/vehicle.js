import { API_GATEWAY } from "../../utils/axios"

const state = {
    customers_vehicle: [],
    vehicles: [],
    vehicleLoading: false,
    vehicleServiceOffline: false

};
const getters = {
    getCustomersVehicles: (state) => {
        return state.customers_vehicle;
    },
    getVehicles: (state) => {
        return state.vehicles;
    },
    getLoadingVehicles: (state) => {
        return state.vehicleLoading;
    },
    getVehicleServiceOffline: (state) => {
        return state.vehicleServiceOffline;
    }
};
const mutations = {
    setCustomersVehicles: (state, payload) => {
        state.customers_vehicle = payload;
    },
    setVehicles: (state, payload) => {
        state.vehicles = payload;
    },
    setLoadingVehicles: (state, payload) => {
        state.vehicleLoading = payload;
    },
    addVehicle: (state, payload) => {
        state.vehicles.push(payload);
    },
    setVehicleServiceOffline: (state, payload) => {
        state.vehicleServiceOffline =payload;
    }
}
const actions = {
    VEHICLE_SERVICE_AVAILABILITY: ({commit}) => {
        return new Promise((resolve, reject) => {
            API_GATEWAY.get("/api/vehicles/ping")
                .then((res) => {
                    if(res.status == 200){
                        commit("setVehicleServiceOffline", false);
                        resolve();
                    }
                })
                .catch(err => {
                    if(err.message == "Network Error"){
                        commit("setVehicleServiceOffline", true);
                        reject();
                    }
                })
        });
    },
    FETCH_CUSTOMERS_VEHICLES: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit("setLoadingVehicles", true);
            API_GATEWAY.get("/api/vehicles/customers/all")
            .then((customers) => {
                commit("setCustomersVehicles", customers.data);
                commit("setLoadingVehicles", false);
                resolve();
            })
            .catch(err => {
                commit("setLoadingVehicles", false);
                reject(err);
            })
        });
    },
    FETCH_VEHICLES: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit("setLoadingVehicles", true);
            API_GATEWAY.get("/api/vehicles/all")
                .then((res) => {
                    let vehicles = [];
                    res.data.forEach((vl) => {
                        vehicles.push({
                            license: vl.license,
                            brand: vl.brand,
                            type: vl.type,
                            owner: vl.Customer.name,
                            ownerId: vl.Customer.id
                        })
                    });
                    commit("setVehicles", vehicles);
                    commit("setLoadingVehicles", false);
                    resolve();
                })
                .catch(err => {
                    commit("setLoadingVehicles", false);
                    reject(err);
                })
        });
    },
    DELETE_VEHICLE: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            commit("setLoadingVehicles", true);
            API_GATEWAY.delete(`/api/vehicles/${payload}`)
                .then((res) => {
                    commit("setLoadingVehicles", false);
                    if (res.status == 200) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
                .catch(err => {
                    commit("setLoadingVehicles", false);
                    reject(err);
                })
        });
    },
    ADD_VEHICLE: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            commit("setLoadingVehicles", true);
            API_GATEWAY.post(`/api/vehicles/add`, payload)
                .then((res) => {
                    commit("setLoadingVehicles", false);
                    if (res.status == 200) {
                        commit("addVehicle", payload);
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
                .catch(err => {
                    commit("setLoadingVehicles", false);
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
