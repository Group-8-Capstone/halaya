import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate'

import mapboxgl from "mapbox-gl";
import turf from "@turf/turf";
import '@turf/helpers';

Vue.use(Vuelidate)


Vue.config.productionTip = false;
Vue.use
new Vue({
  router,
  vuetify,
  mapboxgl,
  turf,
  render: h => h(App)
}).$mount("#app");
