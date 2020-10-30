<template>
  <div>
    <v-card class="ma-5 mb-12 pa-5">
      <v-card-title>
        Deliveries for Today
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Receiver Name</th>
              <th class="text-left">Address</th>
              <th class="text-left">Distance</th>
              <th class="text-left">Delivery Date</th>
              <th class="text-left">Order Details</th>
              <th class="text-left">Action</th>
              <th class="text-left">Order Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in deliveries" :key="item">
              <td>{{ item.receiver_name }}</td>
              <td>{{ item.delivery_address }}</td>
              <td>{{ distance }}</td>
              <td>{{ item.confirmed_delivery_date + ' ' + item.confirmed_delivery_time}}</td>
              <td>
                <v-icon
                  class="mr-2"
                  @click="orderDetail(item)"
                  normal
                  title="Order Details"
                >mdi-information</v-icon>
              </td>
              <td>
                <template>
                  <v-icon
                    normal
                    class="mr-2"
                    title="Delivered"
                    @click="alertDelivered(item)"
                  >mdi-truck-check-outline</v-icon>
                  <v-icon
                    @click="editDialog = !editDialog, editItem(item) "
                    class="mr-2"
                    normal
                    title="Edit"
                  >mdi-table-edit</v-icon>
                  <v-icon @click="alertCancel(item)" normal class="mr-2" title="Cancel">mdi-cancel</v-icon>
                </template>
              </td>
              <td>{{item.status}}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
    <!-- <v-row class="py-0 my-0">
      <v-col sm="3" v-for="(item, index) in distance" :key="index" class="py-0 my-1">
        <v-card class="mx-2 my-1 pa-1" max-width="275">
          <v-img height="100%" width="100%" src="../assets/ubeCard.jpg"></v-img>
          <v-container>
            <v-card-title id="cardTitle">Wawen's Ube Halaya</v-card-title>
            <v-divider class="mx-4"></v-divider>
            <v-row>
              <v-card-actions class="pa-0">
                <router-link to="/delivery-details" id="deliveryDetailsBtn">
                  <v-btn id="deliveryDetailsBtn" text>
                    <v-icon>mdi-format-list-bulleted-square</v-icon>
                  </v-btn>
                </router-link>
              </v-card-actions>
              <v-card-title class="pa-0 ml-2">Delivery</v-card-title>
            </v-row>
            <v-card-text class="pa-0 ml-2">
              <v-chip-group column>
                <v-chip small>{{item}}</v-chip>
                <v-chip small>{{distance[1]}}</v-chip>
                <v-chip small>{{distance[2]}}</v-chip>
                <v-chip small>{{distance[3]}}</v-chip>
                <v-chip small>{{distance[4]}}</v-chip>
              </v-chip-group>
            </v-card-text>
          </v-container>
        </v-card>
      </v-col>
    </v-row>-->
  </div>
</template>

<script>
import axios from "axios";
import { connect } from "tls";
import * as turf from "@turf/turf";

