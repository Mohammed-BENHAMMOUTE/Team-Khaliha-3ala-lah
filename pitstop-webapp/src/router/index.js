import Vue from 'vue'
import VueRouter from 'vue-router'

//components
import Home from '../views/Home.vue'
import Customers from '../views/Customers.vue'
import Vehicles from '../views/Vehicles.vue'
import Workshop from '../views/Workshop.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/customers',
    name: 'Customers',
    component: Customers
  },
  {
    path: '/vehicles',
    name: 'Vehicles',
    component: Vehicles
  },
  {
    path: '/workshop',
    name: 'Workshop',
    component: Workshop
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
