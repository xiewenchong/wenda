export default [
  {
    path: "/userCenter",
    component: () =>
      import(/* webpackChunkName: "user" */ "./userCenter/index.vue")
  }
];
