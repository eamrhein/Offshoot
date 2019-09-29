import axios from 'axios';

export const createComment = (id, comment) => {
  return axios.patch(`/api/panels/${id}`, comment)
};

export const deleteComment = (panelId, commentId) => {
  return axios.patch(`/api/panels/${panelId}`, {data: {
    id: commentId,
  }})
};