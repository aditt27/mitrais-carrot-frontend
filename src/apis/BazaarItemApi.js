import apiClient from ".";

export async function getBazaarItem(isPaginated, currentPage, itemPerPage, isAdmin) {
    return apiClient
        .get('/item', { params: {
            isPaginated: isPaginated,
            page: currentPage,
            size: itemPerPage,
            isAdmin: isAdmin
        }})
        .then((response=> {
            console.log('getBazaarItem', response)
            if(response) {        
                return response.data
            }
            return false
        }))
        .catch(err => console.log(err))
}