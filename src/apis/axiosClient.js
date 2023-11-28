import axios from 'axios';

const envPath = process.env.REACT_APP_API_BASE_PATH;
const axiosInstance = axios.create({
  baseURL: envPath,
  withCredentials: true,
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export const transformAuthResponse = [
  ...axios.defaults.transformResponse,
  function (parsedResponse) {
    try {
      if (parsedResponse.hasOwnProperty('user')) {
        return parsedResponse.user;
      }
      return parsedResponse;
    } catch (err) {
      console.error('Error while parsing show user response: ', err);
      return parsedResponse;
    }
  },
];

export default axiosInstance;
