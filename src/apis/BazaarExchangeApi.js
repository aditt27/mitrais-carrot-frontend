import apiClient from ".";


export async function exchangeBazaarItem(userId, itemId) {
    return apiClient
        .post('/exchange', {
            itemId,
            userId
        })
        .then((response=> {
            if(response) {        
                return response.data
            }
            return false
        }))
        .catch(err => console.log(err))
}