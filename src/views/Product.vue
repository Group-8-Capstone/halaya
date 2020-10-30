<template>
  <div>
    <v-card class="ma-5 mb-12 pa-5">
      <v-card-title>
        Deliveries for Today
      </v-card-title>
      <!-- <v-data-table
      :headers="headers"
      :items="delivery"
      :search="search"
    ></v-data-table> -->
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
import { connect } from 'tls';
  export default {
    name: "Delivery",
    data () {
      return {
        delivery:[],
        search: '',
        headers: [
          {
            text: 'Product Name',
            align: 'start',
            sortable: false,
            value: 'customer_name',
          },
          { text: 'Quantity', value: '' },
          { text: 'Date', value: 'customer_address' },  
        ],
      }
    },
    mounted() {

    },

    methods: {
 
    }
  }