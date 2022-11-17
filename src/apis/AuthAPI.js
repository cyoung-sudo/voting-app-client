import api from "./configs/axiosConfig";

// Request to login user
export const login = async (username, password) => {
  const res = await api.request({
    method: "post",
    data: {
      username,
      password
    },
    url: "/api/auth/login"
  });

  return res;
};

// Request to signup user
export const signup = async (username, password) => {
  const res = await api.request({
    method: "post",
    data: {
      username,
      password
    },
    url: "/api/auth/signup"
  });

  return res;
};

// Request to logout user
export const logout = async () => {
  const res = await api.request({
    method: "post",
    url: "/api/auth/logout"
  });

  return res;
};

// Request for logged-in user
export const getUser = async () => {
  const res = await api.request({
    method: "get",
    url: "/api/auth/sessionStatus"
  });

  return res;
};