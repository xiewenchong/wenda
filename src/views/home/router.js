export default [
  {
    path: "/home",
    component: () =>
      import(/* webpackChunkName: "home" */ "./homePage/index.vue")
  }
];
