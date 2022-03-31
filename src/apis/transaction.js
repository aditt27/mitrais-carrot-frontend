import store from '../stores'
import apiClient from '.'

async function getAllTransactions(page, isManager = true) {
    let result = {
        transactions: [],
        page: 0,
        totalPages: 0
    }

    const { userData } = store.getState().authReducer
    const userId = userData.id

    await apiClient.get(`/transaction?userId=${userId}&page=${page}`).then(res => {
        if (res.data.message === 'Success') {
            const data = res.data.result
            const tr = data.currentPageContent
            let i = 1
            if (isManager) {
                tr.forEach((t) => {
                    result.transactions.push({
                        no: i++,
                        rewardedTo: t.receiver.name,
                        carrot: t.amount,
                        note: t.notes,
                        rewardedAt: t.transactionDate
                    })
                })
            } else {
                tr.forEach((t) => {
                    result.transactions.push({
                        no: i++,
                        earnedFrom: t.sender.name,
                        total: t.amount,
                        date: t.transactionDate,
                        note: t.notes
                    })
                })
            }
            result.totalPages = data.totalPages
            result.page = data.currentPage
        }
    })
    return result
}

async function createNewTransaction(data) {
    const { userData } = store.getState().authReducer
    const senderId = userData.id
    const { receiverId, amount, notes } = data
    const requestBody = JSON.stringify({
        senderId,
        receiverId,
        amount,
        notes: notes
    })
    let result
    await apiClient.post('/transaction', requestBody, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        result = res.data.message
    }).catch(e => console.log(e))
    return result
}

async function getTransactionsByManager(page) {
    const { userData } = store.getState().authReducer
    const managerId = userData.id
    let result = {
        transactions: [],
        totalPages : 0,
        page: 0
    }
    await apiClient.get(`transaction/sender?userId=${managerId}&page=${page}`).then(res => {
        if (res.data.message === 'Success') {
            const data = res.data.result
            const tr = data.currentPageContent
            let i = 1
            tr.forEach((t) => {
                result.transactions.push({
                    no: i++,
                    rewardedTo: t.receiver.name,
                    carrot: t.amount,
                    note: t.notes,
                    rewardedAt: t.transactionDate
                })
            })
            result.totalPages = data.totalPages
            result.page = data.currentPage
        }
    })
    return result
}

async function createNewGroupTransaction(groupId, managerId) {
    let result = 'error'

    await apiClient.post(`transaction/group/${groupId}?manager_id=${managerId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        result = res.data.message
    }).catch(e => {})

    return result
}

export {
    getAllTransactions, createNewTransaction, getTransactionsByManager, createNewGroupTransaction
}