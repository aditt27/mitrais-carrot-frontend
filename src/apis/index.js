import axiosClient from "./axiosClient";


const Api = {
    login: (params) => {
        const url = '/auth/login';
        return axiosClient.get(url, params);
    },
}

export default Api;