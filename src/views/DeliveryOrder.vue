<template>
  <div>
    <v-card class="ma-5 mb-12 pa-5">
      <v-card-title>
        Deliveries for TODAY
        <v-spacer></v-spacer>
        <!-- <input type="text" class="form-control" v-model="searchQuery" placeholder="Search"> -->
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <template>
        <v-dialog v-model="orderDetails" persistent max-width="500px">
          <v-card>
            <v-card-title>
              <span>Order Details</span>
            </v-card-title>
            <hr>
            <v-spacer></v-spacer>
          </v-card>
        </v-dialog>
      </template>
      <template v-if="isAdmin() === true">
        <v-data-table :headers="headers" :items="deliveries" :search="search">
          <template v-slot:item.order_status="{ item }">
            <v-chip :color="getColor(item.order_status)" dark>{{ item.order_status }}</v-chip>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon
            disabled
              normal
              class="mr-2"
              title="Delivered"
              @click="alertDelivered(item)"
            >mdi-truck-check-outline</v-icon>
            <v-icon
            disabled
              @click="editDialog = !editDialog, editItem(item) "
              class="mr-2"
              normal
              title="Edit"
            >mdi-table-edit</v-icon>
            <v-icon disabled @click="alertCancel(item)" normal class="mr-2" title="Cancel">mdi-cancel</v-icon>
          </template>
        </v-data-table>
      </template>
      <template v-if="isDriver() === true">
        <v-data-table :headers="headers" :items="deliveries" :search="search">
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
      </template>

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
                    <v-text-field placeholder="Name" v-model="post.receiver_name"></v-text-field>
                  </v-row>
                </v-col>
                <!-- <v-col cols="12">
                  <v-text-field
                    v-model="post.customer_address"
                    prepend-icon="mdi-map-marker"
                    placeholder="address"
                  ></v-text-field>
                </v-col> -->
                <label>Address</label>
                <v-row class="pl-5">
                  <v-col cols="6">
                    <v-text-field
                      v-model="post.building_or_street"
                      label="Building Name/Street"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="post.barangay"
                      label="Barangay"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="pl-5">
                  <v-col cols="6">
                    <v-text-field
                      v-model="post.city_or_municipality"
                      label="Municipality/City"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="post.province"
                      label="Province"
                    ></v-text-field>
                  </v-col>
                </v-row>
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
                        v-model="post.preferred_delivery_date"
                        label="Picker in menu"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="post.preferred_delivery_date"
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
                    v-model="post.ubeHalayaJar_qty"
                    prepend-icon="mdi-plus"
                    min="1"
                    type="number"
                    placeholder="Quantity"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="post.ubeHalayaTub_qty"
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
  </div>
</template>

