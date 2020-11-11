<template>
  <div class="ma-5 mb-12 pa-5">
    <v-row>
      <v-layout wrap class="justify-center">
        <v-card class="card-container ma-5 productCard" outlined>
          <v-card-title class="justify-center productName">{{jarName}}</v-card-title>
          <v-list-item class="justify-center mt-5">
            <img src="../assets/ubeJar.jpg" alt width="100" height="100">
          </v-list-item>
          <v-list-item class="justify-center">Remaining Quantity: {{halayaJarAvailability}} pcs</v-list-item>
          <v-list-item class="justify-center">Price: {{jarPrice}} Pesos</v-list-item>
          <center>
            <v-chip :color="comparedJarAvailability()" dark>{{ jarStat }}</v-chip>
          </center>
          <v-list-item class="justify-center">Ordered Quantity: {{totalJar}} pcs</v-list-item>
          <v-card-actions class="justify-center">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="JarDialog=true">Edit</v-btn>
              <v-btn text color="grey" @click="recordProductJar">Record</v-btn>
            </v-card-actions>
          </v-card-actions>
        </v-card>
        <v-card class="card-container ma-5 productCard" outlined>
          <v-card-title class="justify-center productName">{{tubName}}</v-card-title>
          <v-list-item class="justify-center mt-5">
            <img src="../assets/ubeTab.jpg" alt width="100" height="100">
          </v-list-item>
          <v-list-item class="justify-center">Remaining Quantity: {{halayaTubAvailability}} pcs</v-list-item>
          <v-list-item class="justify-center">Price: {{tubPrice}} Pesos</v-list-item>
          <center>
            <v-chip :color="comparedTubAvailability()" dark>{{ tubStat }}</v-chip>
            <v-list-item class="justify-center">Ordered Quantity: {{totalTub}} pcs</v-list-item>
          </center>
          <v-card-actions class="justify-center">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="TubDialog=true">Edit</v-btn>
              <v-btn text color="grey" @click="recordProductTub">Record</v-btn>
            </v-card-actions>
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-row>
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
      <v-dialog v-model="JarDialog" width="350px">
        <v-card>
          <v-spacer></v-spacer>
          <v-card-title class="deep-purple lighten-1 align-center">
            <v-list-item-title
              class="d-flex align-center justify-center mx-auto headline"
            >Update Jar Info</v-list-item-title>
          </v-card-title>
          <v-container>
            <v-row class="mx-2">
              <v-col cols="12">
                <v-text-field v-model="editedJarPrice" color="purple" outlined label="Price"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="editedJarAvail" color="purple" outlined label="Remaining"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="JarDialog=false,getHalayaJar()">Cancel</v-btn>
            <v-btn text @click="editHalayaJar()" >Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template>
      <v-dialog v-model="TubDialog" width="350px">
        <v-card>
          <v-spacer></v-spacer>
          <v-card-title class="deep-purple lighten-1 align-center">
            <v-list-item-title
              class="d-flex align-center justify-center mx-auto headline"
            >Update Tub Info</v-list-item-title>
          </v-card-title>
          <v-container>
            <v-row class="mx-2">
              <v-col cols="12">
                <v-text-field
                  v-model="editedTubPrice"
                  color="purple"
                  outlined
                  placeholder="Quantity (g)"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedTubAvail"
                  color="purple"
                  outlined
                  placeholder="Quantity (g)"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="TubDialog=false,getHalayaTub()">Cancel</v-btn>
            <v-btn text @click="editHalayaTub()" >Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </div>
