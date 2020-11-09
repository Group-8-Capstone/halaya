<template>
  <div >
    <v-card class="ma-5 mb-12 pa-5">
      <v-card-title>THE BEST OF WAWEN'S UBE HALAYA
          <v-spacer></v-spacer>
          <v-list class>
      <v-btn class="ma-5" color="purple darken-2" rounded dark @click="showDialog">
        <v-icon>mdi-plus</v-icon>
        <v-toolbar-title>Create Order</v-toolbar-title>
      </v-btn>
    </v-list>
      </v-card-title>
       <OrderingInfo></OrderingInfo>
    </v-card>
    <v-dialog v-model="addOrderDialog" width="800px">
      <v-card>
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
                label="Receiver Name"
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
                label="Mobile Number"
                v-model="contactNumber"
                :error-messages="contactNumberErrors"
                @input="$v.contactNumber.$touch()"
                @blur="$v.contactNumber.$touch()"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-icon class="pl-5">mdi-map-marker</v-icon>
          <label>Receiver Address</label>
          <v-row class="pl-5">
            <v-col cols="6">
              <v-text-field
                v-model="customerStreet"
                label="Building Name/Street"
                :error-messages="customerStreetErrors"
                @input="$v.customerStreet.$touch()"
                @blur="$v.customerStreet.$touch()"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="customerBarangay"
                label="Barangay"
                :error-messages="customerBarangayErrors"
                @input="$v.customerBarangay.$touch()"
                @blur="$v.customerBarangay.$touch()"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="pl-5">
             <v-col cols="6">
              <v-text-field
                v-model="customerMunicipality"
                label="Municipality/City"
                :error-messages="customerMunicipalityErrors"
                @input="$v.customerMunicipality.$touch()"
                @blur="$v.customerMunicipality.$touch()"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="customerProvince"
                label="Province"
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
              <v-img width="250px" height="200px" src="../assets/halayaJar.jpg"></v-img>
            </v-col>
          </v-row>
          <v-row class="pl-5">
            <v-col cols="5" class="pl-5">
              <v-text-field min="0" type="number" label="Quantity" v-model="tabQuantity">
                <template slot="prepend">
                  <!-- <v-icon >mdi-minus</v-icon>
                  <v-icon>mdi-plus</v-icon> -->
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="5" class="pl-12">
              <v-text-field min="0" type="number" label="Quantity" v-model="jarQuantity">
                <template slot="prepend">
                  <!-- <v-icon>mdi-minus</v-icon>
                  <v-icon>mdi-plus</v-icon> -->
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        <v-row class="pl-5">
          <v-col cols="12" sm="6" md="4"   >
            <v-menu
              v-model="menu"
              :close-on-content-click="true"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="Preferred Delivery Date"
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
              <v-date-picker v-model="date" no-title scrollable :allowed-dates="notLessDate"></v-date-picker>
            </v-menu>
          </v-col>
          </v-row>
        </v-container>
        <v-card-actions >
          <v-spacer></v-spacer>
          <v-btn text color="orange" @click="addOrderDialog = false" class="mb-5" >Cancel</v-btn>
          <v-btn text color="primary" @click="placeOrder()" class="mb-5">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <template>
      <v-row>
        <v-col>
          <v-hover v-slot:default="{ hover }">
            <v-card class="mx-auto mr-5" color="grey lighten-4" width="80%">
              <v-img :aspect-ratio="16/8" src="../assets/halayaTab.jpg">
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out purple darken-2 v-card--reveal display-1 white--text"
                    style="height: 100%;"
                  >Take a try</div>
                </v-expand-transition>
              </v-img>
              <v-card-text class="pt-6" style="position: relative;">
                <div class="font-weight-light grey--text title mb-2">Perfect Ubelicious treat</div>
                <h3 class="display-1 font-weight-light orange--text mb-2">Ube halaya in tub</h3>
                <div id="price" class="font-weight-light grey--text title mb-2">₱499.00</div>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <v-col>
          <v-hover v-slot:default="{ hover }">
            <v-card class="mx-auto ml-5" color="grey lighten-4" width="80%">
              <v-img class="justify-center" :aspect-ratio="16/8" src="../assets/halayaJar.jpg">
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out purple darken-2 v-card--reveal display-1 white--text"
                    style="height: 100%;"
                  >Have a taste</div>
                </v-expand-transition>
              </v-img>
              <v-card-text class="pt-6" style="position: relative;">
                <div class="font-weight-light grey--text title mb-2">Perfect Ubelicious snack</div>
                <h3 class="display-1 font-weight-light orange--text mb-2">Ube halaya in jar</h3>
                <div id="price" class="font-weight-light grey--text title mb-2">₱150.00</div>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </template>
  </div>
