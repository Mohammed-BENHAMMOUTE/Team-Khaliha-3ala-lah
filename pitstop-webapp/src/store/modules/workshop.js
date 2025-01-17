import { API_GATEWAY } from "../../utils/axios"
import moment from "moment"
const state = {
    workshopVehicles: [],
    maintenanceJobs: [],
    workshopLoading: false,
    workshopServiceOffline: false

};
const getters = {
    getWorkshopVehicles: (state) => {
        return state.workshopVehicles;
    },
    getMaintenanceJobs: (state) => {
        return state.maintenanceJobs;
    },
    getLoadingWorkshop: (state) => {
        return state.workshopLoading;
    },
    getWorkshopServiceOffline: (state) => {
        return state.workshopServiceOffline;
    }
};
const mutations = {
    setWorkshopVehicles: (state, payload) => {
        state.workshopVehicles = payload;
    },
    setMaintenanceJobs: (state, payload) => {
        state.maintenanceJobs = payload;
    },
    setLoadingWorkshop: (state, payload) => {
        state.workshopLoading = payload;
    },
    setWorkshopServiceOffline: (state, payload) => {
        state.workshopServiceOffline =payload;
    },
}
const actions = {
    WORKSHOP_SERVICE_AVAILABILITY: ({commit}) => {
        return new Promise((resolve, reject) => {
            API_GATEWAY.get("/api/workshop/ping")
                .then((res) => {
                    if(res.status == 200){
                        commit("setWorkshopServiceOffline", false);
                        resolve(true);
                    }
                })
                .catch(err => {
                    if(err.message == "Network Error"){
                        commit("setWorkshopServiceOffline", true);
                        reject(false);
                    }
                })
        });
    },
    FETCH_WORKSHOP_VEHICLES: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit("setLoadingWorkshop", true);
            API_GATEWAY.get("/api/workshop/vehicles/all")
                .then((res) => {
                    let vehicles = [];
                    res.data.forEach((vl) => {
                        vehicles.push({
                            license: vl.license,
                            brand: vl.brand,
                            type: vl.type,
                            owner: vl.Customer
                        })
                    });
                    commit("setWorkshopVehicles", vehicles);
                    commit("setLoadingWorkshop", false);
                    resolve();
                })
                .catch(err => {
                    commit("setLoadingWorkshop", false);
                    reject(err);
                })
        });
    },
    FETCH_JOBS: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit("setLoadingWorkshop", true);
            API_GATEWAY.get("/api/workshop/jobs/all")
                .then((res) => {
                    let jobs = [];
                    res.data.forEach((jb) => {
                        jobs.push({
                            id: jb.id,
                            name: jb.description,
                            start: moment(jb.startTime).format("YYYY-MM-DDTHH:mm:ss"),
                            end: moment(jb.endTime).format("YYYY-MM-DDTHH:mm:ss"),
                            status: jb.status,
                            license: jb.vehicle
                        });
                    });
                    commit("setMaintenanceJobs", jobs);
                    commit("setLoadingWorkshop", false);
                    resolve();
                })
                .catch(err => {
                    commit("setLoadingWorkshop", false);
                    reject(err);
                })
        });
    },
    FETCH_JOB_DETAILS: (_, payload) => {
        return new Promise((resolve, reject) => {
            API_GATEWAY.get("/api/workshop/jobs/"+payload)
                .then((res) => {
                    resolve(res.data);
                })
                .catch(err => {
                    reject(err);
                })
        });
    },
    DELETE_JOB: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            commit("setLoadingWorkshop", true);
            API_GATEWAY.delete(`/api/workshop/jobs/${payload}`)
                .then((res) => {
                    commit("setLoadingWorkshop", false);
                    if (res.status == 200) {
                        resolve(res.data);
                    } else {
                        resolve(false);
                    }
                })
                .catch(err => {
                    commit("setLoadingWorkshop", false);
                    reject(err);
                })
        });
    },
    COMPLETE_JOB: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            commit("setLoadingWorkshop", true);
            API_GATEWAY.put(`/api/workshop/jobs/complete/${payload}`)
                .then((res) => {
                    commit("setLoadingWorkshop", false);
                    if (res.status == 200) {
                        resolve(res.data);
                    } else {
                        resolve(false);
                    }
                })
                .catch(err => {
                    commit("setLoadingWorkshop", false);
                    reject(err);
                })
        });
    },
    SCHEDULE_JOB: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            commit("setLoadingWorkshop", true);
            API_GATEWAY.post(`/api/workshop/jobs/schedule`, payload)
                .then((res) => {
                    commit("setLoadingWorkshop", false);
                    if (res.status == 200) {
                        resolve(res.data);
                    } else {
                        resolve(false);
                    }
                })
                .catch(err => {
                    commit("setLoadingWorkshop", false);
                    reject(err);
                })
        });
    },
    
};
export default {
    state,
    getters,
    mutations,
    actions
}
