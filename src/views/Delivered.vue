<template>
  <v-card class="ma-5 mb-12 pa-5">
    <v-card-title>
      Delivered
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
          {
            text: 'Kilo of Ube',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Expected Output', value: 'calories' },
          { text: 'Ordered Quantity', value: 'fat' },
         
        
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
       
          
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
         
           
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
           
         
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
        
         
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
      
      
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
     
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
       
          
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
      
           
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
     
      
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,

        
          },
        ],
      }
    },
  }
</script>