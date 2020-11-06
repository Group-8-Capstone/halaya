<template>
  <v-footer id="footer" light padless>
    <v-row id="footerContent" no-gutters>
      <v-col cols="4">
        <p>
            <v-icon>mdi-copyright</v-icon> 2020 Wawen's Ube Halaya. All Rights Reserved</p>
      </v-col>
      <v-col cols="6">
        <v-spacer></v-spacer>
        <router-link to="/" id="homeBtn">
          <v-btn text id="homeBtn"><v-icon>mdi-facebook</v-icon></v-btn>
        </router-link>

      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
    data: () => ({

    }),
  methods: {
    goTo(route) {
      alert(route);
      this.$router.push(route);
    }
  }
};
</script>

<style>
#footer{
  padding: 10px;
  height: 100px;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 12px;
}
#footerContent {
  align-content: center;
  justify-content: center;
}
.v-btn {
  padding-left: 1px;
  padding-right: 1px;
}
#homeBtn {
  text-decoration: none;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 12px;
}
#aboutBtn {
  text-decoration: none;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 12px;
}
#plansBtn {
  text-decoration: none;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 12px;
}
#contactBtn {
  text-decoration: none;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 12px;
}
#dashboardBtn {
  text-decoration: none;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 12px;
}
/* #ultimateBuilders {
    text-decoration-line: none;
} */
#tabs {
  text-decoration-line: none;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 12px;
}
</style>