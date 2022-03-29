import axios from 'axios'

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

export {
    getAllUsers
}