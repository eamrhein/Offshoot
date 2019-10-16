import axios from 'axios';

export const createPanel = panel => {
  return axios.post('/api/panels', panel);
};

export const fetchPanel = id => {
  return axios.get(`/api/panels/${id}`);
};

export const updatePanel = (panel) => {
  return axios.patch(`/api/panels/${panel.id}`, panel);
};

export const fetchPanels = (optionalArg) => {
  return axios.get(`/api/panels/`, {params: {panelsArray: optionalArg}});
};