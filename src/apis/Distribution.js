import apiClient from ".";

export async function postDistribution(userId, amount) {
  return apiClient
    .post('/barn/carrot-distribution', {
      userId, amount
    })
    .then((response => {
      if (response) {
        return response.data
      }
      return false
    }))
    .catch(err => console.log(err))
}

export async function getActiveBarn() {
  return apiClient
    .get('/barn?filterBy=active-only')
    .then((response => {
      if (response) {
        return response.data
      }
      return false
    }))
    .catch(err => console.log(err))
}

export async function getBarnTransaction(page) {
  return apiClient
    .get(`/barn-transaction?page=${page - 1}`)
    .then((response => {
      if (response) {
        return response.data
      }
      return false
    }))
    .catch(err => console.log(err))
}

export async function getManager() {
  return apiClient
    .get('/user?filterBy=role&filterValue=Manager')
    .then((response => {
      if (response) {
        return response.data
      }
      return false
    }))
    .catch(err => console.log(err))
}