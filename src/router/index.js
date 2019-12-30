import Vue from "vue";
import VueRouter from "vue-router";

// import Home from './modules/home';
// import User from './modules/user';
// import LoginRegistration from './modules/login-registration';

Vue.use(VueRouter);

//每次手动新增模块路由
// const IndexRoute = [
//     ...Home,
//     ...User,
//     ...LoginRegistration
// ];

//自动新增新模块路由
let IndexRoute = [];
const routerFiles = require.context("../views", true, /router\.js$/);
routerFiles.keys().forEach(key => {
  IndexRoute = [
    ...IndexRoute,
    ...(routerFiles(key).default || routerFiles(key))
  ];
});

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    ...IndexRoute,
    {
      path: "*",
      redirect: "/"
    }
  ]
});
