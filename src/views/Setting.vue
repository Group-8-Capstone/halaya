<template>

        <v-card
    class="mx-auto ma-15 "
    max-width="500"
  >

    <v-card-title>
      Your ube halayas ingredients
    </v-card-title>

    <v-card-subtitle>
      Update your estimated ingredients value
    </v-card-subtitle>

    <v-divider></v-divider>
     <v-row class=" ma-5">
          <v-layout>
       <v-spacer></v-spacer>
        <v-btn  color="primary" v-bind:disabled="btnDisabled" outlined @click="editAmount()" class="ma-3" >Update</v-btn>
    </v-layout>
            <v-col cols="12">
                <v-text-field
      label="Ube Amount in kilograms"
      :rules="rules"
      hide-details="auto"
      v-model="ube"
     v-bind:disabled="disabled"
      
      value="good"
      outlined
    >
    </v-text-field>
   </v-col>
    <v-col cols="12">
    <v-text-field
      label="Condensed Milk number of cans"
      :rules="rules"
      hide-details="auto"
      v-bind:disabled="disabled"
      v-model="condensed"
      outlined
    >
</v-text-field>
        </v-col>
            <v-col cols="12">
    <v-text-field
      label="Evaporated Milk number of cans"
      :rules="rules"
      hide-details="auto"
      v-bind:disabled="disabled"
      v-model="evap"
      outlined
    >
    </v-text-field>
     </v-col>
     <v-col cols="12">

    <v-text-field
      label="Butter Amount"
      :rules="rules"
      hide-details="auto"
       v-bind:disabled="disabled"
       v-model="butter"
        outlined
    >
    </v-text-field>
     </v-col>
     <v-col cols="12">
    <v-text-field
      label="Sugar Amount"
      :rules="rules"
      hide-details="auto"
      v-bind:disabled="disabled"
      v-model="sugar"
      outlined
    >
    </v-text-field>
            </v-col>
             <v-layout align-center justify-center>
            <v-flex xs6>
                  <v-btn class=" ma-5" v-on:click="saveChanges"
                   v-if="!isHidden" color="green" outlined >Save changes</v-btn>
            </v-flex>
        </v-layout>
     </v-row>
  </v-card> 
</template>

<script>
import axios from "axios";
  export default {
    name: "BusinessSetting",
    data: () => ({
      ube:'',
      condensed:'',
      evap:'',
      butter:'',
      sugar:'',
      ingNames: [],
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
    
    },
    created(){
      this.getIngredientsName();
    },
    methods: {
      editAmount(){
        console.log('good')
        this.disabled= false
        this.btnDisabled=true
        this.isHidden=false
      },
      getIngredientsName(){
        let nameArray = [];
        axios.get("http://127.0.0.1:8000/api/fetch/stock").then(response => {
          this.stocks = response.data;
          for (var i = 0; i < response.data.length; i++) {
            if (nameArray.includes(response.data[i].ingredients_name)) {
              console.log("good");
            } else {
              nameArray.push(response.data[i].ingredients_name);
              this.ingNames = nameArray;
            }
            continue;
          }
          console.log('names: ', nameArray)
        })
      },
      saveChanges(){
        let ingredientsAmount = {
          ingredientName: 'Ube',
          amount: this.ube
        }
        console.log('ingredients ream amount: ', ingredientsAmount)
        axios
          .post("http://127.0.0.1:8000/api/post/saveRealNumbers", )
            .then(response => {
              console.log('response: ', response.data);
        });
        console.log("saved")
        this.disabled= true
        this.btnDisabled=false
        this.isHidden = true

      }
    
    }
  }
</script>
