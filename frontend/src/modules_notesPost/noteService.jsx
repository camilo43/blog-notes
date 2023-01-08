import axios from 'axios'
const baseUrl = 'http://localhost:3002/api/'

const getAll = () => { 
  //axios.get(`${baseUrl}notes`).then(response => console.log("GET_RESPONSE",response.data))
    return axios.get(`${baseUrl}notes`).then(response => response.data)
  }
  
  const create = (newObject) => {
    //axios.post(`${baseUrl}notes`, newObject).then(response => console.log("POST_AXIOS", response.data))
    return axios.post(`${baseUrl}notes`, newObject).then(response => response)
  }
  
  const update = (id, newObject) => {
    //axios.put(`${baseUrl}notes/${id}`, newObject).then(response => console.log("PUT_AXIOS", response))
    return axios.put(`${baseUrl}notes/${id}`, newObject).then(response => response.data)
  }

  const deleting = (id) => {
    return axios.delete(`${baseUrl}notes/${id}`).then(response => response.data)
  }

 export const noteService = { 
    getAll, 
    create, 
    update,
    deleting 
  }

 
 