<template>
  <v-app id="inspire">
    <v-app-bar app fixed light lights-in height="70" color="white" dense dark elevation="40">
      <v-list-item-avatar size="60">
        <img src="../assets/wawens.png">
      </v-list-item-avatar>
      <v-toolbar-title class="deep-purple--text">WAWEN'S UBE HALAYA MANAGEMENT</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark icon v-bind="attrs" v-on="on">
            <v-icon class="mr-5" size="30" color="grey">mdi-account-cog-outline</v-icon>
          </v-btn>
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
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>Admin Login</v-list-item-title>
        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
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
export default {
  name: "Sidebar",
  props: {},
  data: () => ({
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
  methods: {
    goTo(route) {
      alert(route);
      this.$router.push(route);
    }
  }
};
</script>