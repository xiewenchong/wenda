import Request from "../index.js";

/* User */
export const login = data => Request.get("/login", data);

export const getUserInfo = data => Request.get("/getUserInfo", data);
