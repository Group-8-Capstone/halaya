<template>
  <v-app>
    <v-card  class="ma-5 mb-12 pa-5">
       
      <default-location/>
    </v-card>
    <v-card id="cardtable" class="ma-5 mb-12 pa-5">
      <v-tabs
        v-model="tabs"
        right
        color="deep-purple accent-4">
        <v-tab>Walk in</v-tab>
         <v-tab>Received Orders</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabs">
      <v-tab-item>
      <v-card-title>
        Order
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
            <v-toolbar-title>Add Order</v-toolbar-title>
          </v-btn>
        </v-list>
      </v-card-title>    
            <v-data-table :headers="headers" :items="orders" :search="search">
        <template v-slot:item.order_status="{ item }">
          <v-chip :color="getColor(item.order_status)" dark>{{ item.order_status }}</v-chip>
        </template>
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
        </v-tab-item>
          <v-tab-item>
        <v-card flat>
        <v-card-title >
          Recieved Orders
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-row>
      <v-flex d-flex>
        <v-layout wrap>
          <v-data-table :headers="headers" :items="orders" :search="search">
        <template v-slot:item.order_status="{ item }">
          <v-chip :color="getColor(item.order_status)" dark>{{ item.order_status }}</v-chip>
        </template>
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
   </v-layout>
</v-flex>
    </v-row>
      </v-card>
      </v-tab-item>
    </v-tabs-items>
        <v-dialog v-model="dialog" width="400px">
          <v-card>
            <v-spacer></v-spacer>
            <v-card-title class="deep-purple lighten-1 align-center">
              <v-list-item-title
                class="d-flex align-center justify-center mx-auto headline"
              >ADD ORDER</v-list-item-title>
            </v-card-title>
            <v-container>
              <v-row class="mx-2">
                <v-col cols="12">
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
                <v-col cols="12">
                  <v-text-field
                    prepend-icon="mdi-map-marker"
                    placeholder="Address"
                    v-model="address"
                    :error-messages="addressErrors"
                    @input="$v.address.$touch()"
                    @blur="$v.address.$touch()"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
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
                        label="delivery date"
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
                    </v-date-picker>
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="deliveryDate"
                          label="delivery date"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="deliveryDate" :min="deliveryDate"  :max="getEndDate" color="deep-purple lighten-1" no-title scrollable>
                      </v-date-picker>
                 </v-menu>

                </v-col>
                <v-col cols="12">
                  <v-text-field
                    prepend-icon="mdi-plus"
                    min="1"
                    type="number"
                    placeholder="Quantity"
                    v-model="orderQuantity"
                    :error-messages="orderQuantityErrors"
                    @input="$v.orderQuantity.$touch()"
                    @blur="$v.orderQuantity.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="dialog = false, reloadData()">Cancel</v-btn>
              <v-btn text @click="addOrder()">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <template>
          <v-dialog v-model="editDialog" width="400px">
            <v-card>
              <v-spacer></v-spacer>
              <v-card-title class="deep-purple lighten-1 align-center">
                <v-list-item-title
                  class="d-flex align-center justify-center mx-auto headline"
                >UPDATE ORDER</v-list-item-title>
              </v-card-title>
              <v-container>
                <v-row class="mx-2">
                  <v-col class="align-center justify-space-between" cols="12">
                    <v-row align="center" class="mr-0">
                      <v-avatar size="40px" class="mx-3">
                        <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt>
                      </v-avatar>
                      <v-text-field placeholder="Name" v-model="post.customer_name"></v-text-field>
                    </v-row>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="post.customer_address"
                      prepend-icon="mdi-map-marker"
                      placeholder="address"
                    >{{post.address}}</v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="post.contact_number"
                      type="tel"
                      prepend-icon="mdi-phone"
                      placeholder="+63 900 000 0000"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-menu
                      ref="updateDateMenu"
                      v-model="updateDateMenu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="post.delivery_date"
                          label="Picker in menu"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="post.delivery_date"
                        color="deep-purple lighten-1"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="post.order_quantity"
                      prepend-icon="mdi-plus"
                      min="1"
                      type="number"
                      placeholder="Quantity"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="editDialog = false">Cancel</v-btn>
                <v-btn text @click=" updateItem()">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>       
    </v-card>
  </v-app>
</template>
<style>
.mr-2:hover {
  color: purple;
}

.headline {
  color: white;
}

.date-color {
  color: #00b300;
  font-weight: 900;
}
.validation {
  color: red;
}
.cancel {
  color: red;
  background-color: #00b300;
}
.order {
  color: #00b300;
}
</style>

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
import * as turf from '@turf/turf';
// import DefaultLocation from "../components/DefaultLocation.vue"

