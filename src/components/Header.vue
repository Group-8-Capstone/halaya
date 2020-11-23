<template>
  <div sm="12">
    <v-app-bar
      app
      fixed
      light
      lights-in
      height="70"
      color="white"
      dense
      dark
      elevation="40"
      col-lg-4
      col-md-4
      col-sm-12
    >
      <v-list-item-avatar size="60" col-lg-4 col-md-4 col-sm-12>
        <img src="../assets/wawens.png">
      </v-list-item-avatar>
      <v-toolbar-title class="deep-purple--text" col-lg-4 col-md-4 col-sm-12>WAWEN'S UBE HALAYA</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link id="signUp" to="/register">
        <v-btn id="signUp" color="purple darken-2" text col-lg-4 col-md-4 col-sm-12>Sign Up</v-btn>
      </router-link>
      <router-link id="signIn" to="/login">
        <v-btn id="signIn" color="purple darken-2" text col-lg-4 col-md-4 col-sm-12>Login</v-btn>
      </router-link>
    </v-app-bar>
  </div>
</template>

<style scoped>
.v-toolbar__content, .v-toolbar--dense {
  padding-right: 0px;
  padding-left: 0px;
}
.v-toolbar__content {
  padding-right: 0px;
  padding-left: 0px;
}
#signUp {
  text-decoration: none;
}
#signIn {
  text-decoration: none;
}
</style>