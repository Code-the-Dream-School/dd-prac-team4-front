import axios from './axiosClient';

export const resetPassword = async ({ token, password }) => {
  try {
    const response = await axios.post('/api/v1/auth/resetPassword', {
      token,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
