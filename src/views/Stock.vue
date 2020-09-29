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
          <v-toolbar-title>Add Stock Ingredients</v-toolbar-title>
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
                <v-select
                v-model="ingredientsName"
                :items="items"
                label="Ingredients"
                ></v-select>
              </v-col>
              <v-col cols="12">
                 <v-text-field
                  prepend-icon="mdi-plus"
                    min="1"
                    type="number"
                    placeholder="ingredients unit"
                    v-model="ingredientsUnit"
                    :error-messages="ingredientsUnitErrors"
                    @input="$v.ingredientsUnit.$touch()"
                    @blur="$v.ingredientsUnit.$touch()"
                ></v-text-field>
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
     <v-row class="mx-2">
       <v-col cols="12">
    <v-data-table
      :headers="headers"
      :items="stocks"
      :search="search"
    >
     <template v-slot:item.action="{ item }">
          <v-icon
            @click="editDialog = !editDialog, editItem(item) "
            class="mr-2"
            normal
            title="Edit"
          >mdi-table-edit</v-icon>
        </template></v-data-table>
    </v-col>
    <v-col cols="8">
      <v-card  
      class="mx-auto"
      outlined>
    <v-card-title>Check Stock</v-card-title>
      <v-simple-table height="200px">
    <template v-slot:default>
      <thead>
      </thead>
      <tbody>
        <tr>
          <td>Expected Stock Output</td>
          <td>{{expectedProduct}}</td>
        </tr>
        <tr>
          <td>Total Order</td>
          <td>{{sumOrder}}</td>
        </tr>
        <tr
        v-bind:class='{ "enough": stockAvailability == "Enough", "need": stockAvailability == "Not enough" }'>
          <td>Status Order</td>
          <td>{{stockAvailability}}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  </v-card>
  </v-col>
     </v-row>
  </v-card>
</template>
<style>
.enough{
  background-color: lightskyblue;
}
.need{
  background-color: lightcoral;
}
</style>
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
      sumOrder:null,
      expectedProduct:null,
      stockAvailability:null,
      search: '',
      ingredientsUnit:'',
      ingredientsName:'',
      stockStatus:"Enough",
      search: "", 
      ubeKilo: "",
      stocks:[],
       items: ['Ube', 'Condensed milk', 'Butter', 'Sugar','Coconut milk'],
      stockDialog: false,
        headers: [
          { text: 'Ingredients', value: 'ingredients_name' },
          {
            text: 'Ingredients Unit',
            align: 'start',
            sortable: true,
            value: 'ingredients_unit',
          },
          { text: 'Status', value: 'ingredients_status' },
          { text: "Actions", value: "action", sortable: false },
        ],
      }},
       validations: {
    ingredientsUnit: {
      required
    },
  },

  computed: {
    ingredientsUnitErrors() {
      const errors = [];
      if (!this.$v.ingredientsUnit.$dirty) return errors;
      !this.$v.ingredientsUnit.required && errors.push("unit is required.");
      return errors;
    },
  },
  created() {
      this.fetchStock();
      this.postExpectedProduct();
      this.postSumOrder();
      this.checkStatus();
      setInterval(this.fetchStock(),3000)
    },
  

  methods: {
    showDialog() {
      this.stockDialog = !this.stockDialog
    },
    postExpectedProduct(){
      axios.get("http://127.0.0.1:8000/api/fetch/expectedProduct").then(response=>{
        this.expectedProduct=response.data;
        this.checkStatus();
      })
    },
    postSumOrder(){
      axios.get("http://127.0.0.1:8000/api/fetch/sumOrder").then(response=>{
        this.sumOrder=response.data;

      })
    },
    checkStatus(){
       axios.get("http://127.0.0.1:8000/api/fetch/stockStatus").then(response=>{
        this.stockAvailability=response.data;
      })
    },
    fetchStock(){
      axios.get("http://127.0.0.1:8000/api/fetch/stock").then(response=>{
        console.log(response.data)
        this.stocks = response.data
      })
    },

    addStock(){
      let  newStock = {
        ingredientsName:this.ingredientsName,
        ingredientsUnit:this.ingredientsUnit,
        stockStatus:this.stockStatus,
      }
      console.log(newStock)
      axios.post("http://127.0.0.1:8000/api/create/stock", newStock)
      .then(response=>{
      this.stockDialog = false
      this.fetchStock();
      this.postExpectedProduct()
    })
  }
  }}
</script>
