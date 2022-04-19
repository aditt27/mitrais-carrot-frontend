import apiClient from ".";

export async function addBarn(params) {
    return apiClient.post('/barn', {
        year: params.year,
        totalCarrot: params.totalCarrot,
        shareExpireDate: params.shareExpireDate,
        exchangeExpireDate: params.exchangeExpireDate,
        createdByUserId: params.creatorId,
        createdDate: Date.now().toString()
    })
        .then((response => {
            if (response) {
                return response.data
            }
        }))
        .catch(err => console.log(err))
}

export async function addMoreCarrot(params) {
    return apiClient.put(`/barn/add-carrot/${params.barnId}`, {
        toAdd: params.toAdd
    })
        .then((response => {
            if (response) {
                return response.data
            }
        }))
        .catch(err => console.log(err))
}

export async function extendExpiryDate(params) {
    return apiClient.put(`/barn/exp-date/${params.barnId}`, {
        newShareExpireDate: params.shareExpireDate,
        newExchangeExpireDate: params.exchangeExpireDate
    })
        .then((response => {
            if (response) {
                return response.data
            }
        }))
        .catch(err => console.log(err))
}

export async function getActiveBarn() {
    return apiClient.get(`/barn`, {
        params: {
            filterBy: 'active-only'
        }
    })
        .then((response) => {
            if (response.data.message === 'Success') {
                const data = response.data.result
                const contents = data.currentPageContent
                return contents[0]
            }
            return response.data
        })
        .catch(err => console.log(err))
}

export async function getBarns(paginated) {
    return apiClient.get(`/barn`, {
        params: {
            paginated: paginated
        }
    })
        .then((response) => {
            if (response.data.message === 'Success') {
                const data = response.data.result
                const contents = data.currentPageContent
                return contents.map(u => {
                    return {
                        id: u.id,
                        year: u.year,
                        totalCarrot: u.totalCarrot,
                        carrotLeft: u.carrotLeft,
                        shareExpireDate: u.shareExpireDate,
                        exchangeExpireDate: u.exchangeExpireDate,
                        isActive: u.isActive,

                    }
                })
            }
        })
        .catch(err => console.log(err))
}

export async function setActiveBarn(barnId){
    return apiClient.put(`/barn/set-active-barn?barnId=${barnId}`)
    .then((res) => {
        if(res) {
            return res.data
        }
        return false
    })
    .catch(err => console.log(err))
}
