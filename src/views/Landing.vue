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
    <div class="homeContainer">
      <img id="homeImg" fluid src="../assets/ubeCard.jpg">
      <div class="centered">
        <h3 id="imgText1">Welcome to Wawen's Ube Halaya</h3>
        <h5 id="imgText2" class="font-weight-thin">
          <i>
            Cebu’s First Locally Produced Authentic Ube Halaya
            <br>- prepared with Patience and Attention
            <br>- and bottled with Love and Care
          </i>
        </h5>
        <br>
        <router-link to="/register" id="createBtn" justify="end">
          <v-btn color="purple darken-2" rounded dark>
            <v-toolbar-title>Order Now</v-toolbar-title>
          </v-btn>
        </router-link>
      </div>
    </div>
    <v-row>
      <v-col class="text-center" cols="12" id="text">
        <h4 id="ourStory" class="mb-5">OUR STORY</h4>
        <h1 class="display-1 font-weight-bold">Who We Are</h1>
        <v-row align="center" justify="center">
          <v-col cols="10">
            <div>
              <template>
                <v-card flat class="mx-auto" max-width="400">
                  <v-card-text id="pros" class="font-weight-bold">
                    Since October 2019, we make bottled Ube Halaya readily available to UBElievers like you.
                    <br>No more deep searching and cherry-picking(Ube-picking) in the market.
                    <br>No more intense cleaning and brushing of Ube.
                    <br>No more hard boiling.
                    <br>No more meticulous peeling of the bark-like Ube skin.
                    <br>No more bone-breaking grating and grinding.
                    <br>No more arm-wrenching mixing and cooking.
                    <br>No more careful bottling.
                  </v-card-text>
                </v-card>
              </template>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row id="photos">
      <v-card flat>
        <v-row>
          <v-col sm="3">
            <div>
              <v-card flat :elevation="8">
                <v-img id="photo" max-height="315" src="../assets/photos/tub.png"></v-img>
              </v-card>
            </div>
          </v-col>
          <v-col sm="3">
            <div>
              <v-card flat :elevation="8">
                <v-img id="photo" height="315" src="../assets/ubeIngredients.jpg"></v-img>
              </v-card>
            </div>
          </v-col>
          <v-col sm="3">
            <div>
              <v-card flat :elevation="8">
                <v-img id="photo" max-height="315" src="../assets/photos/ubechi.png"></v-img>
              </v-card>
            </div>
          </v-col>
          <v-col sm="3">
            <div>
              <v-card flat :elevation="8">
                <v-img id="photo" max-height="315" src="../assets/photos/ubecake.png"></v-img>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
    <v-row>
      <div>
        <v-row id="infos">
          <v-col sm="4">
            <v-row>
              <v-card id="infoCards" light max-width="400" height="190" :elevation="8">
                <v-card-title>
                  <v-icon large left>mdi-bullhorn</v-icon>Suwayi na!
                  <v-card-text class="text">
                    Ube Halaya na lami, apan dili bidli. Basta matilwan,
                    <br>dili na gyud mabinlan. Matud pa nila, maablihan
                    <br>na gani ang botelya sa Wawen's Ube Halaya - dili
                    <br>na gyud katugpa sa lamesa.
                  </v-card-text>
                </v-card-title>
              </v-card>
            </v-row>
            <br>
            <v-row>
              <v-card id="infoCards" light max-width="400" height="190" :elevation="8">
                <v-card-title>
                  <v-icon large left>mdi-truck</v-icon>Delivery Time
                  <v-card-text class="text">
                    <v-icon>mdi-clock</v-icon>Starts at 3:00 PM until orders for today
                    <br>are all delivered
                  </v-card-text>
                  <v-card-text class="text">
                    <v-icon>mdi-calendar</v-icon>Monday - Saturday
                  </v-card-text>
                </v-card-title>
              </v-card>
            </v-row>
            <br>
            <v-row>
              <v-card id="infoCards" light max-width="400" height="490" :elevation="8">
                <v-card-title>
                  <v-icon large left></v-icon>Prices And Delivery Fee/Distance
                  <v-card-text class="text">
                    <h3>
                      <b>1 - 9 jar/s:</b> ₱150.00 each
                    </h3>
                    <br>( No free delivery for 1 jar order )
                    <br>0 - 2 km free delivery
                    <br>2.1 - 5 km = ₱50.00
                    <br>5.1 - 6 km = ₱70.00
                    <br>6.1 - 8 km = ₱80.00
                    <br>8.1 - 10 km = ₱100.00
                    <br>
                    <br>
                    <h3>
                      <b>10 - 23 jars:</b> ₱140.00 each
                    </h3>
                    <br>Free Delivery on less than 8 km
                    <br>
                    <br>
                    <h3>
                      <b>24 jars above:</b> ₱130.00 each
                    </h3>
                    <br>Free Delivery
                  </v-card-text>
                </v-card-title>
              </v-card>
            </v-row>
          </v-col>
          <v-col align="left" justify="left">
            <v-row align="center" justify="center">
              <div id="planHeader" class="text-center">
                <h1 id="productsHeader">PRODUCTS</h1>
              </div>
            </v-row>
            <v-row>
              <div>
                <v-col sm="12">
                  <v-row>
                    <v-col sm="6">
                      <v-hover id="products" v-slot:default="{ hover }">
                        <v-card class="mx-auto" color="grey lighten-4" :elevation="8">
                          <v-img :aspect-ratio="16/9" src="../assets/halayaTab.jpg">
                            <v-expand-transition>
                              <div
                                v-if="hover"
                                class="d-flex transition-fast-in-fast-out purple darken-2 v-card--reveal display-1 white--text"
                                style="height: 100%;"
                              >Take a try</div>
                            </v-expand-transition>
                          </v-img>
                          <v-card-text class="pt-6" style="position: relative;">
                            <div
                              class="font-weight-light grey--text title mb-2"
                            >Perfect Ubelicious treat</div>
                            <h1 class="font-weight-light orange--text mb-2">Ube halaya in a tub</h1>
                            <div id="price" class="font-weight-light grey--text title mb-2">₱499.00</div>
                          </v-card-text>
                        </v-card>
                      </v-hover>
                    </v-col>
                    <v-col sm="6">
                      <v-hover id="products" v-slot:default="{ hover }">
                        <v-card class="mx-auto" color="grey lighten-4" :elevation="8">
                          <v-img :aspect-ratio="16/9" src="../assets/halayaJar.jpg">
                            <v-expand-transition>
                              <div
                                v-if="hover"
                                class="d-flex transition-fast-in-fast-out purple darken-2 v-card--reveal display-1 white--text"
                                style="height: 100%;"
                              >Have a taste</div>
                            </v-expand-transition>
                          </v-img>
                          <v-card-text class="pt-6" style="position: relative;">
                            <div
                              class="font-weight-light grey--text title mb-2"
                            >Perfect Ubelicious snack</div>
                            <h1 class="font-weight-light orange--text mb-2">Ube halaya in a jar</h1>
                            <div id="price" class="font-weight-light grey--text title mb-2">₱499.00</div>
                          </v-card-text>
                        </v-card>
                      </v-hover>
                    </v-col>
                  </v-row>
                </v-col>
              </div>
            </v-row>
            <v-row align="center" justify="center">
              <div id="planHeader" class="text-center">
                <br>
                <h1 id="adHeader">Eyes here!</h1>
                <br>
              </div>
            </v-row>
            <v-row>
              <div>
                <v-card flat>
                  <v-col sm="12">
                    <v-row>
                      <v-col sm="6">
                        <v-card max-width="400" flat :elevation="8">
                          <v-img src="../assets/ad1.png"></v-img>
                        </v-card>
                      </v-col>
                      <v-col sm="6">
                        <v-card max-width="400" flat :elevation="8">
                          <v-img src="../assets/ad2.png"></v-img>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-card>
              </div>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-row>
    <div>
      <template>
        <v-footer id="footer" dark padless>
          <v-row id="footerContent" no-gutters>
            <v-col cols="4">
              <p>
                <v-icon>mdi-copyright</v-icon>2020 Wawen's Ube Halaya. All Rights Reserved
              </p>
            </v-col>
            <v-col cols="6">
              <v-row>
                <v-spacer></v-spacer>
                <h4 id="contactUs">Contact us:</h4>
                <div id="phone">
                  <v-icon id="callIcon">mdi-phone</v-icon>
                </div>
                <div>0945 380 8056</div>
                <div id="messenger">
                  <v-icon id="msgIcon" small>mdi-facebook-messenger</v-icon>
                </div>
                <div>
                  <p>
                    <a
                      href="https://www.messenger.com/t/ubehalayacebu"
                      target="_blank"
                    >m.me/ubehalayacebu</a>
                  </p>
                </div>
              </v-row>
            </v-col>
          </v-row>
        </v-footer>
      </template>
    </div>
  </div>
