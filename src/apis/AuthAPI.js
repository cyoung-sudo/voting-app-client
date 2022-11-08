import api from "./configs/axiosConfig";

export const AuthAPI = {
  // Request to login user
  login: async (username, password) => {
    const res = await api.request({
      method: "post",
      data: {
        username,
        password
      },
      url: "/api/auth/login"
    });

    return res;
  },

  // Request to signup user
  signup: async (username, password) => {
    const res = await api.request({
      method: "post",
      data: {
        username,
        password
      },
      url: "/api/auth/signup"
    });

    return res;
  },

  // Request to logout user
  logout: async () => {
    const res = await api.request({
      method: "post",
      url: "/api/auth/logout"
    });

    return res;
  },

  // Request for logged-in user
  getUser: async () => {
    const res = await api.request({
      method: "get",
      url: "/api/auth/sessionStatus"
    });

    return res;
  }
};