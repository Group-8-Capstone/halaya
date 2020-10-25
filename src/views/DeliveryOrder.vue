<template>
  <div>
    <!-- <v-card class="ma-5 mb-12 pa-5">
      <v-card-title>
        Deliveries for Today
      </v-card-title>
      <v-data-table
      :headers="headers"
      :items="delivery"
      :search="search"
    ></v-data-table>
    </v-card>-->
    <v-row class="py-0 my-0">
      <v-col sm="3" v-for="(item, index) in delivery" :key="index" class="py-0 my-1">
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
                <v-chip small>{{distance}}</v-chip>
                <!-- <v-chip small>{{item.distance2}}</v-chip>
                <v-chip small>{{item.distance3}}</v-chip>
                <v-chip small>{{item.distance4}}</v-chip>
                <v-chip small>{{item.distance5}}</v-chip>-->
              </v-chip-group>
            </v-card-text>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
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
      search: "",
      address: "",
      coordinates: [],
      distance: [],
      addresses: [],
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
          console.log("-------testing--------", this.delivery);
          console.log("!!!!!", this.delivery.delivery_address);
          for (var i = 0; i < this.delivery.length; i++) {
            let deliveryAddress = this.delivery_address;
            this.addresses.push(deliveryAddress);
            console.log("ADDRESSES", deliveryAddress);
          }
          
          for (var i = 0; i < this.addresses.length; i++) {
            let addressIndex = 0;
            let delAddress = this.addresses[addressIndex];
            axios
              .get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${
                  this.delAddress
                }
          .json?limit=2&access_token=${this.accessToken}`
              )
              .then(response => {
                let res = JSON.stringify(response.data);
                let result = JSON.parse(res);
                console.log("/////////test////////", result);
                //index 0 is the most relevant based on the mapbox geocoding documentation
                this.coordinates = result.features[0].geometry.coordinates;
                //turf.js
                var from_place = turf.point([123.921969, 10.329892]);
                var to_place = turf.point(this.coordinates);
                console.log("ADDRESS:", to_place);
                var options = { units: "kilometers" };
                let initDistance = turf.distance(from_place, to_place, options);
                this.distance.push(initDistance);
                console.log("*******DISTANCE*******", this.distance);
                return this.distance;
                addressIndex++;
                console.log("INDEX", addressIndex);
              });
          }
        })
        .catch(error => console.log(error));
    },
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
// import axios from "axios";
// export default {
//   data() {
//     return {
//       delivery: [
//         {
//           title: "Delivery 1",
//           distance1: "0.5 km",
//           distance2: "0.8 km",
//           distance3: "1.0 km",
//           distance4: "1.0 km",
//           distance5: "1.1 km"
//         },
//         {
//           title: "Delivery 2",
//           distance1: "1.1 km",
//           distance2: "1.2 km",
//           distance3: "1.3 km",
//           distance4: "1.5 km",
//           distance5: "1.5 km"
//         },
//         {
//           title: "Delivery 3",
//           distance1: "1.5 km",
//           distance2: "1.5 km",
//           distance3: "1.5 km",
//           distance4: "1.6 km",
//           distance5: "1.6 km"
//         },
//         {
//           title: "Delivery 4",
//           distance1: "1.6 km",
//           distance2: "1.7 km",
//           distance3: "1.7 km",
//           distance4: "1.8 km",
//           distance5: "1.8 km"
//         },
//         {
//           title: "Delivery 5",
//           distance1: "1.8 km",
//           distance2: "1.8 km",
//           distance3: "1.9 km",
//           distance4: "1.9 km",
//           distance5: "1.2 km"
//         }
//       ]
//     };
//   }
// };
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