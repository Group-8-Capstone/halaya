<template>
  <div class="ma-5 mb-12 pa-5">
        <v-tabs
        v-model="tabs"
        right
        color="deep-purple accent-4">
        <v-tab>Ube Halaya</v-tab>
         <v-tab>Butchi</v-tab>
        <v-tab>Ube Ice Cream</v-tab>
      </v-tabs>
    <v-tabs-items v-model="tabs">
      <v-tab-item>
        <v-card flat>
    <v-card-title >
       Ube Halaya List of Ingredients
          </v-card-title>
    <v-row>
  <v-flex d-flex>
   <v-layout wrap>
       <v-flex md4 v-for="item in array1" :key="item.id">
           <v-card class="card-container ma-5">
             <row>
          <v-list-item>Ingredients Name: {{item.ingredientsName}}</v-list-item>
            <v-list-item>Available Quantity: {{item.availableQuantity}}</v-list-item>
            <v-list-item>Used Quantity: {{item.usedQuantity}}</v-list-item>
             <v-list-item>Status: {{item.Status}}</v-list-item>
            </row>
          <row class="d-flex justify-end mb-6"> 
           <template   >
          <v-icon
            normal
            class="mr-2"
            title="Add Quantity"
            @click="stockDialog=!stockDialog"
          >mdi-plus</v-icon>
          <v-icon
            @click=" addUsedStockDialog=!addUsedStockDialog "
            class="mr-2"
            normal
            title='Used Quantity'
          >mdi-minus</v-icon>
          <v-icon @click="editDialog = !editDialog  "
           normal class="mr-2" 
           title="Edit Quantity">mdi-table-edit</v-icon>
        </template>
           </row>
          </v-card>
       </v-flex>
   </v-layout>
</v-flex>
    </v-row>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-title>
        Butchi List of Ingredients
          </v-card-title>
               <v-row>
  <v-flex d-flex>
   <v-layout wrap>
       <v-flex md4 v-for="item in array1" :key="item.id">
           <v-card class="card-container ma-5">
             <row>
            <v-list-item>Ingredients Name: {{item.ingredientsName}}</v-list-item>
            <v-list-item>Available Quantity: {{item.availableQuantity}}</v-list-item>
            <v-list-item>Used Quantity: {{item.usedQuantity}}</v-list-item>
             <v-list-item>Status: {{item.Status}}</v-list-item>
            </row>
          <row class="d-flex justify-end mb-6"> 
           <template   >
          <v-icon
            normal
            class="mr-2"
            title="Add Quantity"
            @click="stockDialog=!stockDialog"
          >mdi-plus</v-icon>
          <v-icon
            @click=" addUsedStockDialog=!addUsedStockDialog "
            class="mr-2"
            normal
            title='Used Quantity'
          >mdi-minus</v-icon>
          <v-icon @click="editDialog = !editDialog  "
           normal class="mr-2" 
           title="Edit Quantity">mdi-table-edit</v-icon>
        </template>
           </row>
          </v-card>
       </v-flex>
   </v-layout>
</v-flex>
    </v-row>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-title >
           Ice Cream List of Ingredients
          </v-card-title>
  <v-row>
  <v-flex d-flex>
   <v-layout wrap>
       <v-flex md4 v-for="item in array1" :key="item.id">
           <v-card class="card-container ma-5">
             <row>
            <v-list-item>Ingredients Name: {{item.ingredientsName}}</v-list-item>
            <v-list-item>Available Quantity: {{item.availableQuantity}}</v-list-item>
            <v-list-item>Used Quantity: {{item.usedQuantity}}</v-list-item>
             <v-list-item>Status: {{item.Status}}</v-list-item>
            </row>
          <row class="d-flex justify-end mb-6"> 
          <template   >
          <v-icon
            normal
            class="mr-2"
            title="Add Quantity"
            @click="addUsedStockDialog=!addUsedStockDialog"
          >mdi-plus</v-icon>
          <v-icon
            @click="stockDialog=!stockDialog "
            class="mr-2"
            normal
            title='Used Quantity'
          >mdi-minus</v-icon>
          <v-icon @click="editDialog = !editDialog "
           normal class="mr-2" 
           title="Edit Quantity">mdi-table-edit</v-icon>
        </template>
           </row>
          </v-card>
       </v-flex>
   </v-layout>
