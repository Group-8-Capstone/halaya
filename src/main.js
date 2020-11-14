import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate'
import underscore from "underscore";
import mapboxgl from "mapbox-gl";
import turf from "@turf/turf";
import { Form, HasError, AlertError } from 'vform'
import '@turf/helpers';
import Print from 'vue-printjs'
import AOS from 'aos';
import 'aos/dist/aos.css'

AOS.init();
Vue.use(Print)
Vue.prototype.$_ = underscore;
Vue.use(Vuelidate)
window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
Vue.component('profile-component', require('./components/ProfileAccount.vue').default);


Vue.config.productionTip = false;
Vue.use

Vue.mixin({
  data: function() {
    return {
      url:"http://localhost:8000"
      // url: "https://wawenshalaya.herokuapp.com"
    }
  }
})

new Vue({
  created: function () {
    AOS.init({
      duration: 1200,
    });
  },
  router,
  vuetify,
  mapboxgl,
  turf,
  render: h => h(App)
}).$mount("#app");
