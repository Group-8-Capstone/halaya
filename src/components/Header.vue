<template>
  <div>
    <v-app-bar app fixed light lights-in height="70" color="white" dense dark elevation="40">
      <v-list-item-avatar size="60">
        <img src="../assets/wawens.png">
      </v-list-item-avatar>
      <v-toolbar-title class="deep-purple--text">WAWEN'S UBE HALAYA</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link id="signUp" to="/register">
        <v-btn id="signUp" color="purple darken-2" text>Sign Up</v-btn>
      </router-link>
      <router-link id="signIn" to="/login">
        <v-btn id="signIn" color="purple darken-2" text>Login</v-btn>
      </router-link>
    </v-app-bar>
  </div>
</template>

<style scoped>
#signUp {
  text-decoration: none;
}
#signIn {
  text-decoration: none;
}
</style>