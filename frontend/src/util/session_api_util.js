import axios from 'axios';

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const signup = (userData) => {
  return axios.post('/api/users/register', userData);
};

export const login = (userData) => {
  return axios.post('/api/users/login', userData);
};

export const followRoot = (userAndpanelIds) => {
  return axios.patch('/api/users/follow_root/1', userAndpanelIds)
};

export const unfollowRoot = (userAndpanelIds) => {
  return axios.delete('/api/users/unfollow_root/', {data: userAndpanelIds})
};

export const authorRoot = (userAndpanelIds) => {
  return axios.patch('/api/users/author_root/1', userAndpanelIds)
};

export const unauthorRoot = (userAndpanelIds) => {
  return axios.patch('/api/users/unauthor_root/1', {data: userAndpanelIds})
};