import apiClient from './axiosClient';

const USER_BASE_URL = '/users';

const usersApi = {
  getById: (userId) => {
    return apiClient
      .get(`${USER_BASE_URL}/${userId}`)
      .then((res) => res.data.user);
  },
};

export default usersApi;
