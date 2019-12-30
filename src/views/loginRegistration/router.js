export default [
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "loginRegistration" */ "./login/index.vue")
  },
  {
    path: "/register",
    component: () =>
      import(/* webpackChunkName: "loginRegistration" */ "./register/index.vue")
  }
];