<script>
import axios from "axios";
import { connect } from "tls";
import * as turf from "@turf/turf";
import Swal from "sweetalert2";
export default {
  name: "Delivery",
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoiamllbnhpeWEiLCJhIjoiY2tlaTM3d2VrMWcxczJybjc0cmZkamk3eiJ9.JzrYlG2kZ08Pkk24hvKDJw",
      delivery: [],
      deliveries: [],
      updateDateMenu: false,
      orders: [],
      address: "",
      coordinates: [],
      distance: [],
      // dist: 0,
      post:{},
      addresses: [],
      orderedProducts: [],
      editDialog: false,
      orderDetails: false,
      searchQuery: null,
      date: new Date().toISOString().substr(0, 10),
      barangay_array: [],
      search: "",
      headers: [
        {
          text: "Receiver Name",
          align: "start",
          value: "receiver_name",
          sortable: false
        },
        { text: "Address", value: "customer_address", sortable: false },
        { text: "Distance", value: "distance", sortable: false },
        {
          text: "Delivery Date",
          value: "preferred_delivery_date",
          sortable: false
        },
        {
          text: "Ube Halaya Jar Qty",
          value: "ubeHalayaJar_qty",
          sortable: false
        },
        { text: "Ubechi Qty", value: "ubeHalayaTub_qty", sortable: false },
        { text: "Action", value: "action", sortable: false },
        { text: "Order Status", value: "order_status", sortable: false }
        // { text: "Actions", value: "action", sortable: false },
        // { text: "Status", value: "order_status" }
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
    this.fetchDelivery();
    this.dataGrouping();
    // this.loadOrder();
    // this.fetchOrders();
    // this.loadDelivery();
    // this.getCoordinates();
    // setInterval(this.loadDelivery(), 3000);
  },
  // computed: {
  //   resultQuery() {
  //     if (this.searchQuery) {
  //       return this.deliveries.filter(item => {
  //         console.log("NISSSSUUUUUUUUD");
  //         return this.searchQuery.toLowerCase().split(' ').forEach(v => item.delivery_address.toLowerCase().includes(v));
  //       });
  //     } else {
  //       return this.deliveries;
  //     }
  //   }
  // },

  methods: {
    getColor(status) {
      if (status === "Canceled") return "orange";
      else if (status === "On order") return "blue";
      else return "green";
    },
    searchDelivery() {
      console.log("NISUUUUUUUUUUUUUUUUUUUUUUUD");
      if (this.searchQuery) {
        console.log("HEEEEEEEEEEEEEERRRRRRRRREEEEEEEEE");
        this.deliveries.filter(item => {
          this.searchQuery
            .toLowerCase()
            .split(" ")
            .every(v => item.delivery_address.toLowerCase().includes(v));
        });
        return this.deliveries;
      } else {
        return this.deliveries;
      }
    },
    closeDialog() {
      this.orderDetails = false;
      this.orderedProducts = [];
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
          // this.saveDeliveredOrder(item);
        }
      });
    },
    updateItem() {
      if (
        this.post.receiver_name === "" ||
        // this.post.customer_address === "" ||
        this.post.building_or_street === "" ||
        this.post.barangay === "" ||
        this.post.city_or_municipality === "" ||
        this.post.province === "" ||
        this.post.ubeHalayaJar_qty === "" ||
        this.post.preferred_delivery_date === "" ||
        this.post.ubehalayaTub_qty == ""
      ) {
        Swal.fire({
          title: "Please fill in all required field",
          icon: "warning",
          timer: 3000
        }),
          (this.editDialog = this.editDialog);
      } else {
        // console.log('###########', this.post)
        axios
          .post(this.url+"/post/update", this.post, this.config)
          .then(response => {
            this.editDialog = false;
            Swal.fire({
              title: "Successfully Updated",
              icon: "success",
              timer: 3000
            }),
              this.fetchDelivery();
          });
      }
    },
    editItem(item) {
      axios
        .get(this.url+"/post/edit/" + item.id, this.config)
        .then(response => {
          this.post = response.data;
        });
    },
    deliveredItem(item) {
      // console.log("================ ", this.config)
      axios
        .post(
          this.url+"/post/updateStat/" + item.id,
          {},
          this.config
        )
        .then(response => {
          console.log("-----------", response.data);
          Swal.fire({
            title: "Order is being delivered",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          }),
            this.fetchDelivery();
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
    deleteItem(item) {
      axios
        .post(
          this.url+"/post/updateCanceledStat/" + item.id,
          {},
          this.config
        )
        .then(response => {
          this.fetchDelivery();
        });
    },
    orderedProduct(id) {
      this.orderDetails = true;
      for (var i = 0; i < this.deliveries.length; i++) {
        if (id == this.deliveries[i].id) {
          for (var j = 0; j < this.deliveries[i].products.length; j++) {
            this.orderedProducts.push(this.deliveries[i].products[j]);
            // this.orderedProducts.push(this.orders[i].products[j].product_name)
            // this.orderedProducts.push(this.orders[i].products[j].pivot.sub_quantity)
          }
        }
      }
      console.log("orderedProducts: ", this.orderedProducts);
    },
    containsObject(arr, id) {
      return arr.some(function(el) {
        return el.id === id;
      });
    },
    fetchDelivery() {
      axios
        .get(this.url+"/posts/delivery", this.config)
        .then(response => {
          // let results = [];
          this.deliveries = response.data.data;
          for (var i = 0; i < this.deliveries.length; i++) {
            var street = response.data.data[i].building_or_street;
            var barangay = response.data.data[i].barangay;
            var city = response.data.data[i].city_or_municipality;
            var province = response.data.data[i].province;
            var place = street
              .toString()
              .concat(
                " ",
                barangay.toString(),
                " ",
                city.toString(),
                " ",
                province.toString()
              );
            this.deliveries[i]["customer_address"] = place;
          }
          // console.log("data: ", this.deliveries);
          // for (var i = 0; i < data.length; i++) {
          //   // console.log("DATA", data[i].id);
          //   if (this.containsObject(results, data[i].id)) {
          //     console.log("good");
          //   } else {
          //     results.push(data[i]);
          //     // console.log("RESULTS", results);
          //     this.deliveries = results;
          //     // console.log("deliveries: ", this.deliveries);
          //   }
          // continue;
          // }
        });
      // .then(response => {
      //   this.deliveries = response.data;
      //   console.log("ORDERS", response.data);
      //   // console.log("order_status: ", this.orders.data[0].order_status);
      // });
    },
    loadDelivery() {
      axios
        .get(
          this.url+"/orders/confirmed",
          this.config
        )
        .then(response => {
          this.delivery = response.data;

          function formatDate() {
            var d = new Date(),
              month = "" + (d.getMonth() + 1),
              day = "" + d.getDate(),
              year = d.getFullYear();

            if (month.length < 2) month = "0" + month;
            if (day.length < 2) day = "0" + day;

            return [year, month, day].join("-");
          }

          this.delivery.forEach(element => {
            var now = element.confirmed_delivery_date === "2020-10-27";
            //formatDate dapat na diha pero walay delivery for today so "2020-10-27" sa
            // console.log(now);
            // console.log(formatDate());
            if (now == true) {
              console.log("DATEDATE", element.confirmed_delivery_date);
              this.deliveries.push(element);
              this.deliveries.sort(function(a, b) {
                return a - b;
              });
              console.log("DELIVERIES", this.deliveries);
            }
          });
          this.deliveries.forEach(element => {
            console.log(element.delivery_address);
            this.addresses.push(element.delivery_address);
            console.log("ADDRESSES", this.addresses);
          });
          this.addresses.forEach(element => {
            console.log("ELEMENT", element);
            var addressIndex = this.addresses.indexOf(element);
            console.log("INDEX", addressIndex);
            var delAddress = this.addresses[addressIndex];
            console.log("_____INDEX", delAddress);
            axios
              .get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${delAddress}
        .json?limit=2&access_token=${this.accessToken}`
              )
              .then(response => {
                var res = JSON.stringify(response.data);
                var result = JSON.parse(res);
                console.log("/////////test////////", result);
                //index 0 is the most relevant based on the mapbox geocoding documentation
                this.newCoordinates = result.features[0].geometry.coordinates;
                //turf.js
                var from_place = turf.point([123.921969, 10.329892]);
                var to_place = turf.point(this.newCoordinates);
                console.log("ADDRESS:", to_place);
                var options = { units: "kilometers" };
                var initDistance = turf.distance(from_place, to_place, options);
                this.distance = initDistance;
                // this.distance.push(initDistance);
                // this.deliveries.forEach(element => {
                //   var distIndex = this.deliveries.indexOf(element);
                //   console.log("INDEX NI SIYA", distIndex);
                //   this.dist = this.distance[distIndex];
                //   console.log("MAO NI SIYA", this.dist);
                // });
                console.log("*******DISTANCE*******", this.distance);
                return this.distance;
                addressIndex++;
                console.log("????????INDEX", this.addressIndex);
              });
          });

          console.log("DATA:", this.delivery);
          console.log(
            "CATEGORY",
            this.delivery[0].products[0].pivot.sub_quantity
          );
          // var jars = 0;
          // this.delivery.forEach(element => {
          //   console.log("NISUD", element);
          //   let a = this.delivery.findIndex(element);
          //   console.log("INDEX", a);
          // });

          //   for (var x = 0; x < this.delivery[i].products.length; x++){
          //     if (this.delivery[i].prodects[i].category.name == "Ubechi"){
          //       jars = 5;
          //       var totaljars = this.sub_quantity * jars;
          //       console.log("JARS", this.totaljars);
          //     } else {
          //       jars = 1;
          //       totaljars = this.sub_quantity * jars;
          //       console.log("JARS", this.totaljars);
          //     }
          //   }
          // }
        })
        .catch(error => console.log(error));
    },
    dataGrouping() {
      axios
        .get(this.url+"/posts/delivery", this.config)
        .then(response => {
          var result = response.data.data;
          var templist = this.$_.groupBy(result, "barangay");
          this.barangay_array = Object.entries(templist);
          console.log("Barangay Array: ", this.barangay_array);
          for (var i = 0; i < this.barangay_array.length; i++) {
            console.log("testing...........", this.barangay_array[i]);
          }
        });
    },
    isAdmin() {
      if (localStorage.getItem("role") == "admin") {
        return true;
      }
    },
    isDriver() {
      if (localStorage.getItem("role") == "driver") {
        return true;
      }
    }
  }
};
</script>

<style>
.v-chip--clickable {
  pointer-events: none;
  cursor: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.container {
  padding: 1px;
}

#cardTitle {
  justify-content: center;
  font-size: 20px;
  padding: 1px;
}

#deliveryDetailsBtn {
  text-decoration: none;
  padding: 0px;
  color: black;
  width: 36 !important;
}

.v-card__actions {
  align-items: center;
  display: flex;
  padding: 0;
}
</style>