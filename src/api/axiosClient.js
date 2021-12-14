import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://api.ezfrontend.com/',
  headers: {
    'Content-type': 'application/json',
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { config, data, status } = error.response;
    const URLS = ['/auth/local/register', '/auth/local']
    if (URLS.includes(config.url) && status === 400) {
      const dataList = data.data || [];
      const errorList = dataList.length > 0 ? dataList[0] : {};
      const messageList = errorList.messages || [];
      const messageFirst = messageList.length > 0 ? messageList[0] : {};
      throw new Error(messageFirst.message);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
