<template>
<div>
 <v-row>
    <v-hover v-slot:default="{ hover }">
    <v-layout wrap>
      <v-flex md4 v-for="item in products" :key="item.id">
        <v-card id="cards" class="card-container ma-5">
          <v-card-title class="purple darken-2 white--text">{{item.title}}</v-card-title>
          <center>
              <v-img :src="item.image"  height="200px" width="200px">
              </v-img>
          </center>
            <v-list-item class="justify-center">{{item.description}}</v-list-item>
          <v-row class="mx-auto text-center">
          </v-row>
        </v-card>
      </v-flex>
    </v-layout>
       </v-hover>
</v-row>
</div>
    
</template>
<script>
export default {
    data() {
    return {
     products:[{title:'Made for what?',description: 'Placing your order online',image: require("@/assets/order.png")},
      {title:'What does it mean?',description: 'No more physical store', image: require("@/assets/store.png")},
         {title:'How to Pay?',description: 'Cash On Delivery',   image: require("@/assets/Pay_on_Delivery.png")}
      ]
    }
      
    
},
props: {
      source: String,
    }
}
</script>
