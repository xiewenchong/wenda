import Request from "../index.js";

/* User */
export default {
  login(data) {
    Request.get("/login", data);
  },
  getUserInfo(data) {
    Request.get("/getUserInfo", data);
  }
};
