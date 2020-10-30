import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate'

import mapboxgl from "mapbox-gl";
import turf from "@turf/turf";
import { Form, HasError, AlertError } from 'vform'
import '@turf/helpers';
import Print from 'vue-printjs'
Vue.use(Print)

Vue.use(Vuelidate)
window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
Vue.component('profile-component', require('./components/ProfileAccount.vue').default);


Vue.config.productionTip = false;
Vue.use
new Vue({
  router,
  vuetify,
  mapboxgl,
  turf,
  render: h => h(App)
}).$mount("#app");
