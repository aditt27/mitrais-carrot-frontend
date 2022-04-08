import axios from "axios";
import apiClient from ".";

// const baseURL = 'http://localhost:8081/api/v1/barn'

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
        if(response) {
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
