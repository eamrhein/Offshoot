import axios from 'axios';

export const createPanel = panel => {
  return axios.post('/api/panels/', panel);
};

export const fetchPanel = id => {
  return axios.get(`/api/panels/${id}`);
};
