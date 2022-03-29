import axios from 'axios'

const endpoint = 'http://localhost:8081/api/v1/transaction'

async function getAllTransactions(page) {
    let result = {
        transactions: [],
        page: 0,
        totalPages: 0
    }
    await axios.get(`${endpoint}?page=${page}`).then(res => {
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

async function createNewTransaction(data) {
    const { senderId, receiverId, amount, notes } = data
    const requestBody = JSON.stringify({
        senderId,
        receiverId,
        amount,
        notes: notes
    })
    let result
    await axios.post(endpoint, requestBody, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        result = res.data.message
    }).catch(e => console.log(e))
    return result
}

export {
    getAllTransactions, createNewTransaction
}