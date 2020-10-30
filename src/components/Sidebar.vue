<template>
  <v-app id="inspire">
    <v-app-bar app fixed light lights-in height="70" color="white" dense dark elevation="40">
      <v-list-item-avatar size="60">
        <img src="../assets/wawens.png">
      </v-list-item-avatar>
      <v-toolbar-title class="deep-purple--text">WAWEN'S UBE HALAYA MANAGEMENT</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom >
        <template v-slot:activator="{ on, attrs }">
          <!-- <v-list-item v-for="item in displayInfo" :key="item.id"> -->
             <v-btn dark icon v-bind="attrs" v-on="on">
            <v-icon class="mr-12 pt-5" size="30" color="grey">mdi-menu-down</v-icon>
          </v-btn>
           
           <v-list-item-avatar class="mr-5">
          <v-img :src="'http://localhost:8000/'+ avatarSrc"></v-img>
        </v-list-item-avatar>
        <v-chip color="deep-purple">
          <v-toolbar-title class="white--text mr-2">{{name}}</v-toolbar-title> 
          </v-chip> 
      
        </template>
        <v-list>
          <v-list-item v-for="item in items2" :key="item.title" :to="item.link" link>
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      :mini-variant.sync="mini"
      permanent
      fixed
      color="purple darken-3"
      dark
      id="drawer"
    >
      <v-list-item class="px-2">
        <!-- <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar> -->

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
        <v-list-item>
          <v-list-item-title>Admin Login</v-list-item-title>
        </v-list-item>
         
      </v-list-item>
      <v-divider></v-divider>
     
      <v-list >
        
        <v-list-item
          :key="item.text"
          active-class="white purple--text"
          :to="item.link"
          link=""
          v-if="!item.subItem"
          v-for="item in items">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group v-else-if="item.subItem" active-class="purple--text">
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="_subItem in item.subItem"  active-class="white purple--text" :key="_subItem.title" :to="_subItem.link" link  >
              <v-list-item-icon>
              <v-icon>{{ _subItem.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content >
              <v-list-item-title>{{ _subItem.title }}</v-list-item-title>
            </v-list-item-content>
           
          </v-list-item>
        </v-list-group>
      </v-list> 
    </v-navigation-drawer>
  </v-app>
</template>
<style scoped>
</style>
<script>
import axios from "axios";
import { forestgreen } from 'color-name';
export default {
  name: "Sidebar",
  props: {},
  data: () => ({
    // displayInfo:[],
    avatarSrc:null,
    name:null,
    dialog: false,
    switch2: true,
    drawer: true,
    model: 1,
    mini: true,
    items: [
      { icon: "mdi-view-dashboard", text: "Dashboard", link: "/dashboard" },
      {
        icon: "mdi-history",
        text: "Stock",
        subItem: [
          { icon:"mdi-stocking", title: "Ingredients", link: "/ingredients"},
          { icon:"mdi-package-variant",title: "Products", link: "/product"
        },
        ]
      },
      {icon: "mdi-clipboard-outline", text: "view Orders",
      subItem:[
      { icon: "mdi mdi-cart-plus", title: "Order", link: "/order" },
      { icon: "mdi-clipboard-outline", title: "To Deliver", link: "/delivery" },
      { icon: "mdi-content-copy", title: "Delivered Orders", link: "/delivered" },
      
      ]

      },
    
      { icon: "mdi-cogs", text: "Business Settings", link: "/setting" }
    ],
    items2: [
      {
        icon: "mdi-account-settings",
        title: "Profile Setting",
        link: "/profileSetting"
      },
      { icon: "mdi-logout", title: "logout", link: "/logout" }
    ]
  }),
  created(){
    this.avatarRetrieve()

  },
  methods: {
    goTo(route) {
      alert(route);
      this.$router.push(route);
    },
    avatarRetrieve(){
            axios.get('http://127.0.0.1:8000/api/retrieveAccount').then(response => {
                this.displayInfo = response.data.data
                // console.log(response.data.data.avatar)
                response.data.data.forEach(element => {
                  console.log(element.avatar)
                  this.avatarSrc=element.avatar
                  this.name=element.owners_name
                  
                });
            });
    }
  }
};
</script>