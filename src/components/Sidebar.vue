<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="deep-purple"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="title">WAWENS UBE HALAYA</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <hr>
    <v-navigation-drawer
      v-model="drawer"
      app
      :permanent="(drawer) ? true: false"
      color="deep-purple lighten-2"
      dark
      id="drawer"
    >
      <template v-slot:prepend>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-avatar size="205">
              <img src="../assets/wawens.png">
            </v-list-item-avatar>
            <v-spacer></v-spacer>
            <v-list-item>
              <v-list-item-title
                class="d-flex align-center justify-center pa-6 mx-auto"
                size="10"
              >Admin Login</v-list-item-title>
            </v-list-item>
          </v-list-item-content>
        </v-list-item>
      </template>
      <hr style="background-color:purple; height: 2px; width:90%; margin:5%;" />
      <v-list-item-group active-class="white purple--text">
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
        >
          <v-list-item
            :key="item.text"
            :to="item.link"
            link=""
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item>
      </v-list-item-group>
      <center>
        <hr style="background-color:purple; height: 2px; width:90%; margin:5%;" />
        <br>
        <v-btn
          depressed
          color="primary"
        >
          Logout
        </v-btn>
      </center>
    </v-navigation-drawer>
  </v-app>
</template>
<style scoped>
</style>

<script>
export default {
  props: {},
  data: () => ({
    dialog: false,
    drawer: null,
    items: [
      { icon: "mdi-view-dashboard", text: "Dashboard", link: "/dashboard" },
      { icon: "mdi mdi-cart-plus", text: "Order", link: "/order" },
      { icon: "mdi-history", text: "Stock", link: "/stock" },
      { icon: " mdi-clipboard-outline", text: "Delivered", link: "/delivered" },
      { icon: "mdi-content-copy", text: "Delivery Order", link: "/delivery" },
    ],
  }),
};
</script>
