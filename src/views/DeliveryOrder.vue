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
      <v-data-table :headers="headers" :items="deliveries" :search="search"></v-data-table>
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
      addresses: [],
      search: "",
      headers: [
        {
          text: "Customer",
          align: "start",
          sortable: false,
          value: "receiver_name"
        },
        { text: "Contact Number", value: "active_contact" },
        { text: "Order/s", value: "products[0].product_name" },
        { text: "Qty", value: "products[0].pivot.sub_quantity" },
        { text: "Address", value: "delivery_address", sortable: false },
        {
          text: "Delivery Date",
          value: "confirmed_delivery_date",
          sortable: false
        }
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

          // var date = new Date() + "";
          // var formatted = date
          //   .split(" ")
          //   .slice(1, 4)
          //   .join("-");
          // console.log("DATE", formatted);
          this.delivery.forEach(element => {
            var now = element.confirmed_delivery_date === "2020-10-27";
            //formatDate dapat na diha pero walay delivery for today so "2020-10-27" sa
            // console.log(now);
            // console.log(formatDate());
            if (now == true) {
              console.log("NISUUUUUUUD");
              console.log("DATEDATE", element.confirmed_delivery_date);
              this.deliveries.push(element);
              console.log("DELIVERIES", this.deliveries);
            }
          });
          // for (var i in this.delivery){
          //   if (i.confirmed_delivery_date = now){
          //     this.deliveries.push(i);
          //   }
          // }
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

          // for (var i = 0; i < this.delivery.length; i++) {
          //   let deliveryAddress = this.delivery_address;
          //   this.addresses.push(this.deliveryAddress);
          //   console.log("ADDRESSES", this.addresses);
          // }

          // for (var i = 0; i < this.delivery.length; i++) {
          //   let addressIndex = 0;
          //   let delAddress = this.addresses[addressIndex];
          //   console.log("_____INDEX", this.delAddress);
          //   axios
          //     .get(
          //       `https://api.mapbox.com/geocoding/v5/mapbox.places/${
          //         this.delAddress
          //       }
          // .json?limit=2&access_token=${this.accessToken}`
          //     )
          //     .then(response => {
          //       let res = JSON.stringify(response.data);
          //       let result = JSON.parse(res);
          //       console.log("/////////test////////", result);
          //       //index 0 is the most relevant based on the mapbox geocoding documentation
          //       this.coordinates = result.features[0].geometry.coordinates;
          //       //turf.js
          //       var from_place = turf.point([123.921969, 10.329892]);
          //       var to_place = turf.point(this.coordinates);
          //       console.log("ADDRESS:", to_place);
          //       var options = { units: "kilometers" };
          //       let initDistance = turf.distance(from_place, to_place, options);
          //       this.distance.push(initDistance);
          //       console.log("*******DISTANCE*******", this.distance);
          //       return this.distance;
          //       addressIndex++;
          //       console.log("????????INDEX", this.addressIndex);
          //     });
          // }
        })
        .catch(error => console.log(error));
    }
    // getCoordinates(address) {
    //   axios
    //     .get(
    //       `https://api.mapbox.com/geocoding/v5/mapbox.places/
    //         Shambala%20Veterinary%20Clinic%20Hernan%20Cortes%20St%20Mandaue%20City%20Cebu
    //       .json?limit=2&access_token=${this.accessToken}`
    //     )
    //     .then(response => {
    //       let res = JSON.stringify(response.data);
    //       let result = JSON.parse(res);
    //       console.log("/////////test////////", result);

    //       //index 0 is the most relevant based on the mapbox geocoding documentation
    //       this.coordinates = result.features[0].geometry.coordinates;

    //       //turf.js
    //       var from_place = turf.point([123.921969, 10.329892]);
    //       var to_place = turf.point(this.coordinates);
    //       console.log("ADDRESS:", to_place);
    //       var options = { units: "kilometers" };
    //       this.distance = turf.distance(from_place, to_place, options);
    //       console.log("*******DISTANCE*******", this.distance);
    //       return this.distance;
    //     });
    // }
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