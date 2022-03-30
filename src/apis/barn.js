import axios from "axios";

const baseURL = 'http://localhost:8081/api/v1/barn'

export async function addBarn(params) {
    console.log(params)
    return axios.post(baseURL, {
        year: params.year,
        totalCarrot: params.totalCarrot,
        shareExpireDate: params.shareExpireDate,
        exchangeExpireDate: params.exchangeExpireDate,
        createdByUserId: 5,
        createdDate: Date.now().toString()
    })
    .then((response => {
        if(response) {
            console.log(response.data)
            return response.data
        }
    }))
    .catch(err => console.log(err))
}

export async function addMoreCarrot(params) {
    return axios.put(`${baseURL}/add-carrot/${params.barnId}`, {
        toAdd: params.toAdd
    })
    .then((response => {
        if (response) {
            console.log(response.data);
            return response.data
        }
    }))
    .catch(err => console.log(err))
}

export async function extendExpiryDate(params) {
    return axios.put(`${baseURL}/exp-date/${params.barnId}`, {
        newShareExpireDate: params.shareExpireDate,
        newExchangeExpireDate: params.exchangeExpireDate
    })
    .then((response => {
        if (response) {
            console.log(response.data);
            return response.data
        }
    }))
    .catch(err => console.log(err))
 }


async function loadBarn() {

}