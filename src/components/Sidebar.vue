<template>
  <v-app id="inspire">
    <v-app-bar app  light lights-in height="70" color="white" dense dark elevation="40">
      <v-btn color="grey" icon @click.stop="drawer = !drawer"  >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-list-item-avatar size="60">
        <img src="../assets/wawens.png">
      </v-list-item-avatar>
      <v-toolbar-title class="deep-purple--text">WAWEN'S UBE HALAYA</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      color="purple darken-3"
      dark
      id="drawer"
    >
 <v-sheet color="purple darken-3" >
 <v-row>
<v-list-item-avatar class="ma-2" color="grey darken-1" size="40"> 
<img  :src="image === null ? avatarSrc : this.url+'/'+ image" >
</v-list-item-avatar>
<v-list-item-content>
<v-toolbar-title class="white--text ml-5 ">{{name}}</v-toolbar-title>
</v-list-item-content>
</v-row>
</v-sheet>
      <v-divider></v-divider>
      <template v-if="isCustomer() === true">
        <v-list>
          <v-list-item
            :key="item.text"
            active-class="white purple--text"
            :to="item.link"
            link
            v-if="!item.subItem"
            v-for="item in customer"
          >
            <v-list-item-icon @click="logout(item)">
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content @click="logout(item)">
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
          </v-list-group>
        </v-list>
      </template>
      <template v-if="isAdmin() === true">
        <v-list>
          <v-list-item
            :key="item.text"
            active-class="white purple--text"
            :to="item.link"
            link
            v-if="!item.subItem"
            v-for="item in admin"
          >
            <v-list-item-icon @click="logout(item)">
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content @click="logout(item)">
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group v-else-if="item.subItem" active-class="purple--text">
            <template v-slot:activator>
              <v-list-item-icon >
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content >
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="_subItem in item.subItem"
              active-class="white purple--text"
              :key="_subItem.title"
              :to="_subItem.link"
              link
            >
              <v-list-item-icon class="ml-3">
                <v-icon>{{ _subItem.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content class="ml-2" >
                <v-list-item-title>{{ _subItem.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </template>

      <template v-if="isDriver() === true">
        <v-list>
          <v-list-item
            :key="item.text"
            active-class="white purple--text"
            :to="item.link"
            link
            v-if="!item.subItem"
            v-for="item in driver"
          >
            <v-list-item-icon @click="logout(item)">
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon >
            <v-list-item-content @click="logout(item)">
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
            <v-list-item
              v-for="_subItem in item.subItem"
              active-class="white purple--text"
              :key="_subItem.title"
              :to="_subItem.link"
              link
            >
              <v-list-item-icon>
                <v-icon>{{ _subItem.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ _subItem.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </template>
    </v-navigation-drawer>
  </v-app>
</template>
<style scoped>
.sub_title {
  font-size: 15px;
}
</style>
<script>
import axios from "axios";
import { forestgreen } from "color-name";
export default {
  name: "Sidebar",
  props: {},
  data: () => ({
    avatarSrc:'https://wawenshalaya.herokuapp.com/images/avatar.png',
    image: null,
    name: null,
    dialog: false,
    switch2: true,
    drawer: true,
    model: 1,
    mini: true,
    admin: [
      { icon: "mdi-view-dashboard", text: "Dashboard", link: "/dashboard" },
      {
        icon: "mdi-history",
        text: "Stock",
        subItem: [
          { icon: "mdi-stocking", title: "Ingredients", link: "/ingredients" },
          {
            icon: "mdi-package-variant",
            title: "Products",
            link: "/product"
          },
        ]
      },
      {
        icon: "mdi-clipboard-outline",
        text: "view Orders",
        subItem: [
          { icon: "mdi mdi-cart-plus", title: "Order", link: "/order" },
          {
            icon: "mdi-clipboard-outline",
            title: "To Deliver",
            link: "/delivery"
          },
          {
            icon: "mdi-content-copy",
            title: "Delivered Orders",
            link: "/delivered"
          }
        ]
        
        
      },

      { icon: "mdi-cogs", text: "Business Settings", link: "/setting" },
      {
        icon: "mdi-account-settings",
        text: "Profile Setting",
        link: "/profileSetting"
      },
      { icon: "mdi-logout", text: "logout", link: "/login" },
    ],
    customer: [
      { icon: "mdi-home-variant", text: "Home", link: "/customerHome" },
      { icon: "mdi-package-variant-closed", text: "My Order", link: "/myorder" },
      {
        icon: "mdi-account-settings",
        text: "Profile Setting",
        link: "/profileSetting"
      },
      { icon: "mdi-logout", text: "logout", link: "/login" }
    ],
    driver: [
      { icon: "mdi-clipboard-outline", text: "To Deliver", link: "/delivery" },
      { icon: "mdi-content-copy", text: "Delivered Orders", link: "/delivered" },
      {
        icon: "mdi-account-settings",
        text: "Profile Setting",
        link: "/profileSetting"
      },
      { icon: "mdi-logout", text: "logout", link: "/login" }
    ]
  }),

beforeCreate() {
    let config = {};
    config.headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
      'Access-Control-Allow-Origin':'*'
    };
    this.config = config;
  },
 
  created() {
    this.avatarRetrieve();
    this.isAdmin();
  },
  methods: {
    goTo(route) {
      alert(route);
      this.$router.push(route);
    },
    avatarRetrieve() {
      let id=localStorage.getItem('id')
      axios.get(this.url+"/api/fetchProfile/"+ id, this.config).then(response => {
        this.name = response.data.account[0].username;
        this.image=response.data.account[0].profile_url
        console.log(this.name)
      });
    },
    logout(item) {
      if (item.text == "logout") {
        localStorage.clear();
      }
    },
    isAdmin() {
      if (localStorage.getItem("role") == "admin") {
        return true;
      }
    },
    isCustomer() {
      if (localStorage.getItem("role") == "customer") {
        return true;
      }
    },
    isDriver() {
      if (localStorage.getItem("role") == "driver") {
        return true;
      }
    }
  }
};
</script>