<template>
  <div class="ma-5 mb-12 pa-5">
              <v-flex d-flex>
              <v-layout wrap class="justify-center">
                <v-flex md4 v-for="item in products" :key="item.id" >
                  <v-card class="card-container ma-5 productCard" outlined >
                    <v-card-title class="justify-center productName" >
                      {{item.title}}</v-card-title>
                      <v-list-item class="justify-center mt-5">
                          <img :src="item.image" alt="" width="100" height="100">
                      </v-list-item>
                      <v-list-item class="justify-center">Remaining Quantity: 0pcs</v-list-item>
                      <v-list-item class="justify-center">Ordered Quantity: 0 pcs</v-list-item>
                      <!-- <v-list-item class="justify-center">
                           <v-chip  :color="getColor(item.product_status)" dark>{{ item.product_status }}</v-chip>
                      </v-list-item> -->
                           <v-card-actions class="justify-center">
                   <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="addRemaining=true, editAvailableQuantity(item)">Edit</v-btn>
            <v-btn text color="grey">Record</v-btn>
          </v-card-actions>
                </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
            <template>
      <v-card>
  <v-card-title>
        Sales
    <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
           </v-card-title>
        <v-spacer></v-spacer>
         <v-data-table :headers="headers" :items="records" :search="search">
        <template v-slot:item.action="{ item }">
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
      </v-data-table>  
      </v-card>  
            </template>
      <template>
      <v-dialog v-model="addRemaining" width="350px">
        <v-card>
          <v-spacer></v-spacer>
          <v-card-title class="deep-purple lighten-1 align-center">
            <v-list-item-title
              class="d-flex align-center justify-center mx-auto headline"
            >Update Remaining</v-list-item-title>
          </v-card-title>
          <v-container>
            <v-row class="mx-2">
              <v-col cols="12">
                <v-text-field
                  v-model="newRemainingProduct"
                  color="purple"
                  outlined
                  placeholder="Quantity (g)"
                  :error-messages="remainingProductErrors"
                  @input="$v.newRemainingProduct.$touch()"
                  @blur="$v.newRemainingProduct.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="addRemaining=false">Cancel</v-btn>
            <v-btn text >Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </div>
</template>
<style>
 .productCard {
    background-color: #ffffff !important;
    border: 2px solid #7B1FA2 !important
}
.productName{
  background-color: rgb(79, 53, 122) !important;
  color:white
}

</style>
<script>
import {
  required,
  minLength,
  maxLength,
  between
} from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import axios from "axios";
  export default {
    name: "Delivery",
    data () {
      return {
        records:[],
        deliveredOrder:[],
        addRemaining:false,
        product:[],
        search: '',
        newRemainingProduct:null,
        productId:null,
        headers: [
          {
            text: 'Product Name',
            align: 'start',
            sortable: false,
            value: 'customer_name',
          },
          { text: 'Remaining Quantity', value: 'product_remaining' },
          { text: 'Total Ordered Quantity', value: 'total_order' },
          { text: 'Date', value: 'record_date' },
          
        ],
        products:[{title:'Ube Halaya in Jar',image: require("@/assets/ubeJar.jpg")},
      {title:'Ube Halaya in Tab', image: require("@/assets/ubeTab.jpg")},
      ]
      }
    },
    mounted() {
      // this.getProduct();
      // setInterval(this.getProduct(), 1000);
    },
    validations: {
    newRemainingProduct: {
      required
    }
     },
    computed:{
      remainingProductErrors() {
      const errors = [];
      if (!this.$v.newRemainingProduct.$dirty) return errors;
      !this.$v.newRemainingProduct.required && errors.push("Quantity is required.");
      return errors;
    },
    },

  methods: {
    getColor(status) {
      if (status === "low stock") return "orange";
      else if (status === "good") return "green";
      else return "green";
    },
  // getProduct() {
  // axios.get("http://127.0.0.1:8000/api/fetch/postProduct")
  //       .then(response => {
  //          this.product = response.data;
  //       });
  //   },
  // editAvailableQuantity(item){
  //       this.newRemainingProduct=item.product_remaining,
  //       this.productId=item.id
  //       console.log(item)
  //     },
  // updateAvailableQuantity(item){
  //     let param = {
  //       productRemaining: this.newRemainingProduct,
  //       id: this.productId,
  //     };
  //     let currentObj = this;
  //     axios.post('http://127.0.0.1:8000/api/post/updateStockProduct', param)
  //         .then(function (response) {
  //                   currentObj.success = response.data.success
  //                   Swal.fire({
  //                     title: "Successfully Updated",
  //                     icon: "success",
  //                     timer: 5000
  //                   })
  //               })
  //               .catch(function (error) {
  //                 currentObj.output = error;
  //       });
  //        this.getProduct()
  //       this.addRemaining=false

  //     }
    },
  
  }
  </script>