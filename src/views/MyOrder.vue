<template>
<div>
    <v-card id="cardtable" class="ma-5 mb-12 pa-5">
      <v-tabs
        v-model="tabs"
        right
        color="deep-purple accent-4">
        <v-tab>On going</v-tab>
         <v-tab>Delivered</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabs">
      <v-tab-item>
      <v-card-title>
         <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
           </v-card-title>
              <v-data-table :headers="headers" :items="onOrder" :search="search">
              <template v-slot:item.action="{ item }" >
                <v-icon
                  @click="editDialog = !editDialog, editEstimatedValue(item) "
                  normal
                  title="Edit"
                >mdi-table-edit</v-icon>
                <v-icon
                class="mr-3"
                color="red"
                @click="alertDeleteIngredients(item)"
                normal
                title="Delete Product"
                >mdi-delete
                </v-icon>
              </template>
            </v-data-table>
            </v-tab-item>
            <v-tab-item>
               <v-card-title>
         <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
            
          </v-card-title>
            <v-data-table :headers="headers" :items="deliveredOrder" :search="search">
              <template v-slot:item.action="{ item }" >
                <v-icon
                @click="editProduct(item)"
                  normal
                  title="Edit"
                >mdi-table-edit
                </v-icon>
                <v-icon
                class="mr-3"
                color="red"
                @click="AlertDelete(item)"
                  normal
                  title="Delete Product"
                >mdi-delete
                </v-icon>
              </template>
            </v-data-table>
            </v-tab-item>
        </v-tabs-items>
         
     </v-card>
</div>
</template>
<style>


</style>

<script>
import { required, minLength, maxLength, between } from 'vuelidate/lib/validators'
import axios from "axios";
import Swal from "sweetalert2";
  export default {
    name: "MyOrder",
    data: () => ({
        deliveredOrder:[],
        onOrder:[],
          tabs:null,
          headers: [
        
        
     { text: "Product Name", value: "" },
         { text: "Order Details", value: "" },
        { text: "Actions", value: "action", sortable: false },
      ],
        
    })
  }
</script>
