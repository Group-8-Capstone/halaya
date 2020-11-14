<template>
  <v-card class="ma-5 mb-12 pa-5">
    <v-row>
      <v-spacer></v-spacer>
      <Pdf :headers="headers" :deliveredOrder="deliveredOrder" class="float-right mr-5"></Pdf>
    </v-row>
    <v-card-title>
      Delivered Orders
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="deliveredOrder" :search="search">
      <template v-slot:item.order_status="{ item }">
        <v-chip color="green">{{ item.order_status }}</v-chip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import Pdf from "./Pdf.vue";
import axios from "axios";
export default {
  name: "Delivery",
  components: { Pdf },
  data() {
    return {
      deliveredOrder: [],
      search: "",
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "receiver_name"
        },
        { text: "Address", value: "customer_address" },
        { text: "Distance", value: "distance" },
        { text: "Ube Halaya Qty", value: "ubeHalayaJar_qty" },
        { text: "Ubechi Qty", value: "ubeHalayaTub_qty" },
        { text: "Delivery Date", value: "preferred_delivery_date" },
        { text: "Order Status", value: "order_status" }
      ]
    };
  },
  mounted() {
    this.loadDelivered();
  },
  beforeCreate() {
    let config = {};
    config.headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Access-Control-Allow-Origin": "*"
    };
    this.config = config;
    console.log("this.config", this.config);
  },
  methods: {
    loadDelivered() {
      axios
        .get(this.url + "/api/posts/delivered", this.config)
        .then(response => {
          this.deliveredOrder = response.data.data;
          for (var i = 0; i < this.deliveredOrder.length; i++) {
            var street = response.data.data[i].building_or_street;
            var barangay = response.data.data[i].barangay;
            var city = response.data.data[i].city_or_municipality;
            var province = response.data.data[i].province;
            var place = street
              .toString()
              .concat(
                " ",
                barangay.toString(),
                " ",
                city.toString(),
                " ",
                province.toString()
              );
            this.deliveredOrder[i]["customer_address"] = place;
          }
        });
    }
  }
};
</script>