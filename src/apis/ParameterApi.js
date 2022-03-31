import apiClient from "."

export async function getParameters() {
    return apiClient
        .get('/parameter')
        .then((response=> {
            if(response) {        
                return response.data
            }
            return false
        }))
        .catch(err => console.log(err))
}