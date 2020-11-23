<template>
  <div sm="12">
    <template>
      <br>
      <v-footer id="footer" dark padless>
        <v-row id="footerContent" no-gutters>
          <v-col col-lg-12 col-md-12 col-sm-12>
            <p>
              <v-icon small>mdi-copyright</v-icon>2020, Wawen's Ube Halaya. All Rights Reserved.
            </p>
          </v-col>
          <v-col col-lg-12 col-md-12 col-sm-12  align="center">
            <v-row>
              <v-spacer></v-spacer>
              <h4 id="contactUs">Check us out here:</h4>
              <div id="phone">
                <v-icon id="callIcon">mdi-facebook</v-icon>
              </div>
              <div id="fbPage">
                <p>
                  <a
                    href="https://www.facebook.com/ubehalayacebu/reviews/"
                    target="_blank"
                  >Wawen's Ube Halaya</a>
                </p>
              </div>
              <h4 id="contactUs">Contact us:</h4>
              <div id="phone">
                <v-icon id="callIcon">mdi-phone</v-icon>
              </div>
              <div>0945 380 8056</div>
              <div id="messenger">
                <v-icon id="msgIcon" small>mdi-facebook-messenger</v-icon>
              </div>
              <div id="footerRight">
                <p>
                  <a
                    href="https://www.messenger.com/t/ubehalayacebu"
                    target="_blank"
                  >Wawen's Ube Halaya</a>
                </p>
              </div>
            </v-row>
          </v-col>
        </v-row>
      </v-footer>
    </template>
  </div>
</template>

<style scoped>
#footer {
  padding: 10px;
  height: 100px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 12px;
  align-content: center;
  justify-content: center;
  align-items: center;
  justify-items: center;
  position: relative;
}
#footerContent {
  align-content: center;
  justify-content: center;
  align-items: center;
  justify-items: center;
}
#fbPage {
  margin-right: 40px;
}
#contactUs {
  margin-right: 20px;
}
.v-btn {
  padding-left: 1px;
  padding-right: 1px;
}
#callIcon {
  margin-right: 8px;
  text-decoration: none;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 12px;
}
#msgIcon {
  margin-right: 8px;
  margin-left: 20px;
  text-decoration: none;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 12px;
}
#footerRight {
  margin-right: 30px;
}
</style>