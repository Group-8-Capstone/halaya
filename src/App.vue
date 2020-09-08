<template>
  <v-app>
    
    <v-main>
      <Sidebar  v-if="$route.name!= 'Login'" id="Sidebar" 
         /> 
      <content>
        <router-view/> 
      </content>
       
    </v-main>
  </v-app>
</template>
<style>
#Sidebar{
  position: absolute;
}
</style>


<script>
import Sidebar from "./components/Sidebar";



export default {
  name: "App",
  components: {
    Sidebar,

  },

  data: () => ({
    //
  })
};
</script>
