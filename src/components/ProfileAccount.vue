<template>

        <v-card
    class="mx-auto ma-15 "
    max-width="500"
  >
    <v-card-title>
      Account Setting
    </v-card-title>
    <v-divider></v-divider>
     <v-row class=" ma-5">
          <v-layout>
       <v-spacer></v-spacer>
        <v-btn  color="primary" v-bind:disabled="btnDisabled" outlined @click="editAmount()" class="ma-3" >Update</v-btn>
    </v-layout>
            <v-col cols="12">
                <v-text-field
      label="Username"
      :rules="rules"
      hide-details="auto"
     v-bind:disabled="disabled"
      v-model="text"
      value="good"
      outlined
    >
    </v-text-field>
   </v-col>
    <v-col cols="12">
    <v-text-field
      label="Password"
      :rules="rules"
      hide-details="auto"
       v-bind:disabled="disabled"
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

    methods: {
      editAmount(){
        console.log('good')
        this.disabled= false
        this.btnDisabled=true
        this.isHidden=false
      },

      saveChanges(){
        this.disabled= true
        this.btnDisabled=false
        this.isHidden = true

      }
    
    }
  }
</script>

