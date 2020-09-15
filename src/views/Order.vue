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
            <v-card-title class="deep-purple lighten-1 align-center">

             <v-list-item-title
                    class="d-flex align-center justify-center  mx-auto headline"
                  >ADD ORDER</v-list-item-title>
            </v-card-title>
            <v-container>
              <v-row class="mx-2">
                <v-col class="align-center justify-space-between" cols="12">
                  <v-row align="center" class="mr-0">
                    <v-avatar size="40px" class="mx-3">
                      <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt>
                    </v-avatar>
                    <v-text-field placeholder="Name"  v-model="name"></v-text-field>
                  </v-row>
                </v-col>

                <v-col cols="12">
                  <v-text-field prepend-icon="mdi-map-marker" placeholder="Address" v-model="address"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field type="tel" prepend-icon="mdi-phone" placeholder="+63 900 000 0000"  v-model="contactNumber"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="date"
                    persistent
                  
                    full-width
                    width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="deliveryDate"
                        label="Picker in dialog"
                        prepend-icon="mdi-calendar-plus"
                        readonly
                        v-on="on"
                        type='date'
                      
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="deliveryDate" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" @click="modal = false">Cancel</v-btn>
                      <v-btn color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    prepend-icon="mdi-plus"
                    min="1"
                    type="number"
                    placeholder="Quantity"
                    v-model="orderQuantity"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="dialog = false, reloadData()">Cancel</v-btn>
              <v-btn text @click="dialog = false, addOrder()">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <template v-bind:class="desserts">
          <v-dialog v-model="editDialog" width="400px">
            <v-card>
              <v-spacer></v-spacer>
              
                <v-card-title class="deep-purple lighten-1 align-center">

             <v-list-item-title
                    class="d-flex align-center justify-center  mx-auto headline"
                  >ADD ORDER</v-list-item-title>
            </v-card-title>
              
              <v-container >
                <v-row class="mx-2">
                  <v-col class="align-center justify-space-between" cols="12">
                    <v-row align="center" class="mr-0">
                      <v-avatar size="40px" class="mx-3">
                        <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt>
                      </v-avatar>
                      <v-text-field placeholder="Name"  v-model="post.customersName"></v-text-field>
                    </v-row>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="post.address"
                      prepend-icon="mdi-map-marker"
                      placeholder="address"
                    >{{post.address}}</v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="post.contactNumber"
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
                      <template v-slot:activator="{ on }" >
                        <v-text-field
                          v-model="post.deliveryDate"
                          prepend-icon="mdi-calendar-plus"
                          readonly
                          type="date"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="post.deliveryDate"  scrollable>
                        <v-spacer></v-spacer>
                        <v-btn  color="primary" @click="modal = false">Cancel</v-btn>
                        <v-btn color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="post.orderQuantity"
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
                <v-btn text @click="editDialog = false, updateItem()">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-card-title>
      <v-data-table :headers="headers" :items="orders" :search="search">
        <template v-slot:item.action="{ item }">
          <v-icon
            normal
            class="mr-2"
            title="Delivered"
            @click="deliveredItem(item)"
          >mdi-truck-check-outline</v-icon>
          <v-icon
            @click="editDialog = !editDialog, editItem(item) "
            class="mr-2"
            normal
            title="Edit"
          >mdi-table-edit</v-icon>
          <v-icon
            @click="alertDelete(item)"
            normal
            class="mr-2"
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

.headline{
  color:white
}

.date-color {
  color: #00B300;
  font-weight: 900;
}
</style>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import { setInterval } from 'timers';
export default {
  name: "Order",
  components: {},
  data() {
    return {
      post: {},
      orders:[],
      hover: false,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      editDialog: false,
      name:"",
      address:"",
      contactNumber:"",
      orderQuantity:"",
      deliveryDate:new Date().toISOString().substr(0, 10),
      orderStatus:"On order",
      menu2: false,
      search: "",
      dialog: false,
      headers: [
        {
          text: "Customer's Name",
          align: "start",
          sortable: false,
          value: 'customersName'
        },
        { text: "Contact Number", value: "contactNumber" },
        { text: "Order Quantity", value: "orderQuantity" },
        { text: "Address", value: "address", sortable: false },
        { text: "Delivery Date", value: "deliveryDate", sortable: false },
        { text: "Actions", value: "action", sortable: false },
        { text: "Status", value: "orderStatus" }
      ],
    };
  },
  created() {
      this.loadOrder();
      setInterval(this.loadOrder(),3000)
    },

  methods: {
    updateItem(){
        axios.post('http://127.0.0.1:8000/api/post/update', this.post).then((response) => {
        console.log(this.post.orderStatus)
        Swal.fire({
        title: "Successfully Updated",
        icon: "success",
        timer: 3000
      }),
        this.loadOrder()
      })
      
    },
    reloadData(){
        this.name="",
        this.address="",
        this.contactNumber="",
        this.orderQuantity="",
        this.deliveryDate=new Date().toISOString().substr(0, 10),
        this.loadOrder();
    },
  
    updateDeliveredStatus(){
      axios.post('http://127.0.0.1:8000/api/post/update', this.post).then((response) => {
        this.loadOrder()
      })
    },
  
    loadOrder(){
      axios.get('http://127.0.0.1:8000/api/posts/order').then(response => {
        this.orders = response.data.data
}
      )
     
    },
    deleteItem(item) {
      axios.delete('http://127.0.0.1:8000/api/post/delete/'+ item.id).then((response)=> {
        this.loadOrder()
      });
      
    },
    editItem(item) {
        axios.get('http://127.0.0.1:8000/api/post/edit/'+ item.id).then((response) => {
            this.post = response.data;  
        });
    },
    alertDelete(item) {
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#CFD8D",
        cancelButtonText:"No",
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
    addOrder(){
      let param = {
        name:this.name,
        address:this.address,
        contactNumber:this.contactNumber,
        orderQuantity:parseInt(this.orderQuantity)*1,
        deliveryDate:this.deliveryDate,
        orderStatus:this.orderStatus
      }
  
      axios.post('http://127.0.0.1:8000/api/post',param)
      .then(()=>{
        Swal.fire({
        title: "Successfully Added",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      }),
          this.name="",
          this.address="",
          this.contactNumber="",
          this.orderQuantity="",
          this.deliveryDate=new Date().toISOString().substr(0, 10),
          this.loadOrder();
      });

  },
  deliveredItem(item){
   axios.put('http://127.0.0.1:8000/api/post/updateStat/'+ item.id).then((response) => {
     this.loadOrder();
        });

  }
  },
  
};
</script>