export default {
  name: "Order",
  components: {
    // DefaultLocation
  },
  data() {
    return {
      // accessToken:
      //   "pk.eyJ1IjoiamllbnhpeWEiLCJhIjoiY2tlaTM3d2VrMWcxczJybjc0cmZkamk3eiJ9.JzrYlG2kZ08Pkk24hvKDJw",
      deliveryDate: new Date().toISOString().substr(0, 10),
      addDateMenu: false,
      updateDateMenu: false,
        tabs: null,
      message: "",
      post: {},
      orders: [],
      msg: [],
      date2: new Date(),
      hover: false,
      date: new Date().toISOString().substr(0, 10),
      modal: false,
      dialog: false,
      editDialog: false,
      customerName: "",
      address: "San Alberto Carmelite Formation Center, Rosillos Rd, Nasipit, Talamban, Cebu City",
      coordinates: [],
      distance: 0,
      // country: 'Philippines',
      contactNumber: "",
      orderQuantity: "",
      orderStatus: "On order",
      search: "",
      dialog: false,
      headers: [
        {
          text: "Customer's Name",
          align: "start",
          sortable: false,
          value: "customer_name"
        },
        { text: "Contact Number", value: "contact_number" },
        { text: "Order Quantity", value: "order_quantity" },
        { text: "Address", value: "customer_address", sortable: false },
        { text: "Delivery Date", value: "delivery_date", sortable: false },
        { text: "Actions", value: "action", sortable: false },
        { text: "Status", value: "order_status" }
      ]
    };
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
    this.loadOrder();
    this.getCoordinates();
    setInterval(this.loadOrder(), 3000);
  },
  methods: {
    getColor(status) {
      if (status === "Canceled") return "orange";
      else if (status === "On order") return "green";
      else return "green";
    },
    showDialog() {
      this.reloadData();
      this.dialog = !this.dialog;
    },

    updateItem() {
      if (
        this.post.customer_name === "" ||
        this.post.customer_address === "" ||
        this.post.order_quantity === "" ||
        this.post.contact_number == ""
      ) {
        Swal.fire({
          title: "Please fill in all required field",
          icon: "warning",
          timer: 3000
        }),
          (this.editDialog = this.editDialog);
      } else {
        axios
          .post("http://127.0.0.1:8000/api/post/update", this.post)
          .then(response => {
            this.editDialog = false;
            Swal.fire({
              title: "Successfully Updated",
              icon: "success",
              timer: 3000
            }),
              this.loadOrder();
          });
      }
    },
    reloadData() {
      (this.customerName = ""),
        (this.address = ""),
        (this.contactNumber = ""),
        (this.orderQuantity = ""),
        (this.deliveryDate = new Date().toISOString().substr(0, 10)),
        this.loadOrder();
      this.getColor();
      this.$v.$reset();
    },
    updateDeliveredStatus() {
      axios
        .post("http://127.0.0.1:8000/api/post/update", this.post)
        .then(response => {
          this.loadOrder();
        });
    },

    loadOrder() {
      axios.get("http://127.0.0.1:8000/api/posts/order").then(response => {
        this.orders = response.data.data;
      });
    },
    deleteItem(item) {
      axios
        .put("http://127.0.0.1:8000/api/post/updateCanceledStat/" + item.id)
        .then(response => {
          this.loadOrder();
        });
    },
    editItem(item) {
      axios
        .get("http://127.0.0.1:8000/api/post/edit/" + item.id)
        .then(response => {
          this.post = response.data;
        });
    },
    alertCancel(item) {
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#CFD8D",
        cancelButtonText: "No",
        confirmButtonText: "Yes",
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          this.deleteItem(item);
          Swal.fire({
            title: "Canceled!",
            text: "Order is being canceled",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    },
    alertDelivered(item) {
      Swal.fire({
        title: "Are you sure item is being delivered?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#CFD8D",
        cancelButtonText: "No",
        confirmButtonText: "Yes",
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          this.deliveredItem(item);
        }
      });
    },
    addOrder() {
      this.$v.$touch();
      let param = {
        name: this.customerName,
        address: this.address,
        contactNumber: this.contactNumber,
        orderQuantity: parseInt(this.orderQuantity) * 1,
        deliveryDate: this.deliveryDate,
        orderStatus: this.orderStatus,
        longitude: this.coordinates[0],
        latitude: this.coordinates[1],
        distance: this.distance
      };
      axios
        .post("http://127.0.0.1:8000/api/post", param)
        .then(response => {
          Swal.fire({
            title: "Successfully Added",
            icon: "success",
            timer: 3000
          });
          this.reloadData();
          this.dialog = false;
        })
        .catch(response => {
          console.log(response);
        });
        // this.getCoordinates(this.address);
    },
    deliveredItem(item) {
      axios
        .put("http://127.0.0.1:8000/api/post/updateStat/" + item.id)
        .then(response => {
          Swal.fire({
            title: "Order is being delivered",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          }),
            this.loadOrder();
        });
    },
    getCoordinates() {
      axios
        .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.address}.json?limit=2&access_token=${this.accessToken}`)
        .then(response => {
          let res = JSON.stringify(response.data);
          let result = JSON.parse(res);
          //index 0 is the most relevant based on the mapbox geocoding documentatio
          this.coordinates = result.features[0].geometry.coordinates; 
         
          //turf.js
          var from_place = turf.point([123.921969, 10.329892]); 
          var to_place = turf.point(this.coordinates);
          var options = { units: "kilometers" };
          this.distance = turf.distance(from_place, to_place, options);
        });
    }
  }
};
</script>