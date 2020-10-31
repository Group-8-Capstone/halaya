<template>
  <v-card class="ma-5 mb-12 pa-5">
    <v-card-title>
      Delivery
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
    >
    <template v-slot:item.order_status="{ item }">
          <v-chip color="green">{{ item.order_status }}</v-chip>
    </template>
    </v-data-table>
  </v-card>
 
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
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'customer_name',
          },
          { text: 'Address', value: 'delivery_address' },
          { text: 'Ube Halaya Qty', value: 'halayaJar_qty' },
          { text: 'Ubechi Qty', value: 'ubechi_qty' },
          { text: 'Delivery Date', value: 'delivery_date' },
          { text: 'Order Status', value: 'order_status' },
          
        ],
      }
    },
    mounted() {
      this.loadDelivered();
    },

    methods: {
      loadDelivered(){
      axios.get('http://127.0.0.1:8000/api/posts/delivered').then(response => {
        this.deliveredOrder = response.data.data
      })
    },
    }
  }
</script>