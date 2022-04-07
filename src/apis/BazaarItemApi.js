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

export async function getBazaarItemById(id) {
    return apiClient
        .get(`/item/${id}`)
        .then((response=> {
            if(response) {        
                return response.data
            }
            return false
        }))
        .catch(err => console.log(err))
}

export async function addBazaarItem(req) {
    return apiClient
        .post('/item' , {
            name: req.name,
            description: req.description,
            stockAmount: req.stockAmount,
            exchangeRate: req.exchangeRate,
            expireDate: req.expireDate,
            isAutoApprove: true,
            isActive: true,
            image: req.image,
            userId: req.userId
        })
        .then((response=> {
        if(response) {        
            return response.data
        }
        return false
        }))
        .catch(err => console.log(err))
}

export async function deleteBazaarItem(id, userId) {
    return apiClient
        .delete(`/item/${id}`, {
            data: {
                userId
            }
        })
        .then((response=> {
            if(response) {        
                return response.data
            }
            return false
        }))
        .catch(err => console.log(err))
}

export async function editBazaarItem(req) {
    return apiClient
        .patch(`/item/${req.id}`, {
            name: req.name,
            description: req.description,
            stockAmount: req.stockAmount,
            exchangeRate: req.exchangeRate,
            expireDate: req.expireDate,
            isAutoApprove: req.isAutoApprove,
            isActive: req.isActive,
            image: req.image,
            userId: req.userId
        })
        .then((response=> {
            if(response) {        
                return response.data
            }
            return false
        }))
        .catch(err => console.log(err))
}
