import axios from 'axios'
import { getAccessToken, getRefreshToken, removeToken, setToken } from '../utils/HelperFunctions'

const baseURL = 'https://mcarrot-be-run-wprlmo75qa-et.a.run.app/api/v1'


let apiClient = axios.create({
  baseURL: baseURL
})

apiClient.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${getAccessToken()}`
  return config
})

apiClient.interceptors.response.use((response) => {
  return response
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 403 && !originalRequest._retry) {
    originalRequest._retry = true;
    const res = await axios.get(baseURL + '/auth/refresh-token', {
      headers: {
        Authorization: `Bearer ${getRefreshToken()}`
      }
    }).catch((error) => {
      removeToken();
      window.location.reload();
    });

    if (res.status === 200) {
      setToken(res.data)
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${getAccessToken()}`
      return apiClient(originalRequest)
    }
  }

  return Promise.reject(error);
});

export default apiClient
