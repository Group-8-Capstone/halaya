<template>
  <div>
    <v-card flat class="ma-5 mb-12 pa-5">
      <v-card-title>
        Deliveries for TODAY
        <v-spacer></v-spacer>
      </v-card-title>
      <div>
        <!-- <v-container>
          <v-row justify="space-around">
            <v-card width="300" v-for="(item) in barangay_array" :key="item.barangay_name">
              <v-img height="200px" src="../assets/halayaJar.jpg"></v-img>

              <v-card-text align="center" justify="center">
                <br>
                <h2>{{item.barangay_name}}</h2>
                <br>
                <div>Number of Orders: {{item.number_of_orders}}</div>
                <br>
                <v-btn>View Orders</v-btn>
              </v-card-text>
            </v-card>
          </v-row>
        </v-container>-->

        <v-row>
          <v-col>
            <v-row>
              <v-col v-for="(item) in barangay_array" :key="item.barangay_name">
                <v-card
                  id="cards"
                  class="mx-auto text-center"
                  min-height="220"
                  max-height="240"
                  min-width="200"
                  max-width="2000"
                >
                  <v-card-title class="deep-purple lighten-5" id="title">{{item.barangay_name}}</v-card-title>
                  <hr>
                  <v-spacer/>
                  <v-card-text id="qty">Number of Orders: {{item.number_of_orders}}</v-card-text>
                  <v-btn>View Orders</v-btn>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>

      <!-- <div v-for="(item) in barangay_array" :key="item.barangay_name">
        <v-container>
          <v-row justify="space-around">
            <v-card width="400" v-for="i in item.orders" :key="i.id">
              <v-img height="200px" src="../assets/halayaJar.jpg"></v-img>

      <v-card-text align="center" justify="center">-->
      <!-- <v-timeline-item v-for="i in item.orders" :key="i.id" small> -->
      <!-- <div>Receiver Name: {{i.receiver_name}}</div>
                <br>
              </v-card-text>
            </v-card>
          </v-row>
        </v-container>
      </div>-->
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import { connect } from "tls";
import * as turf from "@turf/turf";
import Swal from "sweetalert2";
import { constants } from 'os';
export default {
  name: "Delivery",
  data() {
    return {
      delivery_range: [],
      barangay_array: [],
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false
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
  },

  methods: {
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
    dataGrouping() {
      axios
        .get("http://127.0.0.1:8000/api/posts/delivery", this.config)
        .then(response => {
          var result = response.data.data;
          console.log("Groupby", result);
          var templist = this.$_.groupBy(result, "barangay");
          this.barangay_array = Object.entries(templist);
          console.log("Barangay Array: ", this.barangay_array);
          var arr = [];
          for (var i = 0; i < this.barangay_array.length; i++) {
            this.barangay_array[i]["barangay_name"] = this.barangay_array[i][0];
            this.barangay_array[i]["orders"] = this.barangay_array[i][1];
            this.barangay_array[i]["number_of_orders"] = this.barangay_array[
              i
            ][1].length;

            var barangay_orders = this.barangay_array[i][1];
            var total = 0;

            var max_qty = 96;
            var tub_value = 4;
            var list = [];
            var tubToJar = 0;
            console.log("barangay_orders: ", barangay_orders);
            for (var j = 0; j < barangay_orders.length; j++) {
              // console.log("barangay_name: ", barangay_orders);
              var delivery_batch = [];
              if (barangay_orders[j].ubeHalayaTub_qty != 0) {
                tubToJar += barangay_orders[j].ubeHalayaTub_qty * tub_value;
                if (barangay_orders[j].ubeHalayaJar_qty != 0) {
                  tubToJar += barangay_orders[j].ubeHalayaJar_qty;
                  if (max_qty - tubToJar >= 0) {
                    console.log("============if ", tubToJar);
                    if(this.containsObject(delivery_batch, barangay_orders[j].id)){
                      console.log("already exist")
                    } else {
                      delivery_batch.push(barangay_orders[j]);
                    }
                  }
                } else if (barangay_orders[j].ubeHalayaTub_qty != 0) {
                  tubToJar += barangay_orders[j].ubeHalayaJar_qty;
                  if (max_qty - tubToJar >= 0) {
                    console.log("============else if ", tubToJar);
                    if(this.containsObject(delivery_batch, barangay_orders[j].id)){
                      console.log("already exist")
                    } else {
                      delivery_batch.push(barangay_orders[j]);
                    }
                  }
                }
              } else if (barangay_orders[j].ubeHalayaTub_qty == 0) {
                tubToJar += barangay_orders[j].ubeHalayaJar_qty;
                if (max_qty - tubToJar >= 0) {
                  console.log("============else ", tubToJar);
                  if(this.containsObject(delivery_batch, barangay_orders[j].id)){
                      console.log("already exist")
                    } else {
                      delivery_batch.push(barangay_orders[j]);
                    }
                }
              }
              list.push(delivery_batch);
              console.log("delivery_batch: ", delivery_batch);
            }
            arr.push(list);
            console.log("liiiiiiiiissssttt: ", list);
          }
          console.log("mother array: ", arr);
        });
    },
    testing(order_array) {
      for (var i = 0; i < order_array.length; i++) {}
    }
  }
};
</script>

<style>
#cards {
  border: 1px solid;
  border-color: purple;
  border-radius: 10px;
}
</style>