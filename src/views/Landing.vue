<template>
  <v-app>
    <v-app-bar app fixed light lights-in height="70" color="white" dense dark elevation="40">
      <v-list-item-avatar size="60">
        <img src="../assets/wawens.png">
      </v-list-item-avatar>
      <v-toolbar-title class="deep-purple--text">WAWEN'S UBE HALAYA</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link id="signUp" to="/register">
        <v-btn id="signUp" color="purple darken-2" text>Sign Up</v-btn>
      </router-link>
      <router-link id="signIn" to="/login">
        <v-btn id="signIn" color="purple darken-2" text>Login</v-btn>
      </router-link>
    </v-app-bar>
    <div class="ma-5 mb-12 pa-5">
      <v-row>
        <v-card
    class="mx-auto"
    color="rgb(217, 167, 252)"
    light
    max-width="400"
  >
    <v-card-title>
      <v-icon
        large
        left
      >
        mdi-information
      </v-icon>
      <!-- <span class="title font-weight-light">Twitter</span> -->
    </v-card-title>

    <v-card-text class="textfont-weight-thin">
      Ube Halaya na lami, apan dili bidli. Basta matilwan, dili na gyud mabinlan.
Matud pa nila, maablihan na gani ang botelya sa Wawen's Ube Halaya - dili na gyud katugpa sa lamesa. Suwayi na!
    </v-card-text>

  </v-card>
        <!-- <v-textarea
          id="about"
          background-color="rgb(217, 167, 252)"
          outlined
          prepend-inner-icon="mdi-information"
          name="input-7-1"
          auto-grow
          value="Ube Halaya na lami, apan dili bidli. Basta matilwan, dili na gyud mabinlan.
Matud pa nila, maablihan na gani ang botelya sa Wawen's Ube Halaya - dili na gyud katugpa sa lamesa. Suwayi na!"
        ></v-textarea> -->
        <v-spacer></v-spacer>
        <router-link to="/register" id="createBtn">
          <v-btn color="purple darken-2" rounded outlined dark>
            <v-icon>mdi-plus</v-icon>
            <v-toolbar-title>Create Order</v-toolbar-title>
          </v-btn>
        </router-link>
      </v-row>
      <template>
        <v-row>
          <v-col>
            <v-hover v-slot:default="{ hover }">
              <v-card class="mx-auto" color="grey lighten-4">
                <v-img :aspect-ratio="16/9" src="../assets/halayaTab.jpg">
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out purple darken-2 v-card--reveal display-3 white--text"
                      style="height: 100%;"
                    >Take a try</div>
                  </v-expand-transition>
                </v-img>
                <v-card-text class="pt-6" style="position: relative;">
                  <div class="font-weight-light grey--text title mb-2">Perfect Ubelicious treat</div>
                  <h3 class="display-1 font-weight-light orange--text mb-2">Ube halaya in a tub</h3>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
          <v-col>
            <v-hover v-slot:default="{ hover }">
              <v-card class="mx-auto" color="grey lighten-4">
                <v-img :aspect-ratio="16/9" src="../assets/halayaJar.jpg">
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out purple darken-2 v-card--reveal display-3 white--text"
                      style="height: 100%;"
                    >Have a taste</div>
                  </v-expand-transition>
                </v-img>
                <v-card-text class="pt-6" style="position: relative;">
                  <div class="font-weight-light grey--text title mb-2">Perfect Ubelicious snack</div>
                  <h3 class="display-1 font-weight-light orange--text mb-2">Ube halaya in a jar</h3>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </template>
    </div>
  </v-app>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      menu: false
    };
  }
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}

.v-application--wrap {
  min-height: 100vh;
  justify-content: center;
}

#createBtn {
  text-decoration: none;
}
#signUp {
  text-decoration: none;
}
#signIn {
  text-decoration: none;
}
#about {
  padding-left: 0;
  padding-top: 0;
  justify-content: center;
  align-content: center;
}
</style>
