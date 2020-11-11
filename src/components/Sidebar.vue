<template>
  <v-app id="inspire">
    <v-app-bar app fixed light lights-in height="70" color="white" dense dark elevation="40">
      <v-btn color="grey" icon @click.stop="mini = !mini">
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <v-list-item-avatar size="60">
        <img src="../assets/wawens.png">
      </v-list-item-avatar>
      <v-toolbar-title class="deep-purple--text">WAWEN'S UBE HALAYA</v-toolbar-title>
      <!-- <template v-slot:activator="{ on, attrs }">
          <v-list-item-avatar class="mr-5">
            <v-img :src="'http://localhost:8000/'+ avatarSrc"></v-img>
          </v-list-item-avatar>

          <v-toolbar-title class="grey--text mr-1 sub_title pt-5">{{name}}</v-toolbar-title>
        </template> -->
      <!-- <v-spacer></v-spacer>
      <v-menu bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark icon v-bind="attrs" v-on="on">
            <v-icon class="mr-12 pt-5" size="30" color="grey">mdi-menu-down</v-icon>
          </v-btn>
          <v-list-item-avatar class="mr-5">
            <v-img :src="'http://localhost:8000/'+ avatarSrc"></v-img>
          </v-list-item-avatar>

          <v-toolbar-title class="grey--text mr-1 sub_title pt-5">{{name}}</v-toolbar-title>
        </template>
        <v-list>
          <v-list-item v-for="item in items2" :key="item.title" :to="item.link" link>
            <v-list-item-icon @click="logout(item)">
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content @click="logout(item)">
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu> -->
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
          <v-sheet color="purple darken-3" >
            <v-row>
<v-list-item-avatar class="ma-2" color="grey darken-1" size="40">
<img  :src="image === null ? avatarSrc : 'http://127.0.0.1:8000/' + image" >
</v-list-item-avatar>
<!-- <div style="color:white"></div> -->
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
    // displayInfo:[],
    avatarSrc: 'http://localhost:8000/images/avatar.png',
    image: null,
    name: null,
    dialog: false,
    switch2: true,
    drawer: true,
    model: 1,
    mini: true,
    // items2: [
    //   {
    //     icon: "mdi-account-settings",
    //     title: "Profile Setting",
    //     link: "/profileSetting"
    //   },
    //   { icon: "mdi-logout", title: "logout", link: "/login" }
    // ],
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
          // { icon: "mdi-table", title: "Logs", link: "/logs" }
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
      axios.get(this.url+"/fetchProfile/"+ id, this.config).then(response => {
        // this.displayInfo = response.data.data;
        this.name = response.data.account[0].username;
        this.image=response.data.account[0].profile_url
        // this.avatarSrc=response.data.account[0].profile_url
        // response.data.data.forEach(element => {
        //   console.log(element.profile_url);
        //   this.avatarSrc = element.profile_url;
        //   this.name = element.username;
        // });
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