</template>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}

.v-application--wrap {
  min-height: 100vh;
  justify-content: center;
}
</style>

<script>
import OrderingInfo from "../components/OrderingInfo";
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
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoiamllbnhpeWEiLCJhIjoiY2tlaTM3d2VrMWcxczJybjc0cmZkamk3eiJ9.JzrYlG2kZ08Pkk24hvKDJw",
      menu: false,
      btnDisable: true,
      addOrderDialog: false,
      customerStreet: null,
      customerBarangay: null,
      customerProvince: null,
      customerName: null,
      contactNumber: null,
      orderQuantity: null,
      customerMunicipality:null,
      orderStatus: "",
      date: null,
      jarQuantity: "0",
      tabQuantity: "0",
      distance: 0,
    };
  },
  components: {
    OrderingInfo,
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
    },
    customerMunicipality:{
      required
    },
    customerProvince: {
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
      !this.$v.customerBarangay.required &&
        errors.push("Barangay is required.");
      return errors;
    },
    customerMunicipalityErrors(){
       const errors = [];
      if (!this.$v.customerMunicipality.$dirty) return errors;
      !this.$v.customerMunicipality.required &&
        errors.push("Municipality is required.");
      return errors;

    },
    customerProvinceErrors() {
      const errors = [];
      if (!this.$v.customerProvince.$dirty) return errors;
      !this.$v.customerProvince.required &&
        errors.push("Province is required.");
      return errors;
    },
    deliveryDateErrors() {
      const errors = [];
      if (!this.$v.date.$dirty) return errors;
      !this.$v.date.required && errors.push("Delivery is required.");
      return errors;
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
  
  },

  methods: {
    showDialog() {
      this.$v.$reset();
      this.addOrderDialog = true
      this.customerStreet = null
      this.customerBarangay = null
      this.customerMunicipality = null
      this.customerProvince = null
      this.customerName = null
      this.contactNumber = null
      this.jarQuantity="0"
      this.ubeQuantity="0"
      this.orderQuantity = null
      this.date = null
    },
    getOrderStatus(qty) {
      if (qty <= 9) {
        return "On order";
      } else if (qty >= 10) {
        return "Pending";
      }
    },
    placeOrder() {
      this.$v.$touch();
      var street=this.customerStreet.charAt(0).toUpperCase() +
          this.customerStreet.slice(1).toLowerCase();
      var barangay=this.customerBarangay.charAt(0).toUpperCase() +
          this.customerBarangay.slice(1).toLowerCase();
      var municipality=this.customerMunicipality.charAt(0).toUpperCase() +
          this.customerMunicipality.slice(1).toLowerCase();
      var province=this.customerProvince.charAt(0).toUpperCase() +
          this.customerProvince.slice(1).toLowerCase();

      var place = street.concat(
        " ",
        barangay,
        " ",
       municipality,
        " ",
        province
      );
      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?limit=2&access_token=${
            this.accessToken
          }`
        )
        .then(response => {
          let res = JSON.stringify(response.data);
          let result = JSON.parse(res); 
          var coordinates = result.features[0].geometry.coordinates
          var from_place = turf.point([123.921969, 10.329892]);
          var to_place = turf.point(coordinates);
          var options = { units: "kilometers" };
          var dist = turf.distance(from_place, to_place, options);

          let param = {
            customer_id: localStorage.getItem("id"),
            receiver_name: this.customerName,
            // address: place,
            building_street: street,
            barangay: barangay,
            city_municipality: municipality,
            province: province,
            contactNumber: this.contactNumber,
            jar_qty: this.jarQuantity,
            tub_qty: this.tabQuantity,
            deliveryDate: this.date,
            orderStatus: this.getOrderStatus(this.jarQuantity),
            distance: dist
          };
          axios
            .post("http://127.0.0.1:8000/api/post/createOrder", param, this.config)
            .then(response => {
              console.log("response.data: ", response.data);
              if (response.data == "success") {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Your order has been sent",
                  showConfirmButton: false,
                  timer: 1500
                });
                this.addOrderDialog=false;
              }
            });
        });
        
    },
    notLessDate(deliveredDate) {
      return deliveredDate >= new Date().toISOString().substr(0, 10);
    }
  }
};
</script>

