<template>
  <v-app id="inspire">
    <v-app-bar app color="purple darken-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="title">WAWENS UBE HALAYA</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app color="deep-purple lighten-2" dark id="drawer">
      <template v-slot:prepend>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-avatar size="100">
              <img src="../assets/wawens.png">
            </v-list-item-avatar>
            <v-spacer></v-spacer>
            <v-list-item>
              <v-list-item-title class="d-flex align-center justify-center pa-6 mx-auto" size="10">Admin Login</v-list-item-title>
            </v-list-item>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-list-item-group active-class="white purple--text"  >
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item :key="item.text" :to="item.link" link>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item>
      </v-list-item-group>
    </v-navigation-drawer>
  </v-app>
</template>
<style>

</style>

<script>
export default {
  props: {},
  data: () => ({
    dialog: false,
    drawer: null,
    items: [
      { icon: "mdi-view-dashboard", text: "Order", link: "/order" },
      { icon: "mdi-history", text: "Stock", link: "/stock" },
      { icon: " mdi-clipboard-outline", text: "Delivered", link: "/delivered" },
      { icon: "mdi-content-copy", text: "Delivery Order", link: "/delivery" }
    ]
  })
};
</script>