import axios from 'axios'
import store from '../stores'

const endpoint = 'http://localhost:8081/api/v1/user'

function getAllUsers() {
    return axios.get(`${endpoint}?page=-1`, { method: 'GET'}).then(res => {
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

async function getUsersByFilter(filter = 'default', page) {
    let url
    switch (filter) {
        case 'carrot': {
            url = `${endpoint}?filterBy=carrot&page=${page}`
            break
        }
        case 'most_spent': {
            url = `${endpoint}/most_spent?page=${page}`
            break
        }
        case 'most_earn_month': {
            url = `${endpoint}/most_earn?period=month&page=${page}`
            break
        }
        case 'most_earn_year': {
            url = `${endpoint}/most_earn?period=year&page=${page}`
            break
        }
        default:
            url = `${endpoint}?page=${page}`
            break
    }
    
    const result = {
        staffList: [],
        page: 0,
        totalPages: 0
    }

    await axios.get(url).then(res => {
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

async function getUserByUsername() {
    const username = getCurrentUsername()
    let result = {}
    await axios.get(`${endpoint}/${username}`).then(res => {
        if (res.data.message === 'Success') {
            result = res.data.result
        }
    }).catch(e => {})
    return result
}

function getCurrentUsername() {
    const { userData } = store.getState().authReducer
    const username = userData.sub
    return username
}

function getCurrentUserId() {
    const { userData } = store.getState().authReducer
    const userId = userData.id
    return userId
}

export {
    getAllUsers, getUsersByFilter, getCurrentUserId, getUserByUsername
}