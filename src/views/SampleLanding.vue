<template>
  <v-app light>
    <v-content>
      <section>
        <div class="homeContainer">
          <img id="homeImg" fluid-grow src="../assets/ubeCard.jpg">
          <div class="centered">
            <h3
              id="imgText1"
              class="font-weight-bold text-h6 [1] text-sm-h5 [1] text-md-h4 [2] text-lg-h3 [2] text-xl-h3 [2] text-truncate"
            >Welcome to Wawen's Ube Halaya</h3>
            <h5
              id="imgText2"
              class="font-weight-thin text-h9 [1] text-sm-11 [1] text-md-h7 [2] text-lg-h6 [2] text-xl-h6 [2] text-truncate"
            >
              <i>
                Cebu’s First Locally Produced Authentic Ube Halaya
                <br>Prepared with Patience and Attention
                <br>And bottled with Love and Care
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
      </section>

      <section>
        <v-layout column wrap class="my-5" align-center>
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2
                id="ourStory"
                class="mb-1 font-weight-bold text-h6 [1] text-sm-h6 [1] text-md-h6 [2] text-lg-h5 [2] text-xl-h5 [2]"
              >OUR STORY</h2>
            </div>
            <!-- <div class="text-xs-center">
              <p id="textStory">
                12 Ube Halaya jars.
                1 Facebook post. That's how our story began in October 17, 2019. Today, we are 
                privileged to have bottled and distributed more than 16,000 jars and counting.
                We are currently located at Mandaue City, Cebu.
              </p>
            </div>-->
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                  <v-flex xs12 md3></v-flex>
                <v-flex xs12 md6>
                  <v-card class="elevation-0 transparent">
                    <v-card-text>
                      12 Ube Halaya jars.
                      1 Facebook post. That's how our story began in October 17, 2019. Today, we are
                      privileged to have bottled and distributed more than 16,000 jars and counting.
                      We are currently located at Mandaue City, Cebu.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md3></v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <!-- <v-parallax :src="imageLink.main" height="380">
          <v-layout column align-center justify-center>
            <div
              class="headline white--text mb-3 text-xs-center"
            >Endorfine is a social network that allows everyone to reach a huge audience with a tap</div>
            <em>With the power of Endorfine you don't need to be famous or post pics of cute cats in order to get visibility</em>
            <v-btn class="blue lighten-2 mt-5" dark large href="/pre-made-themes">Get more info</v-btn>
          </v-layout>
        </v-parallax> -->
        
          <Gallery/>
      </section>

      <section>
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs12 text-xs-center class="mt-5">
              <div class="headline">Are you amazed? Stay tuned!</div>
              <br>
              <div>We are lunching the beta in a few time. If you want to be one of the first Endorfine users we will email you as soon as we're ready. In the beginning only few people will test before the launch. Let us know how Endorfine will help you!</div>
            </v-flex>
            <v-flex xs8 offset-xs2>
              <v-card class="elevation-0 transparent">
                <v-card-text>
                  <v-flex xs12 v-if="!subscribed">
                    <v-text-field
                      box
                      label="Email address"
                      :rules="emailRules"
                      v-model="email"
                      hint="Enter your email!"
                      persistent-hint
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 v-if="!subscribed">
                    <v-text-field box multi-line label="Bio and curiosities"></v-text-field>
                  </v-flex>
                  <v-flex xs12 class="text-xs-center" v-if="!subscribed">
                    <v-btn class="blue lighten-2 mb-5" dark large @click="subscribe">Get in touch</v-btn>
                  </v-flex>
                  <v-flex xs12 class="text-xs-center" v-if="subscribed">
                    <v-btn class="green lighten-2 mb-5" dark large>Welcome on board!</v-btn>
                  </v-flex>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>

      <section>
        <v-parallax :src="imageLink.social_cover" height="380">
          <v-layout column align-center justify-center>
            <div
              class="headline white--text mb-3 text-xs-center"
            >We are dropping cool news and opportunities on socials</div>
          </v-layout>
          <v-layout justify-space-around justify-center>
            <v-icon x-large dark>fab fa-facebook-f</v-icon>

            <v-icon x-large dark>fab fa-twitter</v-icon>

            <v-icon x-large dark>fab fa-reddit-alien</v-icon>

            <v-icon x-large dark>fab fa-instagram</v-icon>

            <v-icon x-large dark>fab fa-discord</v-icon>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 sm4>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Company info</div>
                </v-card-title>
                <v-card-text>We are not a company. We hate companies. Just imagine us like the guys from the Silicon Valley series.</v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">We are hiring</div>
                </v-card-title>
                <v-card-text>Are you a creative person? Do you like techy stuff? Complete the email form by writing your skills and interests</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>
    </v-content>
  </v-app>
</template>

<script>
import Gallery from "../components/Gallery.vue"
export default {
  name: "App",
  components: {Gallery},
  data: function() {
    return {
      title: "Endorfine",
      imageLink: {
        main:
          "https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2Fb13f0434-b228-11e6-8e5d-5252025056ab_web_scale_0.4666667_0.4666667__.jpg?alt=media&token=660df23e-599e-434b-9313-ba69c973eeea",
        sub_main:
          "https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2FNight-Club-Clubbing-Jobs-Abroad2.jpg?alt=media&token=82bbda7d-5df4-430b-9217-adaf1c8485c5",
        logo:
          "https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2Fandroid-chrome-512x512.png?alt=media&token=8a0a66f6-4741-4ff6-8f28-eb9ec74374df",
        social_cover:
          "https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2Fo-NIGHTCLUB-facebook.jpg?alt=media&token=cefc5c4c-9714-41da-9c22-f63caf5e89a4"
      },
      email: "",
      emailRules: [
        v => {
          return !!v || "E-mail is required";
        },
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],
      subscribed: false
    };
  },
  methods: {
    subscribe: function() {
      this.subscribed = !this.subscribed;
    }
  },

  computed: {
    imgHeight: function() {
      var offset = 320;
      console.log("new image height is " + (this.pageHeight - offset));
      return this.pageHeight - offset;
    }
  },

  mounted: function() {
    this.calculateHeight();
  }
};
</script>

<style scoped>
#createBtn {
  text-decoration: none;
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
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inherit;
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
.finedTitle {
  font-weight: 900;
  text-shadow: 2px 2px #000000;
}

.social-icon {
  font-size: 21px;
  color: white;
}
</style>
