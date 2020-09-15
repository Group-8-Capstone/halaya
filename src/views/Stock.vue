<template>
  <v-card class="ma-5 mb-12 pa-5">
    <v-card-title>
      Stock
      <v-spacer></v-spacer>
    
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
   
    ></v-data-table>
  </v-card>
 
</template>

<script>
  export default {
    name: "Stock",
    data () {
      return {
        search: '',
        headers: [
          { text: 'Date', value: 'date' },
          {
            text: 'Kilo of Ube',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Expected Output', value: 'calories' },
          { text: 'Ordered Quantity', value: 'fat' },
          { text: 'Status', value: 'carbs' },
        
        ],
        desserts: [
          {
            date:'9-14-2020',
            name: '5',
            calories: 159,
            fat: 6,
            carbs: "Enough",
          
          },
          {
            date:'9-15-2020',
            name: '6',
            calories: 237,
            fat: 9,
            carbs: "Enough",
           
          },
          {
            date:'9-16-2020',
            name: '8',
            calories: 262,
            fat: 16,
            carbs: "Enough",
         
          },
          {
            date:'9-17-2020',
            name: '8',
            calories: 262,
            fat: 16,
            carbs: "Enough",
         
          },
          {
            date:'9-18-2020',
            name: '8',
            calories: 262,
            fat: 16,
            carbs: "Enough",
         
          },
          {
            date:'9-19-2020',
            name: '8',
            calories: 262,
            fat: 16,
            carbs: "Enough",
         
          },
        
        ],
      }
    },
  }
</script>