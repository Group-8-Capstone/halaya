<template>
  <div class="ma-5 mb-12 pa-5">
        <v-card flat>
          <v-card-title>Ube Halaya List of Ingredients</v-card-title>
          <v-row>
            <v-flex>
              <v-layout wrap>
                <v-flex md4 v-for="item in halayaIngredients" :key="item.id">
                  <v-card id="cards" class="card-container ma-5">
                    <v-card-title class="deep-purple lighten-5">{{item.ingredients_name}}</v-card-title>
                    <hr>
                    <v-row class="mx-auto text-center">
                      <v-list-item>Available Qty : <b>{{item.ingredients_remaining + ' kg/cans'}}</b></v-list-item>
                      <v-list-item>Used Qty : <b>{{item.total  + ' kg/cans'}}</b></v-list-item>
                      <v-list-item>
                        <v-chip
                          :color="getColor(item.ingredients_status)"
                        >{{item.ingredients_status}}</v-chip>
                      </v-list-item>
                    </v-row>
                    <v-row class="d-flex justify-end mb-6">
                      <template>
                        <v-card-actions>
                          <v-spacer></v-spacer>

                          <v-btn icon>
                            <v-icon
                              title="Add Quantity"
                              @click="editDialog = !editDialog, editIngredients(item)"
                            >mdi-plus</v-icon>
                          </v-btn>
                          <v-btn icon>
                            <v-icon
                              @click=" addUsedStockDialog=!addUsedStockDialog "
                              title="Used Quantity"
                            >mdi-minus</v-icon>
                          </v-btn>
                        </v-card-actions>
                      </template>
                    </v-row>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-row>
        </v-card>
      <!-- </v-tab-item>
      <v-tab-item> -->
        <!-- <v-card flat>
          <v-card-title>Butchi List of Ingredients</v-card-title>
          <v-row>
            <v-flex d-flex>
              <v-layout wrap>
                <v-flex md4 v-for="item in butchiIngredients" :key="item.id">
                  <v-card id="cards" class="card-container ma-5">
                    <v-card-title class="deep-purple lighten-5">{{item.ingredients_name}}</v-card-title>
                    <hr>
                    <v-row class="mx-auto text-center">
                      <v-list-item>Available Qty : <b>{{item.ingredients_remaining + ' kg/cans'}}</b></v-list-item>
                      <v-list-item>Used Qty : <b>{{item.total  + ' kg/cans'}}</b></v-list-item>
                      <v-list-item>
                        <v-chip
                          :color="getColor(item.ingredients_status)"
                        >{{item.ingredients_status}}</v-chip>
                      </v-list-item>
                    </v-row>
                    <v-row class="d-flex justify-end mb-6">
                      <template> -->
                        <!-- <v-icon
                          normal
                          class="mr-2"
                          title="Add Quantity"
                          @click="stockDialog=!stockDialog"
                        >mdi-plus</v-icon>-->
                        <!-- <v-card-actions>
                          <v-spacer></v-spacer>

                          <v-btn icon>
                            <v-icon
                              title="Add Quantity"
                              @click="editDialog = !editDialog, editIngredients(item)"
                            >mdi-plus</v-icon>
                          </v-btn>

                          <v-btn icon>
                            <v-icon
                              @click=" addUsedStockDialog=!addUsedStockDialog "
                              title="Used Quantity"
                            >mdi-minus</v-icon>
                          </v-btn>
                        </v-card-actions>
                      </template>
                    </v-row>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-row>
        </v-card> -->
      <!-- </v-tab-item>
      <v-tab-item> -->
        <!-- <v-card flat>
          <v-card-title>Ice Cream List of Ingredients</v-card-title>
          <v-row>
            <v-flex d-flex>
              <v-layout wrap>
                <v-flex md4 v-for="item in icecreamIngredients" :key="item.id">
                  <v-card id="cards" class="card-container ma-5">
                    <v-card-title class="deep-purple lighten-5">{{item.ingredients_name}}</v-card-title>
                    <hr>
                    <v-row class="mx-auto text-center">
                      <v-list-item>Available Qty : <b>{{item.ingredients_remaining + ' kg/cans'}}</b></v-list-item>
                      <v-list-item>Used Qty : <b>{{item.total  + ' kg/cans'}}</b></v-list-item>
                      <v-list-item>
                        <v-chip
                          :color="getColor(item.ingredients_status)"
                        >{{item.ingredients_status}}</v-chip>
                      </v-list-item>
                    </v-row>
                    <v-row class="d-flex justify-end mb-6">
                      <template> -->
                        <!-- <v-icon
                          normal
                          class="mr-2"
                          title="Add Quantity"
                          @click="stockDialog=!stockDialog "
                        >mdi-plus</v-icon>-->
                        <!-- <v-card-actions>
                          <v-spacer></v-spacer>

                          <v-btn icon>
                            <v-icon
                              title="Add Quantity"
                              @click="editDialog = !editDialog, editIngredients(item)"
                            >mdi-plus</v-icon>
                          </v-btn>

                          <v-btn icon>
                            <v-icon
                              @click=" addUsedStockDialog=!addUsedStockDialog "
                              title="Used Quantity"
                            >mdi-minus</v-icon>
                          </v-btn>
                        </v-card-actions>
                      </template> -->
                    <!-- </v-row>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-row>
        </v-card>
      </v-tab-item>
    </v-tabs-items> -->
     <v-card id="cardtable" class="ma-5 mb-12 pa-5">
        <v-card-title>
        Recorded Used Ingredients
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
       
         
              <v-data-table :headers="headersIngredients" :items="displayIngredientsRecords" :search="search">
              <template v-slot:item.action="{ item }" >
                <v-icon
                  normal
                  title="Edit"
                >mdi-table-edit</v-icon>
                <v-icon
                class="mr-3"
                color="red"
                normal
                title="Delete Product"
                >mdi-delete
                </v-icon>
              </template>
            </v-data-table>
           </v-card>

    <template>
      <v-dialog v-model="addUsedStockDialog" width="400px">
        <v-card>
          <v-spacer></v-spacer>
          <v-card-title class="deep-purple lighten-1 align-center">
            <v-list-item-title
              class="d-flex align-center justify-center mx-auto headline"
            >Amount used</v-list-item-title>
          </v-card-title>
          <v-container>
            <v-row class="mx-2">
              <v-col cols="12">
                <v-select
                  color="purple"
                  outlined
                  filled
                  :items="itemSelect"
                  label="Available ingredients"
                  v-model="availableIngredients"
                  :error-messages="ingredientsAvailableErrors"
                  @input="$v.availableIngredients.$touch()"
                  @blur="$v.availableIngredients.$touch()"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  color="purple"
                  outlined
                  min="1"
                  type="number"
                  label="Quantity (kg/number of cans)"
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
                  v-model="editStockItem.ingredients_remaining"
                  outlined
                  placeholder="Quantity (kg/number of cans)"
                >{{editStockItem.ingredients_remaining}}</v-text-field>
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
  name: "Ingredients",
  data() {
    return {
      displayIngredientsRecords:[],
      stockDialog: false,
      editDialog: false,
      addUsedStockDialog: false,
      ingredientsUnit: "",
      ingredientsName: "",
      stockStatus: "calculating...",
      search: "",
      ubeKilo: "",
      stocks: [],
      availableIngredients: "",
      usedIngredientsAmount: "",
      halayaIngredients: [],
      butchiIngredients: [],
      icecreamIngredients: [],
      editStockItem: {},
      itemSelect: [],
      tabs: null,
        headersIngredients: [
        {
          text: "Ingredient's Name",
          align: "start",
          sortable: false,
          value: 'ingredients_name'
        },
     { text: "Needed Value", value: "ingredients_need_amount" },
         { text: "Category", value: "ingredients_category" },
         { text: "Recorded Date", value: "recorded_date" },
        { text: "Actions", value: "action", sortable: false },
      ],
    };
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
  beforeCreate() {
    let config = {};
    config.headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
      'Access-Control-Allow-Origin':'*'
    };
    this.config = config;
    console.log("this.config", this.config);
  },
  created() {
    this.getHalayaIngredients();
    this.getButchiIngredients();
    this.getIceCreamIngredients();
    this.getAllIngredientsName();
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
  methods: {
    getColor (status) {
        if (status ==='Alert! Very Low') return 'red'
        else if (status ==='Warning! Running Low') return 'orange'
        else if (status ==='Calculating...') return 'blue'
        else return 'green'
    }, 
    getHalayaIngredients() {
      axios.get(this.url+"/api/getHalayaIngredients/", this.config)
        .then(response => {
          console.log(response)
          let results = [];
          for (var i = 0; i < response.data.length; i++) {
            if (this.containsObject(results, response.data[i].id)) {
              console.log("good");
            } else {
              results.push(response.data[i]);
              this.halayaIngredients = results;
            }
            continue;
          }
        });
    },
    getButchiIngredients() {
      axios
        .get(this.url+"/api/getButchiIngredients/", this.config)
        .then(response => {
          let results = [];
          for (var i = 0; i < response.data.length; i++) {
            if (this.containsObject(results, response.data[i].id)) {
              console.log("good");
            } else {
              results.push(response.data[i]);
              this.butchiIngredients = results;
            }
            continue;
          }
        });
    },
    getIceCreamIngredients() {
      axios
        .get(this.url+"/api/getIceCreamIngredients/", this.config)
        .then(response => {
          let results = [];
          for (var i = 0; i < response.data.length; i++) {
            if (this.containsObject(results, response.data[i].id)) {
              console.log("good");
            } else {
              results.push(response.data[i]);
              this.icecreamIngredients = results;
            }
            continue;
          }
        });
    },
    getAllIngredientsName() {
      let nameArray = [];
      axios
        .get(this.url+"/api/fetch/ingredientsName",this.config)
        .then(response => {
          for (var i = 0; i < response.data.length; i++) {
            if (nameArray.includes(response.data[i].ingredients_name)) {
              console.log("good");
            } else {
              nameArray.push(response.data[i].ingredients_name);
              this.itemSelect = nameArray;
            }
            continue;
          }
        });
    },
    reloadDataAddStock() {
      (this.ingredientsName = ""),
      (this.ingredientsUnit = ""),
      this.getHalayaIngredients();
      this.getButchiIngredients();
      this.getIceCreamIngredients();
      this.$v.$reset();
    },
    reloadDataAddUsedAmount() {
      (this.availableIngredients = ""),
        (this.usedIngredientsAmount = ""),
        this.getHalayaIngredients();
      this.getButchiIngredients();
      this.getIceCreamIngredients();
      this.$v.$reset();
    },
    editIngredients(item) {
      axios.get(this.url+"/api/post/editStock/" + item.id, this.config)
        .then(response => {
          this.editStockItem = response.data;
          console.log("edit stock item", JSON.stringify(this.editStockItem));
        });
    },
    updateIngredients() {
      axios
        .post(this.url+"/api/post/updateStock", this.editStockItem, this.config)
        .then(response => {
          console.log(response);
          this.getHalayaIngredients();
          this.getButchiIngredients();
          this.getIceCreamIngredients();
          this.editDialog = false;
        });
    },
    containsObject(arr, id) {
      return arr.some(function(el) {
        return el.id === id;
      });
    },
    addIngredientsAmount() {
      this.$v.$touch();
      if (
        this.availableIngredients === "" ||
        this.availableIngredients === ""
      ) {
        this.addUsedStockDialog = true;
      } else {
        let newAddedAmount = {
          availableIngredients: this.availableIngredients,
          usedIngredientsAmount: this.usedIngredientsAmount
        };
        console.log("used_amount", newAddedAmount);
        axios
          .post(
            this.url+"/api/post/usedIngredients",
            newAddedAmount, this.config
          )
          .then(response => {
            console.log(response);
            this.reloadDataAddUsedAmount();
            this.addUsedStockDialog = false;
          });
      }
    }
  }
};
</script>
<style>
#cards {
  padding: 10px !important;
  justify-content: center !important;
}
.v-application .mb-6 {
  margin-bottom: 0px !important;
}
.row {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
  margin-right: 0px !important;
  margin-left: 0px !important;
}
</style>
