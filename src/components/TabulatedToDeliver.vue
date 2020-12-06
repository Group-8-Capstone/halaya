<template>
  <div>
    <!-- <v-btn outlined float-right small color="purple">
        <v-icon>mdi-download</v-icon>Export as PDF
    </v-btn>-->

    <div>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn outlined small color="purple" v-bind="attrs" v-on="on">
            <v-icon>mdi-download</v-icon>Export
          </v-btn>
        </template>
        <v-list>
          <v-col>
            <OrderToDeliverPdf :headers="headers" :records="todelivered"></OrderToDeliverPdf>
            <div>
              <v-btn class="float-right mr-5" text small>Export as CSV</v-btn>
            </div>
          </v-col>
        </v-list>
      </v-menu>
    </div>

    <v-card flat>
      <br>
      <v-data-table
        :headers="headers"
        :items="todelivered"
        :items-per-page="10"
        class="elevation-1"
      >
        <template v-slot:item.preferred_delivery_date="{ item }">
          <span>{{new Date(item.preferred_delivery_date).toISOString().substring(0,10)}}</span>
        </template>
        <template v-slot:item.contact_number="{ item }">
          <span>{{'0'+item.contact_number}}</span>
        </template>
        <template v-slot:item.order_status="{ item }">
          <v-chip :color="getColor(item.order_status)" dark>{{ item.order_status }}</v-chip>
        </template>
        <template v-slot:item.action="{ item }">
          <div v-if="isCanceled(item) === true || isDelivered(item) === true">
            <v-icon
              disabled
              normal
              class="mr-2"
              title="Confirm Order"
              @click="confirmOrder(item)"
            >mdi mdi-checkbox-marked-outline</v-icon>
            <v-icon
              disabled
              @click="alertCancel(item)"
              normal
              class="mr-2"
              title="Cancel"
            >mdi-cancel</v-icon>
          </div>
          <div v-else>
            <v-icon
              normal
              class="mr-2"
              title="Confirm Order"
              @click="confirmOrder(item)"
            >mdi mdi-checkbox-marked-outline</v-icon>
            <v-icon @click="alertCancel(item)" normal class="mr-2" title="Cancel">mdi-cancel</v-icon>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import OrderToDeliverPdf from "./OrderToDeliverPdf.vue";
export default {
  components: { OrderToDeliverPdf },
  data() {
    return {
      todelivered: [],
      dropdown: [{ title: "Download as PDF" }, { title: "Download as CSV" }],
      headers: [
        {
          text: "Receiver Name",
          align: "start",
          sortable: false,
          value: "receiver_name"
        },
        { text: "Address", value: "customer_address", sortable: false },
        { text: "Mobile Number", value: "contact_number", sortable: false },
        { text: "Distance", value: "distance" },
        {
          text: "Delivery Date",
          value: "preferred_delivery_date",
          sortable: false
        },
        {
          text: "Ube Halaya Jar(Quantity)",
          value: "ubehalayajar_qty",
          sortable: false
        },
        {
          text: "Ube Halaya Tub(Quantity)",
          value: "ubehalayatub_qty",
          sortable: false
        },
        {
          text: "Total Item",
          value: "total_item",
          sortable: false
        },
        {
          text: "Total Payment",
          value: "total_payment",
          sortable: false
        },
        { text: "Actions", value: "action", sortable: false },
        { text: "Status", value: "order_status" }
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
  },
  created() {
    this.getToDelivered();
  },
  methods: {
    getColor(status) {
      if (status === "Canceled") return "orange";
      else if (status === "On order") return "blue";
      else return "green";
    },
    getToDelivered() {
      axios
        .get(this.url + "/api/posts/delivery", this.config)
        .then(response => {
          this.todelivered = response.data.data;

          this.todelivered.forEach((order, index) => {
            let {
              building_or_street,
              barangay,
              city_or_municipality,
              province,
              ubehalayajar_qty,
              ubehalayatub_qty
            } = order;
            var place = building_or_street
              .toString()
              .concat(" ", barangay, " ", city_or_municipality, " ", province);
            this.todelivered[index]["customer_address"] = place;
            this.todelivered[index]["total_item"] =
              ubehalayatub_qty + ubehalayajar_qty;
          });
        });
    },
    isCanceled(item) {
      if (item.order_status == "Canceled") {
        return true;
      }
    },
    isDelivered(item) {
      if (item.order_status == "Delivered") {
        return true;
      }
    }
  }
};
</script>
