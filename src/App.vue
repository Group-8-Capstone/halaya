<template>
  <v-app>
    <v-main>
      <Sidebar v-if="$route.name!= 'Login' && $route.name!= 'Landing' && $route.name!= 'Register'" id="Sidebar"/>
      <content>
        <router-view/>
      </content>
    </v-main>
  </v-app>
</template>
<style>
#Sidebar {
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
  }),

  mounted(){
    this.setUser()
  },
  methods:{

    setUser(){
      console.log('sxczfvxdfgdxfg', localStorage.getItem("id"))
    }

  }

  // mounted(){
  //   if(localStorage.getItem('token') === null && this.$route.path !== '/login'){
  //     this.$router.push("/login")
  //   }
  // }
};
</script>
