<template>
  <v-card class="mx-auto my-2" max-width="1000">
    <v-card dark flat>
      <v-card-title class="pa-2 purple lighten-3">
        <router-link to="/delivery" id="backbtn">
          <v-btn id="backbtn" icon class="ml-5">
            <v-icon>mdi-arrow-left</v-icon>Back
          </v-btn>
        </router-link>
        <h3 class="title font-weight-light text-center grow">Delivery</h3>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon class="mr-5" @click="generate()">
              <v-icon medium color="purple" v-bind="attrs" v-on="on">mdi-download</v-icon>
            </v-btn>
          </template>
          <span>Download as PDF</span>
        </v-tooltip>
      </v-card-title>
      <!-- <v-img
        src="data:image/jpeg;base64,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"
      >-->
      <div>
        <locations></locations>
      </div>
    </v-card>
    <v-container>
      <v-row>
        <div class="ml-2 headline blue--text">October 11, 2020</div>
      </v-row>
    </v-container>
    <v-card-text class="py-0">
      <v-timeline align-top dense>
        <v-timeline-item color="pink" small>
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>1.2 km</strong>
            </v-col>
            <v-col>
              <strong>Princess Joy Duran</strong>
              <div class="caption">Nasipit, Talamban, Cebu</div>
              <div class="caption">3 Jars</div>
            </v-col>
          </v-row>
        </v-timeline-item>

        <v-timeline-item color="teal lighten-3" small>
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>1.2 km</strong>
            </v-col>
            <v-col>
              <strong>Princess Joy Duran</strong>
              <div class="caption">Nasipit, Talamban, Cebu</div>
              <div class="caption">3 Jars</div>
            </v-col>
          </v-row>
        </v-timeline-item>
        <v-timeline-item color="pink" small>
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>1.2 km</strong>
            </v-col>
            <v-col>
              <strong>Princess Joy Duran</strong>
              <div class="caption">Nasipit, Talamban, Cebu</div>
              <div class="caption">3 Jars</div>
            </v-col>
          </v-row>
        </v-timeline-item>
        <v-timeline-item color="teal lighten-3" small>
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>1.2 km</strong>
            </v-col>
            <v-col>
              <strong>Princess Joy Duran</strong>
              <div class="caption">Nasipit, Talamban, Cebu</div>
              <div class="caption">3 Jars</div>
            </v-col>
          </v-row>
        </v-timeline-item>

        <v-timeline-item color="pink" small>
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>1.2 km</strong>
            </v-col>
            <v-col>
              <strong>Princess Joy Duran</strong>
              <div class="caption">Nasipit, Talamban, Cebu</div>
              <div class="caption">3 Jars</div>
            </v-col>
          </v-row>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>

<script>
var pdfMake = require("pdfmake/build/pdfmake.js");
var pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import locations from "../components/SortLocation.vue";
// import axios from "axios";

export default {
  name: "OrderDetails",
  components: { locations },

  //   data() {
  //     return {
  //       orders: [],
  //       search: "",
  //     };
  //   },
  //   mounted() {
  //     this.loadOrders();
  //   },

  methods: {
    generate() {
      var docDefinition = {
        content: "This is an sample PDF printed with pdfMake"
      };
      pdfMake.createPdf(docDefinition).download("Deivery.pdf");
    }
    //     loadOrders() {
    //       axios.get("http://127.0.0.1:8000/api/posts/order").then(response => {
    //         this.orders = response.data.data;
    //       });
    //     }
    //   }
  }
};
</script>

<style>
#backbtn {
  text-decoration: none;
}
</style>
