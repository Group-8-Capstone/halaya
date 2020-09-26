<template>
  <v-card class="ma-5 mb-12 pa-5">
  
    <v-card-title>
      Stock
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-list>
        <v-btn class="ma-5" color="purple darken-2" rounded outlined dark @click="showDialog">
          <v-icon>mdi-plus</v-icon>
          <v-toolbar-title>Add Stock</v-toolbar-title>
        </v-btn>
      </v-list>

      <v-dialog v-model="stockDialog" width="400px">
        <v-card>
          <v-spacer></v-spacer>
          <v-card-title class="deep-purple lighten-1 align-center">
            <v-list-item-title class="d-flex align-center justify-center mx-auto headline">ADD STOCK</v-list-item-title>
          </v-card-title>
          <v-container>
            <v-row class="mx-2">
              <v-col cols="12">
                <v-text-field
                  prepend-icon="mdi-account-outline"
                  placeholder="Kilo of Ube"
                  v-model="ubeKilo"
                  :error-messages="ubeKiloErrors"
                  @input="$v.ubeKilo.$touch()"
                  @blur="$v.ubeKilo.$touch()"
                  type=number
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-menu
                  ref="addDateMenu"
                  v-model="addDateMenu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="deliveryDate"
                      label="Picker in menu"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="deliveryDate"
                    :min="deliveryDate"
                    :max="getEndDate"
                    color="deep-purple lighten-1"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="stockDialog = false">Cancel</v-btn>
            <v-btn text @click="addStock()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="stocks"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { setInterval } from 'timers';
import {
  required,
  minLength,
  maxLength,
  between
} from "vuelidate/lib/validators";
  export default {
    name: "Stock",
    data () {
      return {
      search: '',
      addDateMenu: false,
      date2: new Date(),
      stockStatus:"Enough",
      search: "",
      date: new Date().toISOString().substr(0, 10),
      deliveryDate: new Date().toISOString().substr(0, 10),
      ubeKilo: "",
      stocks:[],
      stockDialog: false,
        headers: [
          { text: 'Date', value: 'delivery_date' },
          {
            text: 'Kilo of Ube',
            align: 'start',
            sortable: false,
            value: 'ube_kilo',
          },
          { text: 'Expected Output', value: 'expected_output' },
          { text: 'Ordered Quantity', value: 'fat' },
          { text: 'Status', value: 'stock_status' },
        
        ],
      }},
       validations: {
    ubeKilo: {
      required
    },
  },

  computed: {
    ubeKiloErrors() {
      const errors = [];
      if (!this.$v.ubeKilo.$dirty) return errors;
      !this.$v.ubeKilo.required && errors.push("Kilo of ube is required.");
      return errors;
    },

    getEndDate() {
      var endDate = new Date(
        this.date2.getFullYear(),
        this.date2.getMonth() + 1,
        10
      );
      return endDate.toISOString().slice(0, 10);
    },
    getEndDate() {
      var endDate = new Date(
        this.date2.getFullYear(),
        this.date2.getMonth() + 1,
        10
      );
      return endDate.toISOString().slice(0, 10);
    }
  },
  created() {
      this.fetchStock();
      setInterval(this.fetchStock(),3000)
    },
  

  methods: {
    showDialog() {
      this.stockDialog = !this.stockDialog
    },

    fetchStock(){
      axios.get("http://127.0.0.1:8000/api/fetch/stock").then(response=>{
        console.log(response.data)
        this.stocks = response.data
      })
    },

    addStock(){
      let  newStock = {
        ubeKilo:this.ubeKilo,
        deliveryDate:this.deliveryDate,
        stockStatus:this.stockStatus,
      }
      console.log(newStock)
      axios.post("http://127.0.0.1:8000/api/create/stock", newStock)
      .then(response=>{
        if(response.data.message==="already"){
        Swal.fire({
        title: "Stocks for this date is already added",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Okay",
        reverseButtons: true
      })
      }else if (response.data.message==="not"){
        Swal.fire({
        title: "Successfully Added!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Okay",
        reverseButtons: true
      })
      this.stockDialog = false
      }
      this.fetchStock();
    })
    
  }
  }}
</script>