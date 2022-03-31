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

export async function getExchangeHistoryBazaarItem(isPaginated, currentPage, itemPerPage, filterBy, filterValue) {
    return apiClient
        .get('/exchange', { params: {
            isPaginated,
            page: currentPage,
            size: itemPerPage,
            filterBy,
            filterValue
        }})
        .then((response=> {
            if(response) {        
                return response.data
            }
            return false
        }))
        .catch(err => console.log(err))
}

export async function updateStatusExchangeRequest(exchangeId, exchangeStatus, userId) {
    return apiClient
        .patch(`/exchange/${exchangeId}`, {
            exchangeStatus,
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

