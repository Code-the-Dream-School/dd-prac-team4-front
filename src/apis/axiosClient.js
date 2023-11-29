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

// Only to be used by the react-auth-context AuthProvider code
// Applied so that we don't need to get the user from the auth hook
export const transformAuthResponse = [
  // first let axios's default transformResponse handle the parsing of the JSON response
  ...axios.defaults.transformResponse,
  function (parsedResponse) {
    try {
      // Only handle responses that have a `user` property in `response.data`
      if (parsedResponse.hasOwnProperty('user')) {
        // In some places in our frontend code we're calling user._id, in other places user.userId
        // The difference is due to the fact that our auth endpoints (eg: login, register) return a user object with a userId property
        // But our user endpoints (eg: showCurrentUser, getUser) return a user object with a _id property
        // We don't want to have to worry about this difference in our frontend code, so we'll make sure that the user object always has both properties
        if (parsedResponse.user?.userId && !parsedResponse.user?._id) {
          parsedResponse.user._id = parsedResponse.user.userId;
        }
        if (parsedResponse.user?._id && !parsedResponse.user?.userId) {
          parsedResponse.user.userId = parsedResponse.user._id;
        }
        // return the info _inside_ response.data.user, so that it can be used by the auth hook
        // Now we can do `const { user } = useAuth(); console.log(user._id);` instead of having to do `console.log(user.user._id)`
        return parsedResponse.user;
      }

      // If the response doesn't have a `user` property, then we don't need to do anything, just return it as-is
      return parsedResponse;
    } catch (err) {
      console.error('Error while parsing auth user response: ', err);
      return parsedResponse;
    }
  },
];

export default axiosInstance;
