<template>
  <div>
    <div>
      <div class="homeContainer">
        <img id="homeImg" fluid-grow src="../assets/ubeCard.jpg">
        <div class="centered">
          <h3
            id="imgText1"
            class="font-weight-bold text-h6 [1] text-md-h4 [2] text-lg-h3 [2] text-xl-h3 [2] text-truncate"
          >Welcome to Wawen's Ube Halaya</h3>
          <h5 id="imgText2" class="font-weight-thin text-h9 [1] text-md-h9 [2] text-lg-h6 [2] text-xl-h6 [2] text-truncate">
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
      <v-col sm="12">
        <v-row>
          <v-col class="text-center" cols="12" id="text">
            <h2 id="ourStory" class="mb-1">OUR STORY</h2>
            <v-row align="center" justify="center">
              <v-col cols="10">
                <div>
                  <template>
                    <v-card flat class="mx-auto mt-1" max-width="400">
                      <v-card-text id="story" class="font-weight-bold">
                        12 Ube Halaya jars.
                        1 Facebook post.
                        <br>
                        <br>That's how our story began in October 17, 2019.
                        <br>
                        <br>Today, we are privileged to have bottled and distributed more than 15,000 jars and counting.
                      </v-card-text>
                    </v-card>
                  </template>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-card flat class="pa-1 mt-1">
            <v-row align="center" justify="center" class="mt-1">
              <div id="planHeader" class="text-center">
                <h1 id="productHeader">Ways To Enjoy Wawen's Ube Halaya</h1>
              </div>
            </v-row>
            <v-row>
              <v-col sm="12" md="3" lg="3" xl="3" v-for="(item, i) in gallery" :key="i">
                <div>
                  <v-hover v-slot:default="{ hover }">
                    <v-card flat :elevation="8" data-aos="zoom-out">
                      <v-img id="photo" height="315" :src="item.src">
                        <v-expand-transition>
                          <div
                            v-if="hover"
                            class="d-flex transition-fast-in-fast-out purple darken-2 v-card--reveal display-1 white--text"
                            style="height: 100%;"
                          >{{item.description}}</div>
                        </v-expand-transition>
                      </v-img>
                    </v-card>
                  </v-hover>
                </div>
              </v-col>
            </v-row>
            <br>
          </v-card>
        </v-row>
        <v-row>
          <br>
          <div>
            <v-row id="infos">
              <v-col sm="12" md="4" lg="4" xl="4">
                <v-row>
                  <v-card
                    shaped
                    id="infoCards"
                    light
                    max-width="400"
                    height="auto"
                    :elevation="8"
                    data-aos="fade-right"
                  >
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
                  <v-card
                    shaped
                    id="infoCards"
                    light
                    max-width="400"
                    height="auto"
                    :elevation="8"
                    data-aos="fade-right"
                  >
                    <v-card-title>
                      <v-icon large left>mdi-truck</v-icon>Delivery Time
                      <v-card-text class="text">
                        <v-icon>mdi-clock</v-icon>Starts at 3:00 PM until orders for the day
                        <br>are all delivered
                      </v-card-text>
                      <v-card-text class="text">
                        <v-icon>mdi-calendar</v-icon>Monday - Saturday
                      </v-card-text>
                      <v-card-text class="text">
                        <v-icon>mdi-cart</v-icon>If your order is 10 jars or more, order a day ahead and we will give you freshly prepared and bottled Ube Halaya, ready for you to indulge.
                      </v-card-text>
                    </v-card-title>
                  </v-card>
                </v-row>
                <br>
                <v-row>
                  <v-layout wrap>
                    <v-flex>
                      <v-col sm="12">
                        <v-card
                          shaped
                          flat
                          id="infoCrd"
                          max-width="400"
                          height="auto"
                          :elevation="8"
                          data-aos="fade-right"
                        >
                          <v-card-title class="purple darken-2 white--text">
                            <v-icon color="white" large light>mdi-information</v-icon>
                          </v-card-title>
                          <center>
                            <v-img src="../assets/order.png" height="100px" width="100px"></v-img>
                          </center>
                          <v-list-item class="justify-center">
                            <h2>You can now place your order online!</h2>
                          </v-list-item>
                          <v-divider></v-divider>
                          <v-list-item>
                            <h2>How to pay?</h2>
                          </v-list-item>
                          <center>
                            <v-img src="../assets/Pay_on_Delivery.png" height="100px" width="100px"></v-img>
                          </center>
                          <v-list-item class="justify-center">
                            <h2>Cash On Delivery</h2>
                          </v-list-item>
                        </v-card>
                      </v-col>
                    </v-flex>
                  </v-layout>
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
                            <v-card
                              class="mx-auto mt-1"
                              color="grey lighten-4"
                              :elevation="8"
                              data-aos="flip-right"
                            >
                              <v-img :aspect-ratio="16/9" src="../assets/halayaTab.jpg">
                                <v-expand-transition>
                                  <div
                                    v-if="hover"
                                    class="d-flex transition-fast-in-fast-out purple darken-2 v-card--reveal display-1 white--text"
                                    style="height: 100%;"
                                  >Take a try</div>
                                </v-expand-transition>
                              </v-img>
                              <v-card-text class="pt-6">
                                <center>
                                  <div
                                    class="font-weight-light grey--text title mb-2"
                                  >Perfect Ubelicious treat</div>
                                  <h1 class="font-weight-light orange--text mb-2">{{tubName}}</h1>
                                  <div
                                    id="price"
                                    class="font-weight-light grey--text title mb-2"
                                  >₱{{tubPrice}}</div>
                                </center>
                              </v-card-text>
                            </v-card>
                          </v-hover>
                        </v-col>
                        <v-col sm="6">
                          <v-hover id="products" v-slot:default="{ hover }">
                            <v-card
                              class="mx-auto mt-1"
                              color="grey lighten-4"
                              :elevation="8"
                              data-aos="flip-right"
                            >
                              <v-img :aspect-ratio="16/9" src="../assets/halayaJar.jpg">
                                <v-expand-transition>
                                  <div
                                    v-if="hover"
                                    class="d-flex transition-fast-in-fast-out purple darken-2 v-card--reveal display-1 white--text"
                                    style="height: 100%;"
                                  >Have a taste</div>
                                </v-expand-transition>
                              </v-img>
                              <v-card-text class="pt-6">
                                <center>
                                  <div
                                    class="font-weight-light grey--text title mb-2"
                                  >Perfect Ubelicious snack</div>
                                  <h1 class="font-weight-light orange--text mb-2">{{jarName}}</h1>
                                  <div
                                    id="price"
                                    class="font-weight-light grey--text title mb-2"
                                  >₱{{jarPrice}}</div>
                                </center>
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
                    <br>
                    <h1 id="adHeader" class="mb-1">Eyes here!</h1>
                  </div>
                </v-row>
                <v-row>
                  <div>
                    <v-card flat class="pa-1 mt-1">
                      <v-col sm="12">
                        <v-row>
                          <v-col sm="6">
                            <v-card max-width="400" flat :elevation="8" data-aos="fade-left">
                              <v-img src="../assets/ad1.png"></v-img>
                            </v-card>
                          </v-col>
                          <v-col sm="6">
                            <v-card max-width="400" flat :elevation="8" data-aos="fade-left">
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
      </v-col>
    </div>
  </div>
