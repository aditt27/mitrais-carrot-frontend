import apiClient from ".";

export async function getBazaarItem(isPaginated, currentPage, itemPerPage, isAdmin, userId) {
    return apiClient
        .get('/item', { params: {
            isPaginated: isPaginated,
            page: currentPage,
            size: itemPerPage,
            isAdmin: isAdmin,
            userId: userId ? userId : null
        }})
        .then((response=> {
            if(response) {        
                return response.data
            }
            return false
        }))
        .catch(err => console.log(err))
}

