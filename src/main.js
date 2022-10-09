// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import _ from "lodash";
// import VueResource from 'vue-resource'
import JsonExcel from "vue-json-excel";
import BackToTop from "vue-backtotop";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import axios from "axios";
import VueAxios from "vue-axios";
import VueClazyLoad from "vue-clazy-load";
import VueLazyload from "vue-lazyload";
// import VScrollLock from 'v-scroll-lock'
// import simplebar from 'simplebar-vue';
// import 'simplebar/dist/simplebar.min.css'
// import Vuebar from 'vuebar'
import VueChartkick from "vue-chartkick";
import Chart from "chart.js";
import Highcharts from "highcharts";
import HighchartsVue from "highcharts-vue";
// Vue.use(Vuebar)
// Vue.component('simplebar', simplebar)
Vue.use(VueAxios, axios);
Vue.use(Vuetify);
// Vue.use(VueChartkick, { adapter: Highcharts });
Vue.use(HighchartsVue);
Vue.use(VueLazyload, {
  lazyComponent: true
});
// Vue.use(VueResource)
Vue.use(_);
Vue.use(BackToTop);
Vue.component("loading", Loading);
Vue.component("downloadExcel", JsonExcel);

Vue.config.productionTip = false;

export const serverBus = new Vue();
/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});
