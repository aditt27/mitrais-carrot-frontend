import axios from 'axios'

const endpoint = 'http://localhost:8081/api/v1/transaction'

async function getAllTransactions(page) {
    let transactions = []
    await axios.get(`${endpoint}?page=${page}`).then(res => {
        if (res.data.message === 'Success') {
            const data = res.data.result
            const tr = data.currentPageContent
            let i = 1
            tr.forEach((t) => {
                transactions.push({
                    no: i++,
                    rewardedTo: t.receiver.name,
                    carrot: t.amount,
                    note: t.notes,
                    rewardedAt: t.transactionDate
                })
            })
        }
    })
    return transactions
}

function createNewTransaction(data) {
    const { senderId, receiverId, amount, note } = data
    axios.post(endpoint).then(res => {

    }).catch(e => {})
}

export {
    getAllTransactions, createNewTransaction
}