import apiClient from "."

export async function getParameters() {
    return apiClient
        .get('/parameter')
        .then((response=> {
            if(response) {        
                return response.data
            }
            return false
        }))
        .catch(err => console.log(err))
}

export async function editParameter(parameter) {
  return apiClient
      .put(`/parameter/${parameter.id}`, parameter)
      .then((response=> {
          if(response) {        
              return response.data
          }
          return false
      }))
      .catch(err => console.log(err))
}