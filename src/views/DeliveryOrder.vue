<template>
  <div> 
    <v-row class="py-0 my-0">
      <v-col sm="3" v-for="(item, index) in deliveryOrders" :key="index" class="py-0 my-1">
        <v-card class="mx-2 my-1" max-width="275">
          <v-img height="100%" width="100%" src="../assets/ubeCard.jpg"></v-img>
          <v-card-title class="pa-0 ml-2">Wawen's Ube Halaya</v-card-title>
          <v-divider class="mx-4"></v-divider>
          <v-card-title class="pa-0 ml-2">{{item.title}}</v-card-title>
          <v-card-text class="pa-0 ml-2">
            <div>Five delivery locations for this round of delivery.</div>
            <v-chip-group
              v-model="selection"
              active-class="deep-purple accent-4 white--text pa-1px"
              column
            >
              <v-chip>{{item.distance1}}</v-chip>
              <v-chip>{{item.distance2}}</v-chip>
              <v-chip>{{item.distance3}}</v-chip>
              <v-chip>{{item.distance4}}</v-chip>
              <v-chip>{{item.distance5}}</v-chip>
            </v-chip-group>
          </v-card-text>
          <v-card-actions class="pa-0">
            <router-link
              to="/delivery-details"
              id="deliveryDetailsBtn"
            >
            <v-btn id="deliveryDetailsBtn" color="deep-purple lighten-2" text><v-icon>mdi-format-list-bulleted-square</v-icon>View Delivery Details</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      selection:'',
      deliveryOrders: [
        {
          title: "Delivery 1",
          distance1: "0.5 km",
          distance2: "0.8 km",
          distance3: "1 km",
          distance4: "1 km",
          distance5: "1.1 km"
        },
        {
          title: "Delivery 2",
          distance1: "1.1 km",
          distance2: "1.2 km",
          distance3: "1.3 km",
          distance4: "1.5 km",
          distance5: "1.5 km"
        },
        {
          title: "Delivery 3",
          distance1: "1.5 km",
          distance2: "1.5 km",
          distance3: "1.5 km",
          distance4: "1.6 km",
          distance5: "1.6 km"
        },
        {
          title: "Delivery 4",
          distance1: "1.6 km",
          distance2: "1.7 km",
          distance3: "1.7 km",
          distance4: "1.8 km",
          distance5: "1.8 km"
        },
        {
          title: "Delivery 5",
          distance1: "1.8 km",
          distance2: "1.8 km",
          distance3: "1.9 km",
          distance4: "1.9 km",
          distance5: "1.2 km"
        }
      ]
    };
  },
  // methods:
  // {

  // }
};
</script>