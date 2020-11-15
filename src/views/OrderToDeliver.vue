<template>
  <div>
    <v-card flat class="ma-5 mb-12 pa-5">
      <v-card-title>
        Deliveries for TODAY
        <v-spacer></v-spacer>
      </v-card-title>
      <template>
        <v-row justify="center">
          <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-row>
                <v-col v-for="(item, i) in deliveriesByBrngy" :key="i">
                  <v-card
                    id="cards"
                    class="text-center"
                    min-height="220"
                    max-height="240"
                    min-width="200"
                    max-width="230"
                  >
                    <v-card-title class="deep-purple lighten-5" id="title">{{item.barangay_name}}</v-card-title>
                    <hr>
                    <v-spacer/>
                    <v-card-text id="qty">
                      <b>Number of Batch/s:</b>
                      {{item.length}}
                    </v-card-text>
                    <v-btn
                      outlined
                      rounded
                      color="purple"
                      v-bind="attrs"
                      v-on="on"
                      @click="viewOrders(item)"
                    >View Orders</v-btn>
                  </v-card>
                </v-col>
              </v-row>
            </template>
            <v-card>
              <v-toolbar dark color="purple">
                <v-btn icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>{{barangay_name}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn dark text @click="dialog = false">Export as PDF</v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-divider></v-divider>
              <v-row>
                <v-col v-for="i in orders" :key="i.id">
                  <v-card
                    id="cards"
                    class="mx-auto text-center"
                    min-height="220"
                    max-height="240"
                    min-width="300"
                    max-width="300"
                  >
                    <v-card-title
                      class="deep-purple lighten-5"
                      id="title"
                    >Batch {{i.batchNo}} Delivery</v-card-title>
                    <hr>
                    <v-spacer/>
                    <v-card-text>
                      <span>
                        <b>No. of Orders:</b>
                        &nbsp;{{i.orders.length}}
                      </span>
                    </v-card-text>
                    <v-btn outlined rounded @click="viewDetails(i)" color="purple">View Details</v-btn>
                    <br>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-dialog>
        </v-row>
      </template>
    </v-card>
    <v-dialog max-width="800" v-model="detailsDialog">
      <template>
        <v-data-table
          :headers="headers"
          :items="delivery_batch.orders"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:item.order_status="{ item }">
            <v-chip :color="getColor(item.order_status)" dark>{{ item.order_status }}</v-chip>
          </template>
          <template v-slot:item.action="{ item }">
            <div v-if="isCanceled(item) === true">
              <v-icon
                disabled
                normal
                class="mr-2"
                title="Delivered"
                @click="alertDelivered(item)"
              >mdi-truck-check-outline</v-icon>
              <v-icon disabled @click="alertCancel(item)" normal class="mr-2" title="Cancel">mdi-cancel</v-icon>
            </div>
            <div v-else>
              <v-icon
                normal
                class="mr-2"
                title="Delivered"
                @click="alertDelivered(item)"
              >mdi-truck-check-outline</v-icon>
              <v-icon @click="alertCancel(item)" normal class="mr-2" title="Cancel">mdi-cancel</v-icon>
            </div>
          </template>
        </v-data-table>
      </template>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { connect } from "tls";
import * as turf from "@turf/turf";
import { setInterval } from "timers";
import Swal from "sweetalert2";
import { constants } from "os";
export default {
  name: "Delivery",
  data() {
    return {
      delivery_range: [],
      detailsDialog: false,
      barangay_array: [],
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      orders: [],
      allOrders: [],
      barangay_name: "",
      delivery_batch: [],
      deliveries: [],
      deliveriesByBrngy: {},
      headers: [
        {
          text: "Receiver Name: ",
          align: "start",
          sortable: false,
          value: "receiver_name"
        },
        { text: "Ube Halaya Tub Order Qty", value: "ubeHalayaTub_qty" },
        { text: "Ube Halaya Tub Order Qty", value: "ubeHalayaJar_qty" },
        { text: "Action", value: "action" },
        { text: "Status", value: "order_status" }
      ]
    };
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
  created() {
    this.getRange();
    this.dataGrouping();
    this.fetchOrders();
    setInterval(this.fetchOrders(), 3000);
  },

  methods: {
    getColor(status) {
      if (status === "Canceled") return "orange";
      else if (status === "On order") return "blue";
      else return "green";
    },
    viewOrders(item) {
      this.orders = item;
      this.barangay_name = item.barangay_name;
      this.fetchOrders();
    },
    viewDetails(i) {
      this.delivery_batch = i;
      this.detailsDialog = true;
      console.log("iiiiiii", this.delivery_batch.orders);
      this.fetchOrders();
    },
    getRange() {
      axios
        .get("http://127.0.0.1:8000/api/fetch/delivery-range", this.config)
        .then(response => {
          this.delivery_range = response.data.range;
          console.log("delivery range: ", this.delivery_range);
        });
    },
    containsObject(arr, id) {
      return arr.some(function(el) {
        return el.id === id;
      });
    },
    alertDelivered(item) {
      Swal.fire({
        title: "Are you sure item is being delivered?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#CFD8D",
        cancelButtonText: "No",
        confirmButtonText: "Yes",
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          // console.log("lllllllllllll========== ", this.config)
          this.deliveredItem(item);
        }
      });
    },
    deliveredItem(item) {
      // console.log("================ ", this.config)
      axios
        .post(this.url + "/api/post/updateStat/" + item.id, {}, this.config)
        .then(response => {
          console.log("-----------", response.data);
          Swal.fire({
            title: "Order is being delivered",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          }),
            this.fetchOrders();
          // this.detailsDialog = false;
        });
    },
    alertCancel(item) {
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#CFD8D",
        cancelButtonText: "No",
        confirmButtonText: "Yes",
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          this.deleteItem(item);
          Swal.fire({
            title: "Canceled!",
            text: "Order is being canceled",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    },
    deleteItem(item) {
      axios
        .post(
          this.url + "/api/post/updateCanceledStat/" + item.id,
          {},
          this.config
        )
        .then(response => {
          this.fetchOrders();
          // this.detailsDialog = false;
        });
    },
    fetchOrders() {
      axios.get(this.url + "/api/posts/order", this.config).then(response => {
        this.allOrders = response.data.data;
        console.log("ooooo", this.allOrders);
        for (var i = 0; i < this.allOrders.length; i++) {
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
          this.allOrders[i]["customer_address"] = place;
        }
      });
    },
    dataGrouping() {
      axios
        .get(this.url+ "/api/posts/delivery", this.config)
        .then(response => {
          var result = response.data.data;
          console.log("=-------->",result);
          let groupedOrders = {};
          result.forEach(data => {
            let { barangay } = data;
            groupedOrders[barangay] = result.filter(
              order => order.barangay == barangay
            );

            // console.log("barangay_name", this.barangay_name);
          });
          let deliveries = {};
          const MAX_QUANTITY = 96;

          const createBatches = (barangayOrders, callback) => {
            let currentAmount = 0;
            let arr = [];
            barangayOrders.forEach((order, idx) => {
              let { ubeHalayaJar_qty, ubeHalayaTub_qty } = order;
              let total = ubeHalayaJar_qty + (ubeHalayaTub_qty * 4);
              if (total + currentAmount <= MAX_QUANTITY) {
                arr.push(order);
                currentAmount += total;
                barangayOrders.splice(idx, 1);
              }
            });
            callback(arr, currentAmount);
            if (barangayOrders.length !== 0) {
              createBatches(barangayOrders, callback);
            }
          };

          for (const barangayOrders in groupedOrders) {
            createBatches(groupedOrders[barangayOrders], (batch, total) => {
              if (!deliveries.hasOwnProperty(barangayOrders)) {
                deliveries[barangayOrders] = [];
              }
              deliveries[barangayOrders].push({
                batchNo: deliveries[barangayOrders].length + 1,
                total,
                orders: batch
              });
            });
          }
          for (const key in deliveries) {
            deliveries[key]["barangay_name"] = key;

            this.deliveriesByBrngy = deliveries;
            console.log("===================", this.deliveriesByBrngy);
          }
        });
    },
    isCanceled(item) {
      if (item.order_status == "Canceled") {
        return true;
      }
    }
  }
};
</script>

<style>
</style>