<template>
<div class="ma-5 mb-12 pa-5">
      <v-spacer></v-spacer>
        <v-list class="">
          <v-btn class="ma-5" color="purple darken-2" rounded outlined dark @click="showDialog">
            <v-icon>mdi-plus</v-icon>
            <v-toolbar-title>Create Order</v-toolbar-title>
          </v-btn>
        </v-list>
        <v-dialog v-model="addOrderDialog" width="800px">
        <v-card>
            <v-spacer></v-spacer>
            <v-card-title class="align-center">
              <v-list-item-title
                class="d-flex align-center justify-center mx-auto headline black--text"
              >CREATE ORDER</v-list-item-title>
            </v-card-title>
            <v-container>
                <v-row>
                <v-col cols="6">
                  <v-text-field
                    prepend-icon="mdi-account-outline"
                    placeholder="Customer Name"
                    v-model="customerName"
                    :error-messages="customerErrors"
                    @input="$v.customerName.$touch()"
                    @blur="$v.customerName.$touch()"
                    required
                  ></v-text-field>
                </v-col>
                 <v-col cols="6">
                  <v-text-field
                    type="number"
                    prepend-icon="mdi-phone"
                    placeholder="+63 900 000 0000"
                    v-model="contactNumber"
                    :error-messages="contactNumberErrors"
                    @input="$v.contactNumber.$touch()"
                    @blur="$v.contactNumber.$touch()"
                    required
                  ></v-text-field>
                </v-col>

                </v-row>
          <v-icon>mdi-map-marker</v-icon> 
              <label > Address</label>
         
                <v-row class="pl-5">
                    <v-col cols="4">
                <v-text-field
                v-model="customerStreet"
                placeholder="Street"
                 :error-messages="customerStreetErrors"
                    @input="$v.customerStreet.$touch()"
                    @blur="$v.customerStreet.$touch()"
                    required
                >
                </v-text-field>
                  </v-col>
                  <v-col    cols="4">
                <v-text-field
                    v-model="customerBarangay"
                placeholder="Barangay"
                 :error-messages="customerBarangayErrors"
                    @input="$v.customerBarangay.$touch()"
                    @blur="$v.customerBarangay.$touch()"
                    required
                >
                </v-text-field>
                </v-col>
                <v-col cols="4">
                <v-text-field
                   v-model="customerProvince"
                placeholder="Province"
                 :error-messages="customerProvinceErrors"
                    @input="$v.customerProvince.$touch()"
                    @blur="$v.customerProvince.$touch()"
                    required
                ></v-text-field>
                </v-col>
                </v-row>
                <v-row>
                <v-col>
                    <v-img class="ml-5" width="250px" height="200px" src="../assets/halayaTab.jpg"></v-img>
                </v-col>
                    <v-col>
                        <v-img width="250px" 
                         src="../assets/halayaJar.jpg"></v-img>
                    </v-col>
                </v-row>
                <v-row>
                <v-col cols="5" class="pl-5">
                  <v-text-field
                    min="0"
                    type="number"
                    placeholder="Quantity"
                    v-model="tabQuantity"
                  >
                  <template slot="prepend">
                    <v-icon v-bind:disabled="isDisabled" >mdi-minus</v-icon>
                    <v-icon>mdi-plus</v-icon>
                </template></v-text-field>
                </v-col>
                <v-col cols="5"  class="pl-12">
                  <v-text-field
                    min="0"
                    type="number"
                    placeholder="Quantity"
                    v-model="jarQuantity"
                  ><template slot="prepend">
                    <v-icon>mdi-minus</v-icon>
                    <v-icon>mdi-plus</v-icon>
                </template></v-text-field>
                </v-col>
                </v-row>
                    <v-col
                cols="12"
                sm="6"
                md="4"
                ><v-menu
        v-model="menu"
        :close-on-content-click="true"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Delivery Date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            :error-messages="deliveryDateErrors"
                    @input="$v.date.$touch()"
                    @blur="$v.date.$touch()"
                    required
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          no-title
          scrollable
          :allowed-dates="notLessDate"
        >
        </v-date-picker>
      </v-menu>
    </v-col>
  
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="addOrderDialog = false, reloadData()">Cancel</v-btn>
              <v-btn text @click="placeOrder()">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <template>
            <v-row>
            <v-col>
            <v-card>
                <v-card-title class="d-flex justify-center " >Ube Halaya in Jar</v-card-title>
                <center>
                <img height="200px" src="../assets/halayaJar.jpg">
                </center>
            </v-card>
            </v-col>
        <v-col>
             <v-card>
                   <v-card-title  class="d-flex justify-center " >Ube Halaya in Tab</v-card-title>
                   <center>
                     <img height="200px" src="../assets/halayaTab.jpg">
                     </center>
            </v-card>
            </v-col>
            </v-row>
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
    data(){
        return {
        // date: new Date().toISOString().substr(0, 10),
      menu: false,
      btnDisable: true,
      addOrderDialog:false,
      customerStreet:null,
      customerBarangay:null,
      customerProvince:null,
      customerName:null,
      contactNumber: null,
      orderQuantity: null,
      orderStatus: "On order",
        date:null,
      jarQuantity:"0",
      tabQuantity:"0"
        }
    },
    validations: {
    customerName: {
      required
    },
    address: {
      required
    },
    contactNumber: {
      required,
      minLength: minLength(11),
      maxLength: maxLength(11)
    },
    orderQuantity: {
      required
    },
     customerStreet: {
      required
    },
     customerBarangay: {
      required
    }, customerProvince: {
      required
    },
    date: {
      required
    }
      }, 
      
 
  computed: {
    addressErrors() {
      const errors = [];
      if (!this.$v.address.$dirty) return errors;
      !this.$v.address.required && errors.push("Address is required.");
      return errors;
    },
    customerErrors() {
      const errors = [];
      if (!this.$v.customerName.$dirty) return errors;
      !this.$v.customerName.required && errors.push("Name is required.");
      return errors;
    },
    orderQuantityErrors() {
      const errors = [];
      if (!this.$v.orderQuantity.$dirty) return errors;
      !this.$v.orderQuantity.required && errors.push("Quantity is required.");
      return errors;
    },
    contactNumberErrors() {
      const errors = [];
      if (!this.$v.contactNumber.$dirty) return errors;
      !this.$v.contactNumber.minLength &&
        errors.push("Contact Number must be at atleast 11 characters long");
      !this.$v.contactNumber.maxLength &&
        errors.push(
          "Contact Number must not be greater than 11 characters long"
        );
      !this.$v.contactNumber.required &&
        errors.push("Contact Number is required.");
      return errors;
    },
    customerStreetErrors() {
      const errors = [];
      if (!this.$v.customerStreet.$dirty) return errors;
      !this.$v.customerStreet.required && errors.push("Street is required.");
      return errors;
    },
     customerBarangayErrors() {
      const errors = [];
      if (!this.$v.customerBarangay.$dirty) return errors;
      !this.$v.customerBarangay.required && errors.push("Barangay is required.");
      return errors;
    },
    customerProvinceErrors() {
      const errors = [];
      if (!this.$v.customerProvince.$dirty) return errors;
      !this.$v.customerProvince.required && errors.push("Province is required.");
      return errors;
    },
     deliveryDateErrors() {
      const errors = [];
      if (!this.$v.date.$dirty) return errors;
      !this.$v.date.required && errors.push("Delivery is required.");
      return errors;
    },
  },

    methods: {
        showDialog(){
             this.$v.$reset();
        this.addOrderDialog=true
        this.customerStreet=null,
      this.customerBarangay=null,
      this.customerProvince=null,
      this.customerName=null,
      this.contactNumber= null,
      this.orderQuantity= null,
      this.date=null
            
        },
        placeOrder(){
        this.$v.$touch();

        },
        isDisabled: function(){
    	return !this.tabQuantity;
    },

    notLessDate(deliveredDate){
    return deliveredDate >= new Date().toISOString().substr(0, 10)
   

    },
    
         

        
    },
    
}
</script>

