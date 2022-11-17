import api from "./configs/axiosConfig";

// Request for all users
export const getAll = async () => {
  const res = await api.request({
    method: "get",
    url: "/api/users"
  });

  return res;
};

// Request for specific user
export const getOne = async (id) => {
  const res = await api.request({
    method: "post",
    data: { id },
    url: "/api/user"
  });

  return res;
};

// Request to delete user
export const deleteUser = async () => {
  const res = await api.request({
    method: "delete",
    url: "/api/user"
  });

  return res;
};