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
    <v-card-title>
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
              <v-btn text color="primary" @click="addDialog = false">Cancel</v-btn>
              <v-btn text @click="addEstimatedValue">Save</v-btn>
            </v-card-actions>
          </v-card> 
          </v-dialog>
           </v-card-title>
              <v-data-table :headers="headers" :items="estimatedValue" :search="search">
              <template v-slot:item.action="{ item }" >
                <v-icon
                  @click="editDialog = !editDialog, editEstimatedValue(item) "
                  normal
                  title="Edit"
                >mdi-table-edit</v-icon>
              </template>
            </v-data-table>
            </v-tab-item>
            <v-tab-item>
              <v-btn>Add Product</v-btn>
              <v-card>
                 <div class="modal-body">
                         <form @submit="formSubmitProduct" enctype="multipart/form-data" action>
                            <div class="form-group">
                                <label for="addOns">Product</label>
                            </div>
                            <div class="form-group">
                                <center>
                                    <img class="addOnsImage" :src="imageURL"><br>
                                    <input type="file" class="fileStyle" v-on:change="onImageChange"><br>
                                </center>
                            </div>
                            <div style="text-align: right">
                                <button type="button" class="btn btn-secondary" @click="hide()">Close</button>
                                <button type="submit" class="btn btn-primary">Add Category</button>
                            </div>
                        </form>
                    </div>
              </v-card>
            </v-tab-item>
    </v-tabs-items>
          <v-dialog v-model="editDialog" width="400px">
            <v-card>
              <v-spacer></v-spacer>
                <v-card-title class="deep-purple lighten-1 align-center">
             <v-list-item-title
                    class="d-flex align-center justify-center  mx-auto headline"
                  >UPDATE ESTIMATED VALUE</v-list-item-title>
            </v-card-title>  
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
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="editDialog = false">Cancel</v-btn>
                <v-btn text @click="updateEstimatedValue()">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
     </v-card>
</div>
</template>
<style>
.addOnsImage{
    width: 250px !important; 
    height: 250px !important; 
    margin-top: 2% !important; 
}
.fileStyle{
    font-size: 17px !important;
    width: 97px;
    margin-top: 3%;
    margin-bottom: 3%;
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
      imageURL: null,
      tabs:null,
      img:null,
      addedCategory:'',
      estimatedValue:[],
      search:'',
      editDialog:false,
      addDialog:false,
      editValue: [],
      headers: [
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
      setInterval(this.fetchEstimatedValue(),3000)
    
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
        formSubmitProduct(e) {
            if (this.img !== null && this.prodType !== null && this.productName !== null && this.lowPrice !== null && this.highPrice !== null && this.overPrice !== null && this.onlinelowPrice !== null && this.onlinehighPrice !== null & this.onlineoverPrice !== null){
                e.preventDefault();
                let currentObj = this;
                const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }
                let formData = new FormData();
                formData.append('image', this.img)
                axios.post('/formSubmit', formData, config).then(function (response) {
                    currentObj.success = response.data.success
                })
                .catch(function (error) {
                    currentObj.output = error;
                });
            }else{
                this.errorMessage = 'All fields are required!'
            }
        },
    
    }
  }
</script>
