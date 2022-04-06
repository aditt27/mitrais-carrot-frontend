import axios from "axios";

const baseURL = 'http://localhost:8081/api/v1/group'

export async function addGroup(params) {
    return axios.post(baseURL, {
        groupName: params.groupName,
        managerId: params.managerId,
        notes: params.notes,
        points: params.points
    })
    .then((response => {
        if(response) {
            return response.data
        }
    }))
    .catch(err => console.log(err))
}

export async function editGroup(params) {
    return axios.put(`${baseURL}/${params.groupId}`, {
        groupName: params.groupName,
        managerId: params.managerId,
        notes: params.notes,
        points: params.points
    })
    .then((response => {
        if(response) {
            return response.data
        }
    }))
    .catch(err => console.log(err))
}

export async function deleteGroup(deleteId) {
    return axios.delete(`${baseURL}/${deleteId}`)
    .then((response => {
        if(response) {
            return response.data
        }
    }))
    .catch(err => console.log(err))
}

export async function addToGroup(params) {
    console.log(params.userIds)
    return axios.post(`${baseURL}/${params.groupId}/add-user`, {
        userIds: params.userIds
    })
    .then((response => {
        if(response) {
            return response.data
        }
    }))
    .catch(err => console.log(err))
}

export async function removeFromGroup(params) {
    console.log(params.userIds)
    return axios.delete(`${baseURL}/${params.groupId}/remove-user`, {
        data: {userIds: params.userIds}
    })
    .then((response => {
        if(response) {
            return response.data
        }
    }))
    .catch(err => console.log(err))
}