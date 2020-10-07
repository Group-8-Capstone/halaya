import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import Order from "../views/Order.vue";
import Stock from "../views/Stock.vue";
import Delivery from "../views/DeliveryOrder.vue";
import Login from "../views/Login.vue"
import Delivered from "../views/Delivered.vue";
import Home from "../views/Home.vue";



Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,

  routes: [
    {
      path: "/dashboard",
      name: "dashboard",
      component: Home
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/order",
      name: "Order",
      component: Order
    },
    {
      path: "/stock",
      name: "Stock",
      component: Stock
    },
    {
      path: "/delivered",
      name: "Delivered",
      component: Delivered
    },
    {
      path: "/delivery",
      name: "Delivery",
      component: Delivery
    },
    {
      path: "/about",
      name: "About",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import( /* webpackChunkName: "about" */ "../views/About.vue")
    }
  ]

});

export default router;