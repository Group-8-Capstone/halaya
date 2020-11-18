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
            <template v-slot:item.order_status="{ item }">
              <v-chip :color="getColor(item.order_status)" dark>{{ item.order_status }}</v-chip>
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
      { text: "Halaya Jar Quantity", value: "ubeHalayaJar_qty" },
      { text: "Halaya Tub Quantity", value: "ubeHalayaTub_qty" },
      { text: "Status", value: "order_status" }
    ],
    headers2: [
      { text: "Receivers Name", value: "receiver_name" },
      { text: "Delivered Date", value: "preferred_delivery_date" },
      { text: "Halaya Jar Quantity", value: "ubeHalayaJar_qty" },
      { text: "Halaya Tub Quantity", value: "ubeHalayaTub_qty" },
      { text: "Status", value: "order_status" }
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
        .get(this.url+"/api/fetchOnOrderStat/" + id, this.config)
        .then(response => {
          this.onOrder = response.data.post;
          console.log(response.data.post);
        });
    },
    getColor(status) {
      if (status === "On order") return "green";
      else if (status === "Pending") return "orange";
      else return "blue";
    },
    retrieveDeliveredOrder() {
      let id = localStorage.getItem("id");
      axios
        .get(this.url+"/api/fetchDeliveredOrder/" + id, this.config)
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
