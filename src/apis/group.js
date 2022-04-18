import apiClient from ".";

export async function getGroups(isPaginated) {
    return apiClient.get('/group', {
        params: {
            isPaginated: isPaginated
        }
    }
    )
    .then((response => {
        if (response) {
            return response.data
        }
    }))
    .catch(err => console.log(err))
}

export async function addGroup(params) {
    return apiClient.post('/group', {
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
    return apiClient.put(`/group/${params.groupId}`, {
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
    return apiClient.delete(`/group/${deleteId}`)
    .then((response => {
        if(response) {
            return response.data
        }
    }))
    .catch(err => console.log(err))
}

export async function addToGroup(params) {
    // console.log(params.userIds)
    return apiClient.post(`/group/${params.groupId}/add-user`, {
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
    // console.log(params.userIds)
    return apiClient.delete(`/group/${params.groupId}/remove-user`, {
        data: {userIds: params.userIds}
    })
    .then((response => {
        if(response) {
            return response.data
        }
    }))
    .catch(err => console.log(err))
}