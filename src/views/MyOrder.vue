<template>
  <div>
    <v-card id="cardtable" class="ma-5 mb-12 pa-5">
      <v-card-title>
      Transaction History
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
      <v-tabs v-model="tabs" right color="deep-purple accent-4">
        <v-tab>On going</v-tab>
        <v-tab>Delivered</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabs">
        <v-tab-item>
          <v-data-table :headers="headers" :items="onOrder" :search="search">
              <template v-slot:item.preferred_delivery_date="{ item }">
           <span>{{new Date(item.preferred_delivery_date).toISOString().substring(0,10)}}</span>
         </template>
            <template v-slot:item.order_status="{ item }">
              <v-chip :color="getColor(item.order_status)" dark>{{ item.order_status }}</v-chip>
            </template>
          </v-data-table>
        </v-tab-item>
        <v-tab-item>
          <v-data-table :headers="headers2" :items="deliveredOrder" :search="search">
            <template v-slot:item.preferred_delivery_date="{ item }">
              <span>{{new Date(item.preferred_delivery_date).toISOString().substring(0,10)}}</span>
            </template>
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
.v-data-table {
  overflow-x: auto !important;
}
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
  //initializing required and called variable for needed data
  data: () => ({
    scrollHorizontal: true,
    search: "",
    deliveredOrder: [],
    dialogOnOrder: false,
    dialogDelivered: false,
    onOrder: [],
    tabs: null,
    ubeJar: null,
    ubeTab: null,
    //headers and column called in value attribute for displaying the data 
    //in the data table for ongoing orders
    headers: [
      { text: "Customers Name", value: "receiver_name" },
      { text: "Prefered Delivery Date", value: "preferred_delivery_date" },
      { text: "Halaya Jar Quantity", value: "ubehalayajar_qty" },
      { text: "Halaya Tub Quantity", value: "ubehalayatub_qty" },
      { text: "Total Payment", value: "total_payment" },
      { text: "Status", value: "order_status" }
    ],
    //headers and column called in value attribute for displaying the data 
    //in the data table for delivered orders
    headers2: [
      { text: "Customers Name", value: "receiver_name" },
      { text: "Delivered Date", value: "preferred_delivery_date" },
      { text: "Halaya Jar Quantity", value: "ubehalayajar_qty" },
      { text: "Halaya Tub Quantity", value: "ubehalayatub_qty" },
      { text: "Status", value: "order_status" }
    ]
  }),
  //Calling the token before rendering other data to be displayed
  beforeCreate() {
    let config = {};
    config.headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Access-Control-Allow-Origin": "*"
    };
    this.config = config;
  },
  //renders the fetch data for on order, pending 
  //and delivered status in created 
  created() {
    this.retrieveOnOrder();
    this.retrieveDeliveredOrder();
  },
  //renders the fetch data for placed orders in real time
  mounted(){
    //pusher is used for real time rendering of data
    let pusher = new Pusher('c31b45d58431fd307880', {
        cluster: 'ap1',
        encrypted: false
      });

    //Subscribe to the channel we specified 
    let channel = pusher.subscribe('order-channel')
    channel.bind('newOrder', data => {
      this.retrieveDeliveredOrder();
      this.retrieveOnOrder()
    });
  },
  methods: {
    // fetching the on order and pending place order
    retrieveOnOrder() {
      this.$vloading.show();
      let id = localStorage.getItem("id");
      axios
        .get(this.url + "/api/fetchOngoingOrder/" + id, this.config)
        .then(response => {
            this.$vloading.hide()
          this.onOrder = response.data.post;
        });
    },
    //identifying the chip color based on order status
    getColor(status) {
      if (status === "Canceled") return "orange";
      else if (status === "On order") return "blue";
      else return "green";
    },
     // fetching the delivered order
    retrieveDeliveredOrder() {
      this.$vloading.show();
      let id = localStorage.getItem("id");
      axios
        .get(this.url + "/api/fetchDeliveredOrder/" + id, this.config)
        .then(response => {
            this.$vloading.hide()
          this.deliveredOrder = response.data.post;
        });
    },
    details(item) {
      this.ubeJar = item.ubehalayajar_qty;
      this.ubeTab = item.ubehalayatub_qty;
    }
  }
};
</script>
