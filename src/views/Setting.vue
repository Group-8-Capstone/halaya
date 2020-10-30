<template>
<div>
    <v-card id="cardtable" class="ma-5 mb-12 pa-5">
      <v-tabs
        v-model="tabs"
        right
        color="deep-purple accent-4">
        <v-tab>Ingredients Value</v-tab>
         <v-tab>New Products</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabs">
      <v-tab-item>
      <v-card-title>
         <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
            <v-btn
            class="ma-5"
            color="purple darken-2"
            rounded
            outlined
            dark
            @click="showDialog">
            <v-icon>mdi-plus</v-icon>
            <v-toolbar-title>Add Estimated Value</v-toolbar-title>
          </v-btn>
          <v-dialog v-model="addDialog" width="400px">
        <v-card>
    <v-card-title class=" deep-purple--text">
       ESTIMATED INGREDIENTS VALUE
    </v-card-title>

    <v-card-subtitle>
      Please fill in the required information 
    </v-card-subtitle>
    <v-divider></v-divider>
    <v-col cols="12">
    <v-text-field
      color="purple"
      label="Added Ingredients"
      :error-messages="AddedIngredientsNameErrors"
      @input="$v.addedIngredientsName.$touch()"
      @blur="$v.addedIngredientsName.$touch()"
      required
      hide-details="auto"
      v-model="addedIngredientsName"
      outlined>
    </v-text-field>
   </v-col>
   <v-col cols="12">
    <v-text-field
      color="purple"
      label="Estimated Amount"
      :error-messages="AddedIngredientsValueErrors"
      @input="$v.addedEstimatedAmount.$touch()"
      @blur="$v.addedEstimatedAmount.$touch()"
      required
      hide-details="auto"
      v-model="addedEstimatedAmount"
      outlined></v-text-field>
   </v-col>
    <v-col cols="12">
    <v-select
          color="purple"
          :items="items"
          label="Product Category"
           v-model="addedCategory"
           :error-messages="addedCategoryErrors"
          @input="$v.addedCategory.$touch()"
          @blur="$v.addedCategory.$touch()"
          outlined
        ></v-select>
   </v-col>
      <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="orange" @click="addDialog = false">Cancel</v-btn>
              <v-btn text color="primary"  @click="addEstimatedValue">Save</v-btn>
            </v-card-actions>
          </v-card> 
          </v-dialog>
           </v-card-title>
              <v-data-table :headers="headersIngredients" :items="estimatedValue" :search="search">
              <template v-slot:item.action="{ item }" >
                <v-icon
                  @click="editDialog = !editDialog, editEstimatedValue(item) "
                  normal
                  title="Edit"
                >mdi-table-edit</v-icon>
                <v-icon
                class="mr-3"
                color="red"
                @click="alertDeleteIngredients(item)"
                normal
                title="Delete Product"
                >mdi-delete
                </v-icon>
              </template>
            </v-data-table>
            </v-tab-item>
            <v-tab-item>
               <v-card-title>
         <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
            <v-btn
            class="ma-5"
            color="purple darken-2"
            rounded
            outlined
            dark
            @click="addProductDialog=true, reloadProduct">
            <v-icon>mdi-plus</v-icon>
            <v-toolbar-title>Add Product</v-toolbar-title>
          </v-btn>
          </v-card-title>
            <!-- <v-btn @click="addProductDialog=true, reloadProduct">Add Product</v-btn> -->
            <v-data-table :headers="headersProduct" :items="displayProduct" :search="search">
                          <template  v-slot:item.image="{ item }" class="mt-2" >
                  <img :src="'http://localhost:8000/' + item.image" alt="" width="100" height="50">
              </template>
              <template v-slot:item.action="{ item }" >
                <v-icon
                
          
                @click="editProduct(item)"
                  normal
                  title="Edit"
                >mdi-table-edit
                </v-icon>
                <v-icon
                class="mr-3"
                color="red"
                @click="AlertDelete(item)"
                  normal
                  title="Delete Product"
                >mdi-delete
                </v-icon>
              </template>
            </v-data-table>
            <v-dialog  v-model="editProductDialog" width="400px">
                  <v-card>
                  <v-card-title class=" deep-purple--text">UPDATE PRODUCT</v-card-title>
                  <v-card-subtitle>
                    Please fill in the required information 
                  </v-card-subtitle>
                  <v-divider></v-divider>
                 <div class="modal-body">
                         <form @submit="updateProduct" enctype="multipart/form-data" action>
                            <div class="form-group">
                                  <v-col cols="12">
                                      <v-text-field outlined type="text" label="Product Name" color="purple" class="form-control"
                                       v-model="editProductName" required></v-text-field> 
                                  </v-col>
                                      <v-col cols="12">
                                        <center>
                                    <img class="addOnsImage" :src="editImageURL"><br>
                                    <input type="file" class="fileStyle" v-on:change="onImageEdit">
                                    <br>
                                  </center>
                           </v-col>
                            </div>
                             <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn type="button"  color="orange" text @click="editProductDialog=false" >Cancel</v-btn>
                      <v-btn type="submit"    text color="primary">Save</v-btn>
                      </v-card-actions>
                        </form>
                    </div>
              </v-card>
            </v-dialog>
              <v-dialog v-model="addProductDialog" width="400px">
              <v-card> 
                 <v-card-title class=" deep-purple--text">ADD PRODUCT</v-card-title>
                <v-card-subtitle>
                  Please fill in the required information 
                </v-card-subtitle>
                  <v-divider></v-divider>
                 <div class="modal-body">
                   
                         <form @submit="formSubmit" enctype="multipart/form-data" action>
                          <v-container>
                                  <v-col cols="12">
                                <v-text-field outlined
                                  type="text" color="purple"
                                class="form-control"
                                v-model="productName" 
                                label="Product Name"
                                required></v-text-field> 
                                  </v-col>
                                  <v-col cols=" 12" >
                                  <center>
                                    <img class="addOnsImage" :src="imageURL"><br>
                                    <input type="file" class="fileStyle" v-on:change="onImageChange">
                            </center>
                           </v-col>
                            </v-container>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn type="button" color="orange" text @click="addProductDialog=false">Cancel</v-btn>
                      <v-btn type="submit"  color="primary" text >Save</v-btn>
                      </v-card-actions>
                        </form>
                    </div>
              </v-card>
                </v-dialog>
            </v-tab-item>
        </v-tabs-items>
          <v-dialog v-model="editDialog" width="400px">
            <v-card>
      <v-card-title class="deep-purple--text">
       UPDATE ESTIMATED VALUE
    </v-card-title>
    <v-card-subtitle>
      Please fill in the required information 
    </v-card-subtitle>
    <v-divider></v-divider> 
              <v-container >
                <v-row class="mx-2">
                   <v-col cols="12">
                    <v-text-field
                      v-model="editValue.ingredients_name"
                      label="Ingredients Name"
                      v-bind:disabled="disabled"
                      outlined
                    ></v-text-field>
                  </v-col>
                   <v-col cols="12">
                    <v-text-field
                    label="Estimated Amount"
                     color="purple"
                    v-model="editValue.ingredients_need_amount"
                    outlined
                   ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                  <v-select
                        :items="items"
                        label="Product Category"
                        color="purple"
                        v-model="editValue.ingredients_category"
                        outlined
                  ></v-select>
                </v-col>
                </v-row>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="orange" @click="editDialog = false">Cancel</v-btn>
                <v-btn text color="primary" @click="updateEstimatedValue()">Save</v-btn>
              </v-card-actions>
                </v-container>
            </v-card>
          </v-dialog>
     </v-card>
