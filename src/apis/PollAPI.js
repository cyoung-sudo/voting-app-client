import api from "./configs/axiosConfig";

// Request for all polls
export const getAll = async () => {
  const res = await api.request({
    method: "get",
    url: "/api/polls"
  });

  return res;
};

// Request to create poll
export const create = async (userId, topic, options) => {
  const res = await api.request({
    method: "post",
    data: {
      userId,
      topic,
      options
    },
    url: "/api/polls"
  });

  return res;
};

// Request all polls for given user
export const getAllUser = async (id) => {
  const res = await api.request({
    method: "post",
    data: { id },
    url: "/api/polls/user"
  });

  return res;
};

// Request for specific poll
export const getOne = async (id) => {
  const res = await api.request({
    method: "post",
    data: { id },
    url: "/api/poll"
  });

  return res;
};

// Request to vote for given poll
export const vote = async (id, choice) => {
  const res = await api.request({
    method: "put",
    data: {
      id,
      choice
    },
    url: "/api/poll/vote"
  });

  return res;
};

// Request to add option for given poll
export const addOption = async (id, newOption) => {
  const res = await api.request({
    method: "put",
    data: { 
      id,
      newOption 
    },
    url: "/api/poll/option"
  });

  return res;
};

// Request to set status for given poll
export const setStatus = async (id, status) => {
  const res = await api.request({
    method: "put",
    data: { 
      id,
      status 
    },
    url: "/api/poll/status"
  });

  return res;
};

// Request to delete given poll
export const deletePoll = async (id) => {
  const res = await api.request({
    method: "delete",
    data: { id },
    url: "/api/poll"
  });

  return res;
};