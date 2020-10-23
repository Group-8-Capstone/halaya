<template>
  <div class="ma-5 mb-12 pa-5">
    <v-card>
    <v-card-title>
     Products
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="deliveredOrder"
      :search="search"
    ></v-data-table>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
  export default {
    name: "Delivery",
    data () {
      return {
        deliveredOrder:[],
        search: '',
        headers: [
          {
            text: 'Product Name',
            align: 'start',
            sortable: false,
            value: 'customer_name',
          },
          { text: 'Available Quantity', value: 'contact_number' },
          { text: 'Total Ordered Quantity', value: 'order_quantity' },
          
        ],
      }
    },
    mounted() {

    },

    methods: {
    },
  
  }
</script>