<template>
  <div>
    <v-card id="cardtable" class="ma-5 mb-12 pa-5">
      <v-tabs v-model="tabs" right color="deep-purple accent-4">
        <v-tab>On going</v-tab>
        <v-tab>Delivered</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabs">
        <v-tab-item>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table :headers="headers" :items="onOrder" :search="search">
            <template v-slot:item.details="{ item }">
              <v-dialog v-model="dialogOnOrder" max-width="300px">
                <template v-slot:activator="{ on }">
                  <v-icon small @click="details(item)" v-on="on">mdi-information</v-icon>
                </template>
                <v-card class="pa-4">
                  <v-card-title class="deep-purple--text">ORDER DETAILS</v-card-title>
                  <v-divider color="light-purple lighten-2"></v-divider>
                  <v-list-item two-line>
                    <v-list-item-content class="justify-center">
                      <v-list-item-title>Ube Halaya Jar Quantity: {{ubeJar}}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item two-line>
                    <v-list-item-content class="justify-center">
                      <v-list-item-title>Ube Halaya Tab Quantity: {{ubeTab}}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider color="light-purple lighten-2"></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      type="button"
                      color="orange"
                      class="mt-3"
                      text
                      @click="dialogOnOrder=false"
                    >Close</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
            <template v-slot:item.order_status="{ item }">
              <v-chip :color="getColor(item.order_status)" dark>{{ item.order_status }}</v-chip>
            </template>
          </v-data-table>
        </v-tab-item>
        <v-tab-item>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table :headers="headers2" :items="deliveredOrder" :search="search">
            <template v-slot:item.details="{ item }">
              <v-dialog v-model="dialogDelivered" max-width="300px">
                <template v-slot:activator="{ on }">
                  <v-icon small @click="details(item)" v-on="on">mdi-information</v-icon>
                </template>
                <v-card class="pa-4">
                  <v-card-title class="deep-purple--text title">ORDER DETAILS</v-card-title>
                  <v-divider color="light-purple lighten-2"></v-divider>
                  <v-list-item two-line>
                    <v-list-item-content class="justify-center">
                      <v-list-item-title>Ube Halaya Jar Quantity: {{ubeJar}}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item two-line>
                    <v-list-item-content class="justify-center">
                      <v-list-item-title>Ube Halaya Tab Quantity: {{ubeTab}}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider color="light-purple lighten-2"></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      type="button"
                      color="orange"
                      class="mt-3"
                      text
                      @click="dialogDelivered=false"
                    >Close</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
          </v-data-table>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>
<style>
</style>

<script>
import {
  required,
  minLength,
  maxLength,
  between
} from "vuelidate/lib/validators";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "MyOrder",
  data: () => ({
    search: "",
    deliveredOrder: [],
    dialogOnOrder: false,
    dialogDelivered: false,
    onOrder: [],
    tabs: null,
    ubeJar: null,
    ubeTab: null,
    headers: [
      { text: "Receivers Name", value: "receiver_name" },
      { text: "Prefered Delivery Date", value: "preferred_delivery_date" },
      { text: "Order Details", value: "details" },
      { text: "Status", value: "order_status" }
    ],
    headers2: [
      { text: "Receivers Name", value: "receiver_name" },
      { text: "Delivered Date", value: "preferred_delivery_date" },
      { text: "Order Details", value: "details" }
    ]
  }),
  beforeCreate() {
    let config = {};
    config.headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Access-Control-Allow-Origin": "*"
    };
    this.config = config;
    console.log("this.config", this.config);
  },
  created() {
    this.retrieveOnOrder();
    this.retrieveDeliveredOrder();
  },
  methods: {
    retrieveOnOrder() {
      let id = localStorage.getItem("id");
      axios
        .get("http://127.0.0.1:8000/api/fetchOnOrder/" + id, this.config)
        .then(response => {
          this.onOrder = response.data.post;
          console.log(response.data.post);
        });
    },
    getColor(status) {
      if (status === "On Order") return "green";
      else if (status === "Pending") return "orange";
      else return "green";
    },

    retrieveDeliveredOrder() {
      let id = localStorage.getItem("id");
      axios
        .get("http://127.0.0.1:8000/api/fetchDeliveredOrder/" + id, this.config)
        .then(response => {
          this.deliveredOrder = response.data.post;
          console.log(response.data.post);
        });
    },
    details(item) {
      console.log(item);
      this.ubeJar = item.ubeHalayaJar_qty;
      this.ubeTab = item.ubeHalayaTub_qty;
    }
  }
};
</script>
