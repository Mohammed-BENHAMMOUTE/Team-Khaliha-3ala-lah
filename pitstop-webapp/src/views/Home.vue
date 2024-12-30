<template>
  <v-container class="pa-15" fluid>
    <v-row class="px-2 d-flex align-baseline">
      <h4 class="grey--text text-uppercase font-weight-medium">
        Welcome to Pitstop Garage Management System
      </h4>
      <v-spacer></v-spacer>
    </v-row>

    <v-row class="mt-10 no-gutters fill-height">
      <v-col cols="12" class="fill-height">
        <v-card class="elevation-0">
          <v-card-text class="pa-0">
            <!-- <v-img  src="@/assets/garage-image.jpg">
              <v-overlay absolute color="primary">
                <v-layout
                  class="d-flex flex-column align-center justify-center"
                  cols="12"
                >
                  <h1 class="text-h4 font-weight-thin mb-4 text-uppercase">
                    With pitstop
                  </h1>
                  <h4 class="subheading">Everything is possible!</h4>
                </v-layout>
              </v-overlay>
            </v-img> -->
            <v-img
              src="@/assets/garage-image.jpg"
              max-height="500"
              gradient="90deg, rgba(123,31,162,0.7329132336528361) 0%, rgba(135,1,191,0.7245098723082983) 100%"
            >
              <v-row class="white--text text-center no-gutters align-center justify-center fill-height">
                <v-col cols="12">
                  <h1 class="text-h4 font-weight-bold mb-4 text-uppercase">
                    pit<span class="font-weight-thin">stop</span>
                  </h1>
                  <h4 class="subheading">Everything is possible!</h4>
                </v-col>
              </v-row>
            </v-img>

            <!-- Info -->
            <div class="pa-8 d-flex flex-column">
              <span class="font-weight-bold text-h6 mb-2"
                >Full-Service Auto Repair & Maintenance Here at The Garage Auto
              </span>
              <span class="text-subtitle-2"
                >Repair in Broken Arrow we know you rely on your vehicle for a
                lot of things. It has to get you to work, the kids to school,
                and all the other obligations in between. Sometimes, your car
                slows down, but life doesn’t, which is why we pride ourselves on
                providing fast, quality service to get you back on the road as
                soon as possible. Our auto repair services range from oil
                changes and tune-ups to major repairs on your engine and
                transmission. When you choose our certified professionals, you
                can be sure that you’re getting work done you can count on,
                friendly service, and honest pricing. We use the most up-to-date
                diagnostic equipment to get to the bottom of the problem, and
                ensure that the repair is completed to your total satisfaction.
                We will always give you a free estimate and walk you through the
                details of the auto repair diagnostic. If your car doesn’t need
                something, we won’t offer it to you. We are committed to helping
                you protect your investment and also focused on providing the
                kind of high-quality auto repair and preventative maintenance
                that will keep your car running for a long time.</span
              >
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",

  components: {},
};
</script>
<style>
</style>