</div>
</template>
<style>
.addOnsImage{
    width: 150px !important; 
    height: 150px !important; 
  
}
.fileStyle{
    font-size: 17px !important;
    width: 200px;
    margin-top: 3%;
    margin-bottom: 3%;
}
.imageview{
    width: 250px !important; 
    height: 250px !important; 
}

</style>

<script>
import { required, minLength, maxLength, between } from 'vuelidate/lib/validators'
import axios from "axios";
import Swal from "sweetalert2";
  export default {
    name: "BusinessSetting",
    data: () => ({
      addedEstimatedAmount:'',
      addedIngredientsName:'',
      addProductDialog:false,
      editProductDialog:false,
      productName:null,
      imageURL: null,
      editProductName:null,
      editImageURL:null,
      editImg:null,
      tabs:null,
      img:null,
      prodId:null,
      addedCategory:'',
      estimatedValue:[],
      displayProduct:[],
      search:'',
      editDialog:false,
      addDialog:false,
      editValue: [],
      headersIngredients: [
        {
          text: "Ingredient's Name",
          align: "start",
          sortable: false,
          value: 'ingredients_name'
        },
     { text: "Needed Value", value: "ingredients_need_amount" },
         { text: "Category", value: "ingredients_category" },
        { text: "Actions", value: "action", sortable: false },
      ],
        items: ['Ube Halaya', 'Butchi', 'Ice Cream'],
      rules: [
        value => !!value || 'Required.',
      ],
       headersProduct: [
        {
          text: "Product Name",
          align: "start",
          sortable: false,
          value: 'product_name'
        },
        { text: "Image", value: "image" },
        { text: "Actions", value: "action", sortable: false },
      ],
        items: ['Ube Halaya', 'Butchi', 'Ice Cream'],
      rules: [
        value => !!value || 'Required.',
      ],
      alignments: [
        'start',
        'center',
        'end',
      ],
     
      text: "",
      disabled: true,
      btnDisabled:false,
      isHidden: true

    }),
    validations: {
    addedIngredientsName: {
      required,
    },
    addedEstimatedAmount: {
      required,
    },
     addedCategory: {
      required,
    },
      },
      computed:{
      AddedIngredientsNameErrors () {
      const errors = []
      if (!this.$v.addedIngredientsName.$dirty) return errors
      !this.$v.addedIngredientsName.required && errors.push('Ingredients Name is required.')
      return errors
    },
    AddedIngredientsValueErrors () {
      const errors = []
      if (!this.$v.addedEstimatedAmount.$dirty) return errors
      !this.$v.addedEstimatedAmount.required && errors.push('Estimated Value is required.')
      return errors
    },
     addedCategoryErrors() {
      const errors = []
      if (!this.$v.addedCategory.$dirty) return errors
      !this.$v.addedCategory.required && errors.push('Category is required.')
      return errors
    },
},
    mounted() {
      this.fetchEstimatedValue();
      this. retrieveProduct();
      setInterval(this.fetchEstimatedValue(),3000)
      setInterval(this.retrieveProduct(),3000)
    
    },
    created(){ 
    },
    methods: {
      editAmount(){
        this.disabled= false
        this.btnDisabled=true
        this.isHidden=false
      },
       reloadData(){

        this.addedIngredientsName="",
        this.addedEstimatedAmount="",
        this.$v.$reset();
    },

    reloadProduct(){
        this.productName=null,
        this.imageURL= null
    },

      addEstimatedValue(){
         this.$v.$touch();
         var upperIngredientsName =
          this.addedIngredientsName.charAt(0).toUpperCase() +
          this.addedIngredientsName.slice(1).toLowerCase();
        let param ={
          ingredientsName:upperIngredientsName,
          ingredientsEstimatedAmount:this.addedEstimatedAmount,
          ingredientsCategory:this.addedCategory
        }
        axios.post("http://127.0.0.1:8000/api/post/neededValue",param).then(response=>{
        console.log(param)
        this.addDialog=false,
         Swal.fire({
        title: "Successfully Added",
        icon: "success",
        timer: 3000
      })
      this.fetchEstimatedValue()
    
        })
      },
      showDialog(){
        this.addDialog=true
        this.reloadData();
      },

      fetchEstimatedValue(){
        axios.get("http://127.0.0.1:8000/api/fetch/estimatedValue").then(response=>{
          this.estimatedValue=response.data;
          console.log(response.data);
        })
      },

      editEstimatedValue(item){
        axios.get("http://127.0.0.1:8000/api/post/updateEstimatedValue/"+item.id).then(response=>{
          this.editValue = response.data
          console.log(this.editValue)
        })

      },
       updateEstimatedValue(){
       if (this.editValue.ingredients_need_amount===""){
        Swal.fire({
        title: "Please fill in all required field",
        icon: "warning",
        timer: 3000
      }),
        this.editDialog=this.editDialog;
       }
       else{
        axios.post('http://127.0.0.1:8000/api/post/updateNewEstimatedValue', this.editValue).then(response => {
        console.log(this.editValue)
        this.editDialog=false;
        Swal.fire({
        title: "Successfully Updated",
        icon: "success",
        timer: 3000
      })
      this.fetchEstimatedValue();
        
        })
       }
       
    },
     onImageChange(e){
            this.image = e.target.files[0]
            this.imageURL = URL.createObjectURL(e.target.files[0])
        },
    onImageEdit(e){
            this.imageEdit = e.target.files[0]
            this.editImageURL = URL.createObjectURL(e.target.files[0])
        },
     formSubmit(e) {
            if(this.image !== null && this.productName !== null){
                e.preventDefault();
                let currentObj = this;
                const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }
                this.addProductDialog=false
                let formData = new FormData();
                formData.append('image', this.image)
                formData.append('productName', this.productName)
                axios.post('http://127.0.0.1:8000/api/post/product', formData, config).then(function (response) {
                    currentObj.success = response.data.success

                })
                .catch(function (error) {
                    currentObj.output = error;
                });
            }else{
                this.errorMessage = 'All fields are required!'
            }
                  this.retrieveProduct();

           
        },
    retrieveProduct() {
            axios.get('http://127.0.0.1:8000/api/fetch/product').then(response => {
                this.displayProduct = response.data.addProduct;
                console.log(response.data.addProduct)
            });
        },
     editProduct(item) {
       console.log(item)
       this.editProductDialog=true,
       this.editProductName=item.product_name
       this.editImageURL = 'http://localhost:8000/'+item.image
      this.prodId = item.id
    },
    updateProduct(e){
            if (this.imageEdit !== null  && this.editProductName !== null ){
              console.log(this.editImageURL);
                e.preventDefault();
                let currentObj = this;
                const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }
                this.editProductDialog=false
                let formData = new FormData();
                formData.append('id', this.prodId)
                formData.append('image', this.imageEdit)
                formData.append('productName', this.editProductName)
                axios.post('http://127.0.0.1:8000/api/post/updateProduct', formData, config)
                .then(function (response) {
                    currentObj.success = response.data.success
                })
                .catch(function (error) {
                    currentObj.output = error;
                });
            }else{
                this.errorMessage = 'All fields are required!'
            }
            this.retrieveProduct();
        },

      deleteProduct(item){
          axios.delete('http://127.0.0.1:8000/api/softDeleteProduct/'+item.id).then(response => {
          this.retrieveProduct();
        });

        },

        deleteStockProduct(item){
          axios.delete('http://127.0.0.1:8000/api/softDeleteStockProduct/'+item.id).then(response => {
          this.retrieveProduct();
        });

        },
        deleteStockIngredients(item){
          axios.delete('http://127.0.0.1:8000/api/softDeleteStockIngredients/'+item.id).then(response => {
        });

        },
         deleteIngredients(item){
          axios.delete('http://127.0.0.1:8000/api/softDeleteIngredients/'+item.id).then(response => {
          this.fetchEstimatedValue();
        });
        },
      AlertDelete(item) {
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
          this.deleteProduct(item);
          this.deleteStockProduct(item);
          Swal.fire({
            title: "Deleted!",
            text: "Product is being deleted",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    },
    alertDeleteIngredients(item) {
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
          this.deleteIngredients(item);
          this.deleteStockIngredients(item);
          Swal.fire({
            title: "Deleted!",
            text: "Product is being deleted",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    },
  
    }
  }
</script>
