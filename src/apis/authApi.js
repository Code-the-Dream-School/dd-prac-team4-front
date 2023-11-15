import axios from './axiosClient';

export const resetPassword = async ({ token, password }) => {
  const response = await axios.post('/api/v1/auth/resetPassword', {
    token,
    password,
  });
  return response.data;
};
