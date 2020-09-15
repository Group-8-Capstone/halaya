<template>
  <v-card class="ma-5 mb-12 pa-5">
    <v-card-title>
      Delivery
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    ></v-data-table>
  </v-card>
 
</template>

<script>
  export default {
    name: "Delivery",
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Contact Number', value: 'calories' },
          { text: 'Adress', value: 'fat' },
          
          { text: 'Quantity Order', value: 'carbs' },
          
        ],
        desserts: [
          {
            name: 'Mary Jane Paller',
            calories: 159,
            fat: 'Nasipit',
            carbs: 24,
            
          },
          {
            name: 'Jessa Jalandoni',
            calories: 237,
            fat: 'Banilad',
            carbs: 37,
          
          },
          {
            name: 'Princess ',
            calories: 262,
            fat: 'Banilad',
            carbs: 23,
         
          },
          {
            name: 'Grace',
            calories: 305,
            fat: 'Apas',
            carbs: 67,
        
          },
    
        ],
      }
    },
  }
</script>