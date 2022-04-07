import apiClient from '.'

export function getAllUsers() {
    return apiClient.get(`user?page=-1`).then(res => {
        if (res.data.message === 'Success') {
            const data = res.data.result
            const contents = data.currentPageContent
            return contents.filter(it => it.role === 'Staff').map(u => {
                return {
                    id: u.id,
                    name: u.name
                }
            })
        }
    })
}

export async function getUsersByFilter(filter = 'default', page) {
    let url
    switch (filter) {
        case 'carrot': {
            url = `user?filterBy=carrot&page=${page}`
            break
        }
        case 'most_spent': {
            url = `user/most_spent?page=${page}`
            break
        }
        case 'most_earn_month': {
            url = `user/most_earn?period=month&page=${page}`
            break
        }
        case 'most_earn_year': {
            url = `user/most_earn?period=year&page=${page}`
            break
        }
        default:
            url = `user?page=${page}`
            break
    }
    
    const result = {
        staffList: [],
        page: 0,
        totalPages: 0
    }

    await apiClient.get(url).then(res => {
        if (res.data.message === "Success") {
            const data = res.data.result
            let i = 1
            const staff = data.currentPageContent.length === 0 ? [] : data.currentPageContent.filter(st => st.id > 0).map(it => {
                return {
                    no: i++,
                    username: it.username,
                    name: it.name,
                    role: it.role,
                    carrot: it.total !== undefined ? it.total : it.points
                }
            })
            result.staffList = staff
            result.page = data.currentPage
            result.totalPages = data.totalPages
        }
    }).catch(e => {})

    return result
}

export async function getUserByUsername(username) {
    return apiClient
        .get(`/user/${username}`)
        .then((response=> {
            if(response) {        
                return response.data
            }
            return false
        }))
        .catch(err => console.log(err))
}

export async function getNotificationByUserId(isPaginated, currentPage, itemPerPage, id) {
    return apiClient
        .get(`/user/${id}/notification`, { params: {
            isPaginated: isPaginated,
            page: currentPage,
            size: itemPerPage
        }})
        .then((response=> {
            if(response) {        
                return response.data
            }
            return false
        }))
        .catch(err => console.log(err))
}

export async function addUser(data) {
    let response
    await apiClient.post('/user', JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        response = res.data.message
    }).catch(e => {})
    return response
}

export async function totalSpentForBazaar(userId) {
    return apiClient
        .get(`/user/total_spent/${userId}`)
        .then(res => {
            if(res) {
                return res.data.result.exchangedPoints
            }
        })
        .catch(err => console.log(err))
}