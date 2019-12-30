import axios from "axios";
import router from "../router";
import store from "~@/store";
/**
 * 自定义Axios实例
 */
const AJAX = axios.create({
  // baseURL: env.baseUrl,
  baseURL: process.env.BASE_URL,
  timeout: 10000
  // withCredentials: env.credential
});
AJAX.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

// 添加请求拦截器
let loading = null;
AJAX.interceptors.request.use(
  config => {
    // loading + 1
    store.dispatch("SetLoading", true);

    loading = this.$toast.loading({
      message: "加载中...",
      forbidClick: true
    });
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  error => {
    // loading 清 0
    setTimeout(function() {
      store.dispatch("SetLoading", 0);
    }, 300);

    console.log(error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
AJAX.interceptors.response.use(
  response => {
    // loading - 1
    store.dispatch("SetLoading", false);

    if (loading) {
      loading.clear();
    }
    const responseCode = response.status;
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (responseCode === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    // loading - 1
    store.dispatch("SetLoading", false);

    // 断网 或者 请求超时 状态
    if (!error.response) {
      // 请求超时状态
      if (error.message.includes("timeout")) {
        console.log("超时了");
        this.$toast.fail("请求超时，请检查网络是否连接正常");
      } else {
        // 可以展示断网组件
        console.log("断网了");
        this.$toast.fail("请求失败，请检查网络是否已连接");
      }
      return;
    }

    // 服务器返回不是 2 开头的情况，会进入这个回调
    // 可以根据后端返回的状态码进行不同的操作
    const responseCode = error.response.status;
    switch (responseCode) {
      // 401：未登录
      case 401:
        // 跳转登录页
        router.replace({
          path: "/login",
          query: {
            redirect: router.currentRoute.fullPath
          }
        });
        break;
      // 403: token过期
      case 403:
        // 弹出错误信息
        this.$toast("登录信息过期，请重新登录");
        // 清除token
        localStorage.removeItem("token");
        // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
        setTimeout(() => {
          router.replace({
            path: "/login",
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
        }, 1000);
        break;
      // 404请求不存在
      case 404:
        this.$toast("网络请求不存在");
        break;
      // 其他错误，直接抛出错误提示
      default:
        this.$toast(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

// 定义对外Get、Post、File请求
export default {
  get(url, param = {}, headers = {}) {
    return AJAX.get(url, {
      params: param,
      headers
    });
  },
  post(url, param = null, headers = {}) {
    return AJAX.post(url, param, {
      headers
    });
  },
  put(url, param = null, headers = {}) {
    return AJAX.put(url, param, {
      headers
    });
  },
  file(url, param = null, headers = {}) {
    return AJAX.post(url, param, {
      headers: Object.assign(
        {
          "Content-Type": "multipart/form-data"
        },
        headers
      )
    });
  },
  delete(url, param = null, headers = {}) {
    return AJAX.delete(url, {
      param,
      headers: Object.assign(
        {
          "Content-Type": "multipart/form-data"
        },
        headers
      )
    });
  }
};