</template>
<style>
.productCard {
  background-color: #ffffff !important;
  border: 2px solid #7b1fa2 !important;
}
.productName {
  background-color: rgb(79, 53, 122) !important;
  color: white;
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
  data() {
    return {
      records: [],
      deliveredOrder: [],
      TubDialog: false,
      JarDialog: false,
      product: [],
      search: "",
      editedTubPrice: null,
      editedJarPrice: null,
      editedTubAvail: null,
      editedJarAvail: null,
      productId: null,
      totalJar: null,
      totalTub: null,
      halayaTubAvailability: null,
      halayaJarAvailability: null,
      tubPrice: null,
      jarPrice: null,
      tubId: null,
      jarId: null,
      jarStat: null,
      tubStat: null,
      jarName: null,
      tubName: null,
      halayaTab: [],
      headers: [
        {
          text: "Product Name",
          align: "start",
          sortable: false,
          value: "product_name"
        },
        { text: "Remaining Quantity", value: "remaining_quantity" },
        { text: "Total Ordered Quantity", value: "total_ordered" },
        { text: "Date", value: "created_at" }
      ],
      products: [
        { title: "Ube Halaya in Jar", image: require("@/assets/ubeJar.jpg") },
        { title: "Ube Halaya in Tab", image: require("@/assets/ubeTab.jpg") }
      ]
    };
  },
  beforeCreate() {
    let config = {};
    config.headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Access-Control-Allow-Origin": "*"
    };
    this.config = config;
    console.log("this.config", this.config);
  },
  created() {
    this.getTotalJar();
    this.gettotalTub();
    this.getHalayaTub();
    this.getHalayaJar();
    this.comparedJarAvailability();
    this.comparedTubAvailability();
    this.fetchRecordedProduct();
  },
  validations: {
    newRemainingProduct: {
      required
    }
  },
  computed: {
    remainingProductErrors() {
      const errors = [];
      if (!this.$v.newRemainingProduct.$dirty) return errors;
      !this.$v.newRemainingProduct.required &&
        errors.push("Quantity is required.");
      return errors;
    }
  },
  methods: {
    getColor(status) {
      if (status === "low stock") return "orange";
      else if (status === "good") return "green";
      else return "green";
    },
    getTotalJar(item) {
      axios
        .get("http://127.0.0.1:8000/api/totalJar", this.config)
        .then(response => {
          console.log(response.data);
          this.totalJar = response.data;
        });
    },
    gettotalTub(item) {
      axios
        .get("http://127.0.0.1:8000/api/totalTab", this.config)
        .then(response => {
          console.log(response.data);

          this.totalTub = response.data;
        });
    },

    getHalayaTub(item) {
      axios
        .get("http://127.0.0.1:8000/api/fetchHalayaTub", this.config)
        .then(response => {
          console.log(response.data.product[0].id)
          this.tubId=response.data.product[0].id
          this.tubName=response.data.product[0].product_name
          this.editedTubPrice=response.data.product[0].product_price
          this.editedTubAvail=response.data.product[0].product_availability
          this.tubPrice=response.data.product[0].product_price
          this.halayaTubAvailability=response.data.product[0].product_availability - this.totalTub
        });
    },

    getHalayaJar(item) {
      axios
        .get("http://127.0.0.1:8000/api/fetchHalayaJar", this.config)
        .then(response => {
           console.log(response.data.product[0])
          this.jarId=response.data.product[0].id
          this.jarName=response.data.product[0].product_name
          this.editedJarPrice=response.data.product[0].product_price
          this.editedJarAvail=response.data.product[0].product_availability
          this.jarPrice=response.data.product[0].product_price
          this.halayaJarAvailability=response.data.product[0].product_availability-this.totalJar 
        });
      },

    editHalayaTub() {
      let param = {
        product_price: this.editedTubPrice,
        product_availability: this.editedTubAvail
      };
      axios
        .post(
          "http://127.0.0.1:8000/api/editTub/" + this.tubId,
          param,
          this.config
        )
        .then(response => {
          Swal.fire({
            title: "Successfully Added",
            icon: "success",
            timer: 3000
          });
          this.TubDialog = false;
          this.getHalayaTub();
      }  )},

    editHalayaJar() {
      console.log(this.tubId);
      let param = {
        product_price: this.editedJarPrice,
        product_availability: this.editedJarAvail
      };
      axios
        .post(
          "http://127.0.0.1:8000/api/editTub/" + this.jarId,
          param,
          this.config
        )
        .then(response => {
          Swal.fire({
            title: "Successfully Added",
            icon: "success",
            timer: 3000
          });
          this.JarDialog = false;
          this.getHalayaJar();
       
       
      })
      },
       
      comparedJarAvailability(){
        if (this.totalJar<this.editedJarAvail){
          this.jarStat='Enough'
          return "green";
        } else {
          this.jarStat='Lack'
          return "red"
        }
      
       },
      comparedTubAvailability(){
        if (this.totalTub<this.editedTubAvail){
          this.tubStat='Enough'
          return "green";
        } else{
          this.tubStat='Lack'
          return "red"
        } 
},
    comparedJarAvailability() {
      if (this.totalJar < this.halayaJarAvailability) {
        this.jarStat = "Enough";
        return "green";
      } else {
        this.jarStat = "Lack";
        return "red";
      }
    },
    comparedTubAvailability() {
      if (this.totalTub < this.halayaTubAvailability) {
        this.tubStat = "Enough";
        return "green";
      } else {
        this.tubStat = "Lack";
        return "red";
      }
    },

    recordProductJar() {
      let param = {
        product_name: this.jarName,
        remaining_quantity: this.halayaJarAvailability,
        total_ordered: this.totalJar,
        availability_status: this.jarStat
      };
      axios
        .post("http://127.0.0.1:8000/api/dailyRecords", param, this.config)
        .then(response => {
          if (response.data == "success") {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Recorded!",
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            Swal.fire({
              position: "center",
              icon: "warning",
              titleText: "Recorded",
              text: "See below Record",
              showConfirmButton: false,
              timer: 1500
            });
          }
        });
    },

    recordProductTub() {
         let param = {
            product_name: this.tubName,
            remaining_quantity: this.halayaTubAvailability,
            total_ordered: this.totalTub,
            availability_status: this.tubStat,
          };
          axios
            .post("http://127.0.0.1:8000/api/dailyRecords", param,this.config)
            .then(response => {
              console.log(response.data)
                if (response.data =='success'){
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Recorded!",
                  showConfirmButton: false,
                  timer: 1500
                });
                }else{
                  Swal.fire({
                  position: "center",
                  icon: "warning",
                  titleText:"Recorded",
                  text:'See below Record',
                  showConfirmButton: false,
                  timer: 1500
                });
              }
            });
          },
    fetchRecordedProduct() {
          axios
            .get("http://127.0.0.1:8000/api/fetchRecordedProduct",this.config)
            .then(response => {
              this.records=response.data.product
            });
    },
  }
}
</script>