import api from "./configs/axiosConfig";

export const UserAPI = {
  // Request for all users
  getAll: async () => {
    const res = await api.request({
      method: "get",
      url: "/api/users"
    });

    return res;
  },

  // Request for specific user
  getOne: async (id) => {
    const res = await api.request({
      method: "post",
      data: { id },
      url: "/api/user"
    });

    return res;
  },

  // Request to delete user
  delete: async () => {
    const res = await api.request({
      method: "delete",
      url: "/api/user"
    });

    return res;
  }
};