export default {
  name: "Delivery",
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoiamllbnhpeWEiLCJhIjoiY2tlaTM3d2VrMWcxczJybjc0cmZkamk3eiJ9.JzrYlG2kZ08Pkk24hvKDJw",
      delivery: [],
      deliveries: [],
      address: "",
      coordinates: [],
      distance: [],
      // dist: 0,
      addresses: [],
      search: "",
      headers: [
        {
          text: "Receiver Name", align: "start", value: "", sortable: false },
        { text: "Address", value: "", sortable: false },
        { text: "Distance", value: "", sortable: false },
        { text: "Delivery Date", value: "", sortable: false },
        { text: "Order Details", value: "", sortable: false },
        { text: "Action", value: "", sortable: false },
        { text: "Order Status", value: "", sortable: false }
        // { text: "Actions", value: "action", sortable: false },
        // { text: "Status", value: "order_status" }
      ]
    };
  },
  mounted() {
    this.loadDelivery();
  },
  created() {
    // this.loadDelivery();
    // this.getCoordinates();
    // setInterval(this.loadDelivery(), 3000);
  },

  methods: {
    loadDelivery() {
      axios
        .get("https://wawens-backend.herokuapp.com/api/orders/confirmed")
        .then(response => {
          this.delivery = response.data;

          function formatDate() {
            var d = new Date(),
              month = "" + (d.getMonth() + 1),
              day = "" + d.getDate(),
              year = d.getFullYear();

            if (month.length < 2) month = "0" + month;
            if (day.length < 2) day = "0" + day;

            return [year, month, day].join("-");
          }

          this.delivery.forEach(element => {
            var now = element.confirmed_delivery_date === "2020-10-27";
            //formatDate dapat na diha pero walay delivery for today so "2020-10-27" sa
            // console.log(now);
            // console.log(formatDate());
            if (now == true) {
              console.log("DATEDATE", element.confirmed_delivery_date);
              this.deliveries.push(element);
              this.deliveries.sort(function(a, b) {
                return a - b;
              });
              console.log("DELIVERIES", this.deliveries);
            }
          });
          this.deliveries.forEach(element => {
            console.log(element.delivery_address);
            this.addresses.push(element.delivery_address);
            console.log("ADDRESSES", this.addresses);
          });
          this.addresses.forEach(element => {
            console.log("ELEMENT", element);
            var addressIndex = this.addresses.indexOf(element);
            console.log("INDEX", addressIndex);
            var delAddress = this.addresses[addressIndex];
            console.log("_____INDEX", delAddress);
            axios
              .get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${delAddress}
        .json?limit=2&access_token=${this.accessToken}`
              )
              .then(response => {
                var res = JSON.stringify(response.data);
                var result = JSON.parse(res);
                console.log("/////////test////////", result);
                //index 0 is the most relevant based on the mapbox geocoding documentation
                this.newCoordinates = result.features[0].geometry.coordinates;
                //turf.js
                var from_place = turf.point([123.921969, 10.329892]);
                var to_place = turf.point(this.newCoordinates);
                console.log("ADDRESS:", to_place);
                var options = { units: "kilometers" };
                var initDistance = turf.distance(from_place, to_place, options);
                this.distance = initDistance;
                // this.distance.push(initDistance);
                // this.deliveries.forEach(element => {
                //   var distIndex = this.deliveries.indexOf(element);
                //   console.log("INDEX NI SIYA", distIndex);
                //   this.dist = this.distance[distIndex];
                //   console.log("MAO NI SIYA", this.dist);
                // });
                console.log("*******DISTANCE*******", this.distance);
                return this.distance;
                addressIndex++;
                console.log("????????INDEX", this.addressIndex);
              });
          });

          console.log("DATA:", this.delivery);
          console.log(
            "CATEGORY",
            this.delivery[0].products[0].pivot.sub_quantity
          );
          // var jars = 0;
          // this.delivery.forEach(element => {
          //   console.log("NISUD", element);
          //   let a = this.delivery.findIndex(element);
          //   console.log("INDEX", a);
          // });

          //   for (var x = 0; x < this.delivery[i].products.length; x++){
          //     if (this.delivery[i].prodects[i].category.name == "Ubechi"){
          //       jars = 5;
          //       var totaljars = this.sub_quantity * jars;
          //       console.log("JARS", this.totaljars);
          //     } else {
          //       jars = 1;
          //       totaljars = this.sub_quantity * jars;
          //       console.log("JARS", this.totaljars);
          //     }
          //   }
          // }
        })
        .catch(error => console.log(error));
    }
  }
};
</script>

<style>
.v-chip--clickable {
  pointer-events: none;
  cursor: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.container {
  padding: 1px;
}

#cardTitle {
  justify-content: center;
  font-size: 20px;
  padding: 1px;
}

#deliveryDetailsBtn {
  text-decoration: none;
  padding: 0px;
  color: black;
  width: 36 !important;
}

.v-card__actions {
  align-items: center;
  display: flex;
  padding: 0;
}
</style>