import axios from 'axios';

export const createComment = (id, comment) => {
  return axios.patch(`/api/panels/create-comment/${id}`, comment)
};

export const deleteComment = (panelId, commentId) => {
  return axios.patch(`/api/panels/delete-comment/${panelId}`, commentId)
};