</template>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    menu: false,
    model: null
  })
};
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
.v-application--wrap {
  min-height: 100vh;
  justify-content: center;
}
#btnCard {
  margin-top: 12px;
  margin-right: 20px;
}
#createBtn {
  text-decoration: none;
}
#signUp {
  text-decoration: none;
}
#signIn {
  text-decoration: none;
}
#about {
  padding-left: 0;
  padding-top: 0;
  justify-content: center;
  align-content: center;
}
#infoCards {
  background-color: rgb(217, 167, 252);
  margin-top: 5px;
}
.homeContainer {
  height: 400px;
  position: relative;
  text-align: center;
  background-color: black;
}
#homeImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
}
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#imgText1 {
  align-content: center;
  color: white;
  font-size: 2.5em;
}
#imgText2 {
  align-content: center;
  color: white;
  font-size: 1em;
}
#infos {
  margin-top: 40px;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
}
#infoImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  float: left;
}
#photo {
  object-fit: cover;
}
#adPro {
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
}
#pros {
  font-weight: thin;
  color: black;
}
#productsHeader {
  align-content: center;
  font-size: 2.5em;
}
#adHeader {
  align-content: center;
  color: white;
  font-size: 2.5em;
  text-transform: uppercase;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  /* font-family: "Lucida Console", Courier, monospace; */
  background-image: linear-gradient(45deg, #7794ff, #44107a, #ff1361, #fff800);
  animation: 0.8s shake infinite alternate;
}
@keyframes shake {
  0% {
    transform: skewX(-15deg);
  }
  5% {
    transform: skewX(15deg);
  }
  10% {
    transform: skewX(-15deg);
  }
  15% {
    transform: skewX(15deg);
  }
  20% {
    transform: skewX(0deg);
  }
  100% {
    transform: skewX(0deg);
  }
}
#products {
  width: 400px;
  height: 352px;
}
#footer {
  padding: 10px;
  height: 100px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 12px;
  align-content: center;
  justify-content: center;
  align-items: center;
  justify-items: center;
}
#footerContent {
  align-content: center;
  justify-content: center;
  align-items: center;
  justify-items: center;
}
#contactUs {
  margin-right: 30px;
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
  margin-left: 30px;
  text-decoration: none;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 12px;
}
</style>
