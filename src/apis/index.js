import axios from 'axios'
import { getAccessToken } from '../utils/HelperFunctions'

let apiClient = axios.create({
    baseURL: 'http://localhost:8081/api/v1'
})

apiClient.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${getAccessToken()}`
    return config
})

export default apiClient
