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

export const like = (userAndpanelIds) => {
  return axios.patch('/api/users/like/1', userAndpanelIds)
};

export const unlike = (userAndpanelIds) => {
  return axios.delete('/api/users/unlike/', {data: userAndpanelIds})
};

export const authorRoot = (userAndpanelIds) => {
  return axios.patch('/api/users/author_root/1', userAndpanelIds)
};

export const unauthorRoot = (userAndpanelIds) => {
  return axios.patch('/api/users/unauthor_root/1', {data: userAndpanelIds})
};