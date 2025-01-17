<template>
  <v-app >
    <!--Navigation drawer -->
    <v-navigation-drawer app class="deep-purple accent-4" dark permanent>
      <!-- Logo and name -->
      <v-row
        class="d-flex flex-column align-center justify-center mb-lg-10 mb-sm-5"
      >
        <v-flex class="mt-10">
          <v-avatar size="90" color="red">
            <img src="@/assets/logo-512.png" alt="Pitstop" />
          </v-avatar>
        </v-flex>
        <v-flex class="mt-4">
          <p
            class="
              text-center
              white--text
              text-h5
              font-weight-light
              text-uppercase
            "
          >
            Pit<span class="font-weight-medium">stop</span>
          </p>
        </v-flex>
      </v-row>

      <!-- Main Menu -->
      <v-list nav dense>
        <v-subheader>General</v-subheader>
        <v-list-item
          link
          class="py-2"
          v-for="(item, index) in menuItems"
          :key="index"
          router
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.label"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- Main Menu -->
    </v-navigation-drawer>

    <v-main class="grey lighten-3">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    menuItems: [
      {
        icon: "mdi-home-circle",
        label: "Home",
        route: "/",
      },
      {
        icon: "mdi-face-agent",
        label: "Customer management",
        route: "/customers",
      },
      {
        icon: "mdi-car-estate",
        label: "Vehicle management",
        route: "/vehicles",
      },
      {
        icon: "mdi-calendar-edit",
        label: "Workshop planning",
        route: "/workshop",
      },
    ],
  }),
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

.v-navigation-drawer {
  background-image: linear-gradient(
    to right top,
    #311b92,
    #472a9e,
    #5a39aa,
    #6c48b6,
    #7e57c2
  );
}

.v-application {
  font-family: "Montserrat", sans-serif !important;
}
.headline,
.title,
.subheading {
  font-family: "Montserrat", sans-serif !important;
}
</style>