<template>
<div>
    <v-card id="cardtable" class="ma-5 mb-12 pa-5">
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
            @click="showDialog"
          >
            <v-icon>mdi-plus</v-icon>
            <v-toolbar-title>Add Estimated Value</v-toolbar-title>
          </v-btn>
          <template>
          <v-dialog v-model="addDialog" width="400px">
        <v-card
 
      >
    <v-card-title>
      Your ube halayas ingredients
    </v-card-title>

    <v-card-subtitle>
      Update your estimated ingredients value
    </v-card-subtitle>
    <v-divider></v-divider>
    <v-col cols="12">
    <v-text-field
      label="Added Ingredients"
      :rules="rules"
      hide-details="auto"
      v-model="addedIngredientsName"
      outlined
    >
    </v-text-field>
   </v-col>
   <v-col cols="12">
                <v-text-field
      label="Estimated Amount"
      :rules="rules"
      hide-details="auto"
      v-model="addedEstimatedAmount"
      outlined
    >
    </v-text-field>
   </v-col>
      <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="addDialog = false">Cancel</v-btn>
              <v-btn text @click="addEstimatedValue">Save</v-btn>
            </v-card-actions>
          </v-card> 
          </v-dialog>
              <v-data-table :headers="headers" :items="estimatedValue" :search="search">
              <template v-slot:item.action="{ item }" >
                <v-icon
                  @click="editDialog = !editDialog, editEstimatedValue(item) "
                  class="mr-2"
                  normal
                  title="Edit"
                >mdi-table-edit</v-icon>
              </template>
            </v-data-table>
   
    
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
                      prepend-icon="mdi-map-marker"
                      placeholder="address"
                      v-bind:disabled="disabled"
                    ></v-text-field>
                  </v-col>
                   <v-col cols="12">
                    <v-text-field
                    v-model="editValue.ingredients_need_amount"
                    prepend-icon="mdi-map-marker"
               
                    ></v-text-field>
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
        </template>
      </v-card-title>
     </v-card>
</div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
  export default {
    name: "BusinessSetting",
    data: () => ({
      addedEstimatedAmount:'',
      addedIngredientsName:'',
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
        { text: "Actions", value: "action", sortable: false },
      
       
      ],
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

      addEstimatedValue(){
        let param ={
          ingredientsName:this.addedIngredientsName,
          ingredientsEstimatedAmount:this.addedEstimatedAmount
        }
        axios.post("http://127.0.0.1:8000/api/post/neededValue",param).then(response=>{
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
    
    }
  }
</script>
