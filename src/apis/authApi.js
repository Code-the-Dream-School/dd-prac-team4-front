import axios from './axiosClient';

export const resetPassword = async ({ passwordToken, newPassword }) => {
  const response = await axios.post('/auth/resetPassword', {
    passwordToken,
    newPassword,
  });
  return response.data;
};
