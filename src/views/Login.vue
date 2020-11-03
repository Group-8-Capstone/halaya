<template>
  <v-app id="inspire">
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-list-item
                id="cardHeader"
                size="150"
              >
                <v-list-item-content>
                  <v-list-item-title class="d-flex align-center justify-center pa-6 mx-auto headline">L O G I N</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item class="d-flex align-center justify-center pa-6 mx-auto">
                <img
                  alt="wawen's ube halaya"
                  src="../assets/wawens.png"
                  height="154"
                >
              </v-list-item>

              <v-spacer></v-spacer>

              <v-card-text>
                <v-form>
                  <p v-if="error" class="notif"> Invalid Username </p>
                  <v-text-field
                    label="Username"
                    name="Username"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="user"
                    class="border-design"
                    outlined
                    dense
                    :error="error"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="pass"
                    class="border-design"
                    outlined
                    dense
                    :error="error"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  id="btnLogin"
                  class="mb-5"
                  block
                  outlined
                  rounded
                  @click="login"
                >Log In</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<style scoped>
#inspire {
  background-color: #a4508b;
  background-image: linear-gradient(360deg, white 20%, #5f0a87 74%);
}
#btnLogin,
.border-design {
  border-color: purple !important;
  border-width: 2px !important;
  color: purple !important;
}
#cardHeader {
  background-color: purple;
  color: white !important;
}
.notif{
  text-align: center;
  color: red;
}
</style>


<script>
import axios from "axios";
export default {
  props: {
    source: String,
  },
  data() {
    return {
      user : '',
      pass : '',
      error : false
    };
  },
  mounted() {},
  watch: {
    error: function(ol, ne){
      return this.error
    }
  },
  methods: {
    login() {
      let userAccount = {
        username: this.user,
        password: this.pass,
      }
      axios.post("http://localhost:8000/api/login",userAccount).then((response) => {
        if(response.data.message === 'successfully_login'){
          console.log('success');
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", response.data.username)
          this.$router.push('/dashboard');
        }else{
          console.log('invalid');
          this.error = true;
        }
        // console.log('test ', response);
      });
    },
    register(){
       let userRegister = {
        username: "@",
        password: "@",
      }
      axios.post("http://localhost:8000/api/v1/auth/login",userRegister).then((response) => {
        if (this.username !== "" && this.password !== ""){
           console.log(userRegister);
        }
      });
    }
  },
};
</script>