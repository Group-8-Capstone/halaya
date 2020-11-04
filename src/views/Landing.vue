<template>
  <v-app>
    <v-app-bar app fixed light lights-in height="70" color="white" dense dark elevation="40">
      <v-list-item-avatar size="60">
        <img src="../assets/wawens.png">
      </v-list-item-avatar>
      <v-toolbar-title class="deep-purple--text">WAWEN'S UBE HALAYA</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/register">
        <v-btn>
          Sign Up
        </v-btn>
      </router-link>
      <router-link to="/login">
        <v-btn>
          Login
        </v-btn>
      </router-link>
    </v-app-bar>
    <div class="ma-5 mb-12 pa-5">
      <v-spacer></v-spacer>
      <v-list class>
        <router-link to="/register" id="createBtn">
          <v-btn class="ma-5" color="purple darken-2" rounded outlined dark>
            <v-icon>mdi-plus</v-icon>
            <v-toolbar-title>Create Order</v-toolbar-title>
          </v-btn>
        </router-link>
      </v-list>
      <template>
        <v-row>
          <v-col>
            <v-hover v-slot:default="{ hover }">
              <v-card class="mx-auto" color="grey lighten-4">
                <v-img :aspect-ratio="16/9" src="../assets/halayaTub.jpg">
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
                    >Take a bite</div>
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
</style>
