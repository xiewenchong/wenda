import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);
const IndexRoute = {
  path: "/home",
  component: () => import(/* webpackChunkName: "login" */ "~@/views/Home.vue"),
  name: "home",
  children: []
};
let routes = [
  {
    path: "/",
    redirect: "/home"
  },
  IndexRoute,
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "~@/views/login/index.vue")
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "~@/views/About.vue")
  },
  {
    path: "*",
    redirect: "/"
  }
];
// const routerContext = require.context("./", true, /index\.js$/);
// routerContext.keys().forEach(route => {
//     // 如果是根目录的 index.js 、不处理
//     if (route.startsWith("./index")) {
//         return;
//     }
//     const routerModule = routerContext(route);
//     /**
//      * 兼容 import export 和 require module.export 两种规范
//      */
//     IndexRoute.children = [
//         ...IndexRoute.children,
//         ...(routerModule.default || routerModule)
//     ];
// });

// scrollBehavior(to, from, savedPosition) {
// 	if (savedPosition) {
// 		return savedPosition
// 	} else {
// 		return {
// 			x: 0,
// 			y: 0
// 		}
// 	}
// }

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
// 路由守卫 拦截
// router.beforeEach((to, from, next) => {
// 	/* 路由发生变化修改页面title */
// 	if (to.meta.title) {
// 	  document.title = to.meta.title;
// 	}
// 	if (to.path != '/login'){
// 	  let uid = store.get('uid')
// 	  console.log('uid', uid)
// 	  if (uid) {
// 		if (to.path == '/') {
// 		  next({ path: '/home' })
// 		}
// 		next()
// 	  } else {
// 		next({ path: '/login' })
// 	  }
// 	}else{
// 	  next()
// 	}
//   })

// router.beforeEach((to, from, next) => {
//     sessionSetItem('tabBar', to.name);
//     return next()
// });
export default router;
