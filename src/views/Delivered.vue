<template>
  <v-card class="ma-5 mb-12 pa-5">
    <!-- <div>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn outlined small color="purple" v-bind="attrs" v-on="on">
            <v-icon>mdi-download</v-icon>Export
          </v-btn>
        </template>
        <v-list>
          <v-col> -->
            <DeliveredPdf :headers="headers" :records="deliveredOrder"></DeliveredPdf>
            <!-- <div>
              <v-btn class="float-right mr-5" text small>Export as CSV</v-btn>
            </div>
          </v-col>
        </v-list>
      </v-menu>
    </div> -->

 <!-- <div>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn outlined small color="purple" v-bind="attrs" v-on="on">
            <v-icon>mdi-download</v-icon>Export
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in dropdown" :key="index">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div> -->

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
      <template v-slot:item.preferred_delivery_date="{ item }">
        <span>{{new Date(item.preferred_delivery_date).toISOString().substring(0,10)}}</span>
      </template>
      <template v-slot:item.order_status="{ item }">
        <v-chip color="green" text-color="white">{{ item.order_status }}</v-chip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import DeliveredPdf from "./DeliveredPdf.vue";
import axios from "axios";
export default {
  name: "Delivery",
  components: { DeliveredPdf },
  data() {
    return {
      deliveredOrder: [],
      search: "",
      dropdown: [{ title: "Export as PDF" }, { title: "Export as CSV" }],
      headers: [
        {
          text: "Receiver Name",
          align: "start",
          sortable: false,
          value: "receiver_name"
        },
        { text: "Address", value: "customer_address" },
        { text: "Mobile Number", value: "contact_number", sortable: false },
        { text: "Distance", value: "distance" },
        {
          text: "Ube Halaya Jar(Quantity)",
          value: "ubehalayajar_qty",
          sortable: false
        },
        {
          text: "Ube Halaya Tub(Quantity)",
          value: "ubehalayatub_qty",
          sortable: false
        },
        {
          text: "Total Payment",
          value: "total_payment",
          sortable: false
        },
        { text: "Delivered Date", value: "preferred_delivery_date" },
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
      this.$vloading.show();
      axios
        .get(this.url + "/api/posts/delivered", this.config)
        .then(response => {
          setTimeout(() => {
            this.$vloading.hide();
          }, 1000);
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