</v-flex>
    </v-row>
      </v-card>
      </v-tab-item>
    </v-tabs-items>
    <template>
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
                outlined
                label="ingredients name"
                color="purple"
                v-model="ingredientsName"
                :error-messages="ingredientsNameErrors"
                @input="$v.ingredientsName.$touch()"
                @blur="$v.ingredientsName.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
               outlined
               color="purple"
                min="1"
                type="number"
                label="Amount (kg/number of cans)"
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
    </template>

    <template>
     <v-dialog v-model="addUsedStockDialog" width="400px">
      <v-card>
        <v-spacer></v-spacer>
        <v-card-title class="deep-purple lighten-1 align-center">
          <v-list-item-title class="d-flex align-center justify-center mx-auto headline">Amount used</v-list-item-title>
        </v-card-title>
        <v-container>
          <v-row class="mx-2">
            <v-col cols="12">
              <v-text-field
              color="purple"
                outlined
                filled
                label="Available ingredients"
                v-model="availableIngredients"
                :error-messages="ingredientsAvailableErrors"
                @input="$v.availableIngredients.$touch()"
                @blur="$v.availableIngredients.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
              color="purple"
                outlined
                min="1"
                type="number"
                label="Amount (kg/number of cans)"
                v-model="usedIngredientsAmount"
                :error-messages="ingredientsUsedAmountErrors"
                @input="$v.usedIngredientsAmount.$touch()"
                @blur="$v.usedIngredientsAmount.$touch()"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="addUsedStockDialog = false">Cancel</v-btn>
          <v-btn text @click="addIngredientsAmount()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </template>

    <template>
      <v-dialog v-model="editDialog" width="350px">
        <v-card>
          <v-spacer></v-spacer>
          <v-card-title class="deep-purple lighten-1 align-center">
            <v-list-item-title
              class="d-flex align-center justify-center mx-auto headline"
            >UPDATE AMOUNT</v-list-item-title>
          </v-card-title>
          <v-container>
            <v-row class="mx-2">
              <v-col cols="12">
                <v-text-field
                  color="purple"
                  outlined
                  placeholder="ingredientsName"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  color="purple"
                  outlined
                  placeholder="ingredientsAmount"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="editDialog = false,reloadDataAddStock()">Cancel</v-btn>
            <v-btn text @click=" updateIngredients()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
          </template>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import axios from "axios";
import { setInterval } from "timers";
import {
  required,
  minLength,
  maxLength,
  between
} from "vuelidate/lib/validators";
  export default {
    name:"Ingredients",
    
    data () {
      return {
        stockDialog:false,
        editDialog:false,
        addUsedStockDialog:false,
      ingredientsUnit: "",
      ingredientsName: "",
      stockStatus: "calculating...",
      search: "",
      ubeKilo: "",
      availableIngredients: "",
      usedIngredientsAmount: "",
        array1:[{"ingredientsName":"Ube","usedQuantity":"30", "availableQuantity":"50", "Status":"Enough"},{"ingredientsName":"Milk","usedQuantity":"30","availableQuantity":"50","Status":"Enough"}],
        tabs: null,
      }
    },
    validations: {
    ingredientsUnit: {
      required
    },
    ingredientsName: {
      required
    },
    availableIngredients: {
      required
    },
    usedIngredientsAmount: {
      required
    }
  },

  computed: {
    ingredientsNameErrors() {
      const errors = [];
      if (!this.$v.ingredientsName.$dirty) return errors;
      !this.$v.ingredientsName.required && errors.push("name is required.");
      return errors;
    },
    ingredientsUnitErrors() {
      const errors = [];
      if (!this.$v.ingredientsUnit.$dirty) return errors;
      !this.$v.ingredientsUnit.required && errors.push("unit is required.");
      return errors;
    },
    ingredientsAvailableErrors() {
      const errors = [];
      if (!this.$v.availableIngredients.$dirty) return errors;
      !this.$v.availableIngredients.required &&
        errors.push("name is required.");
      return errors;
    },
    ingredientsUsedAmountErrors() {
      const errors = [];
      if (!this.$v.usedIngredientsAmount.$dirty) return errors;
      !this.$v.usedIngredientsAmount.required &&
        errors.push("unit is required.");
      return errors;
    }
  },
  }
</script>