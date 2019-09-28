import axios from 'axios';

export const fetchUserProfile = userId => (
  axios.get(`/api/users/${userId}`)
);