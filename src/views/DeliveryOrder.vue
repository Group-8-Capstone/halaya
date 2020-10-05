<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="374" max-height="580">
    <template slot="progress">
      <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
    </template>
    <v-row>
      <v-col v-for="(delivery, index) in deliveryOrders" :key="index">
        <v-img height="100%" width="100%" src="../assets/ubeCard.jpg"></v-img>
        <v-card-title>Wawen's Ube Halaya</v-card-title>
        <v-card-text>
          <div>100% Pure Ube</div>
        </v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-title>{{ delivery.title }}</v-card-title>
        <v-card-text>
          <div>Five delivery locations for this round of delivery.</div>
          <v-chip-group v-model="selection" active-class="deep-purple accent-4 white--text" column>
            <v-chip>{{ delivery.distance1 }}</v-chip>
            <v-chip>{{ delivery.distance2 }}</v-chip>
            <v-chip>{{ delivery.distance3 }}</v-chip>
            <v-chip>{{ delivery.distance4 }}</v-chip>
            <v-chip>{{ delivery.distance5 }}</v-chip>
          </v-chip-group>
        </v-card-text>
        <v-card-actions>
          <v-btn color="deep-purple lighten-2" text @click="reserve">View Delivery Details</v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
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
    ];
  }
};
</script>