import Vue from "vue";
import VueRouter from "vue-router";
import Order from "../views/Order.vue";
import Stock from "../views/Stock.vue";
import Delivery from "../views/DeliveryOrder.vue";
import Login from "../views/Login.vue"
import Delivered from "../views/Delivered.vue";
import Home from "../views/Home.vue";
import DeliveryDetails from "../views/DeliveryDetails";
import Setting from "../views/Setting.vue";
import Ingredients from "../views/Ingredients.vue";
import Product from "../views/Product.vue";
import AccountSetting from "../components/ProfileAccount.vue";



Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/logout",
      name: "Login",
      component: Login
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
      path: "/product",
      name: "Product",
      component: Product
    },
    {
      path: "/delivery-details",
      name: "DeliveryDetails",
      component: DeliveryDetails
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Home
    },
    {
      path: "/setting",
      name: "BusinessSetting",
      component: Setting
    },
    {
      path: "/profileSetting",
      name: "ProfileSetting",
      component: AccountSetting
    },
    {
      path: "/ingredients",
      name: "Ingredients",
      component: Ingredients
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