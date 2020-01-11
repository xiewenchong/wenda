import { getStore, setStore } from "~common/util/util.js";
import api from "@/http/api/user.js";

const user = {
  state: {
    token: getStore("token") || "admin",
    name: ""
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    }
  },
  getters: {},
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        api
          .login(userInfo)
          .then(res => {
            if (res.code === 200) {
              setStore("token", res.data);
              commit("SET_TOKEN", res.data);
            }
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    // 获取用户信息
    GetUserInfo({ commit }, data) {
      return new Promise((resolve, reject) => {
        api
          .getUserInfo(data)
          .then(res => {
            if (res.code === 200) {
              commit("SET_NAME", res.data.name);
            }
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};

export default user;
