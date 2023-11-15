import axios from './axiosClient';

export const resetPassword = async ({ token, password }) => {
  const response = await axios.post('/auth/resetPassword', {
    token,
    password,
  });
  return response.data;
};