</template>

<script>
import VueResponsiveImage from "vue-responsive-image";
import axios from "axios";
export default {
  name: "Home",
  data: () => ({
    menu: false,
    model: null,
    jarName: null,
    tubName: null,
    tubPrice: null,
    jarPrice: null,
    gallery: [
      {
        src: require("../assets/photos/jar.png"),
        description: "Enjoyable snack"
      },
      {
        src: require("../assets/ube.jpg"),
        description: "Ubelicious spread"
      },
      {
        src: require("../assets/photos/ubechi.png"),
        description: "Ube-filled butchi"
      },
      {
        src: require("../assets/photos/ubecake.png"),
        description: "Ubelicious cake"
      }
    ]
  }),
  created() {
    this.getHalayaTub(), this.getHalayaJar();
  },
  methods: {
    getHalayaTub(item) {
      axios.get(this.url + "/api/fetchHalayaTubLanding").then(response => {
        this.tubName = response.data.product[0].product_name;
        this.tubPrice = response.data.product[0].product_price;
      });
    },

    getHalayaJar(item) {
      axios.get(this.url + "/api/fetchHalayaJarLanding").then(response => {
        this.jarName = response.data.product[0].product_name;
        this.jarPrice = response.data.product[0].product_price;
      });
    }
  }
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
#about {
  padding-left: 0;
  padding-top: 0;
  justify-content: center;
  align-content: center;
}
#infoCards {
  background-color: rgb(217, 167, 252);
  margin-top: 3px;
  padding-top: 0;
  padding-bottom: 0;
}
#infoCrd {
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
}
.homeContainer {
  height: 400px;
  width: 100%;
  position: relative;
  text-align: center;
  background-color: black;
  display: inline-block;
}
#homeImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
  display: inline;
}
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inherit;
}
@media (min-width: 100%) {
  #imgText1 {
    font-size: 1em;
  }
  #imgText2 {
    font-size: 0.75em;
  }
}
#imgText1 {
  align-content: center;
  justify-content: center;
  color: white;
}
#imgText2 {
  align-content: center;
  color: white;
}
#ourStory {
  margin-top: 20px;
}
#infos {
  margin-top: 40px;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
}
#photo {
  width: 100%;
  height: auto;
  object-fit: cover;
  display: flex;
}
#story {
  font-weight: thin;
  color: black;
}
#productHeader {
  align-content: center;
  font-size: 2em;
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
  height: 400px;
}
</style>