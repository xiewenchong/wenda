import Vue from "vue";
import filters from "~@/common/filters";
import "./components";
import "~assets/icons";
import "lib-flexible/flexible";

// 消除 click 移动浏览器300ms延迟
import attachFastClick from "fastclick";
attachFastClick.attach(document.body);

import {
  Button,
  Icon,
  Image,
  Lazyload,
  Loading,
  PullRefresh,
  Toast,
  Field
} from "vant";

// 全局过滤器
Object.keys(filters).forEach(filterName => {
  Vue.filter(filterName, filters[filterName]);
});
//注册部分常用UI组件
let vantUI = [
  Button,
  Icon,
  Image,
  Lazyload,
  Loading,
  PullRefresh,
  Toast,
  Field
];
vantUI.forEach(componentName => {
  Vue.use(componentName, vantUI[componentName]);
});
// Vue.prototype.$toast = Toast;
