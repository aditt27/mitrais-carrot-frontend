import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:8081/api/v1'
})

export default apiClient