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
export default axiosInstance;
