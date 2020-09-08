<template>
  <v-app>
    <v-card id="cardtable" class="ma-5 mb-12 pa-5">
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
          <v-btn
            class="ma-5"
            color="purple darken-2"
            rounded
            outlined
            dark
            @click="dialog = !dialog"
          >
            <v-icon>mdi-plus</v-icon>
            <v-toolbar-title>Add Order</v-toolbar-title>
          </v-btn>
        </v-list>
        <v-dialog v-model="dialog" width="400px">
          <v-card>
            <v-spacer></v-spacer>
            <v-card-title class="deep-purple lighten-3 align-center">Add Order</v-card-title>
            <v-container>
              <v-row class="mx-2">
                <v-col class="align-center justify-space-between" cols="12">
                  <v-row align="center" class="mr-0">
                    <v-avatar size="40px" class="mx-3">
                      <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt>
                    </v-avatar>
                    <v-text-field placeholder="Name"></v-text-field>
                  </v-row>
                </v-col>

                <v-col cols="12">
                  <v-text-field prepend-icon="mdi-map-marker" placeholder="Address"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field type="tel" prepend-icon="mdi-phone" placeholder="+63 900 000 0000"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="date"
                    persistent
                    lazy
                    full-width
                    width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="date"
                        label="Picker in dialog"
                        prepend-icon="mdi-calendar-plus"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>
                <v-col cols="12">
                  <v-text-field
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
              <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
              <v-btn text @click="dialog = false">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <template v-bind:class="desserts">
          <v-dialog v-model="editDialog" width="400px">
            <v-card>
              <v-spacer></v-spacer>
              <v-card-title class="deep-purple lighten-3 align-center">Update order</v-card-title>
              <v-container>
                <v-row class="mx-2">
                  <v-col class="align-center justify-space-between" cols="12">
                    <v-row align="center" class="mr-0">
                      <v-avatar size="40px" class="mx-3">
                        <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt>
                      </v-avatar>
                      <v-text-field placeholder="Name" v-model="updateName"></v-text-field>
                    </v-row>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="updateAddress"
                      prepend-icon="mdi-map-marker"
                      placeholder="address"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="updateContact"
                      type="tel"
                      prepend-icon="mdi-phone"
                      placeholder="+63 900 000 0000"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-dialog
                      ref="dialog"
                      v-model="modal"
                      :return-value.sync="date"
                      persistent
                      lazy
                      full-width
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="date"
                          label="Picker in dialog"
                          prepend-icon="mdi-calendar-plus"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="updateQuantity"
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
                <v-btn text @click="editDialog = false">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-card-title>

      <v-data-table :headers="headers" :items="desserts" :search="search">
        <template v-slot:item.action="{ item }">
          <v-icon
            normal
            @click="deleteItem(item)"
            class="mr-2"
            v-b-popover.hover.top
            title="Delivered"
          >mdi-truck-check-outline</v-icon>
          <v-icon
            @click="editDialog = !editDialog,editItem(item) "
            class="mr-2"
            normal
            v-b-popover.hover.top
            title="Edit"
          >mdi-table-edit</v-icon>
          <v-icon
            normal
            @click="deleteItem(item)"
            class="mr-2"
            v-b-popover.hover.top
            title="Cancel"
          >mdi-cancel</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-app>
</template>
<style>
.mr-2:hover {
  color: purple;
}
</style>

<script>
import Swal from "sweetalert2";
export default {
  name: "Order",

  methods: {
    deleteItem(item) {
      console.log(item);
    },
    editItem(item) {
      this.updateName = item.name;
      this.updateContact = item.contact;
      this.updateAddress = item.address;
      this.updateQuantity = item.orderQuantity;
      console.log(item.contact);
    },
    alertDelete(item) {
      Swal.fire({
        title: "Are you sure?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "primary",
        confirmButtonText: "Delete",
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          this.deleteItem(item);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            type: "success",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    }
  },
  components: {},
  data() {
    return {
      hover: false,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      editDialog: false,
      menu2: false,
      search: "",
      updateContact: "",
      updateQuantity: "",
      updateName: "",
      updateAddress: "",
      dialog: false,
      headers: [
        {
          text: "Customer's Name",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Contact Number", value: "contact" },
        { text: "Order Quantity", value: "orderQuantity" },
        { text: "Address", value: "address", sortable: false },
        { text: "Actions", value: "action", sortable: false },
        { text: "Status", value: "status" }
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          contact: 159,
          address: "Talamban",
          orderQuantity: 6.0,
          status: "Order"
        },
        {
          name: "Ice cream sandwich",
          contact: 237,
          address: "Talamban",
          orderQuantity: 9.0,
          status: "Order"
        },
        {
          name: "Eclair",
          contact: 262,
          address: "Talamban",
          orderQuantity: 16.0,
          status: "Order"
        },
        {
          name: "Cupcake",
          contact: 305,
          address: "Talamban",
          orderQuantity: 3.7,
          status: "Order"
        },
        {
          name: "Gingerbread",
          contact: 356,
          address: "Talamban",
          orderQuantity: 16.0,
          status: "Order"
        },
        {
          name: "Jelly bean",
          contact: 375,
          address: "Talamban",
          orderQuantity: 0.0,
          status: "Order"
        },
        {
          name: "Lollipop",
          contact: 392,
          address: "Talamban",
          orderQuantity: 0.2,
          status: "Order"
        },
        {
          name: "Honeycomb",
          contact: 408,
          address: "Talamban",
          orderQuantity: 3.2,
          status: "Order"
        },
        {
          name: "Donut",
          contact: 452,
          address: "Talamban",
          orderQuantity: 25.0,
          status: "Order"
        },
        {
          name: "KitKat",
          contact: 518,
          address: "Talamban",
          orderQuantity: 26.0,
          status: "Order"
        }
      ]
    };
  }
};
</script>