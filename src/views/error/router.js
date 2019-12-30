export default [
  {
    path: "/404",
    component: () => import(/* webpackChunkName: "error" */ "./404.vue")
  }
];
