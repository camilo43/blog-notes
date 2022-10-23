import axios from "axios";
const baseUrl = 'http://localhost:3001/'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
  
  const create = newObject => {
    const request = axios.post(`${baseUrl}notes`, newObject)
    return request.then(response => response.data)
  }
  
  const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}notes/${id}`, newObject)
    return request.then(response =>{console.log("RESPONSE", response); return response.data})
  }
  
  const noteService = { 
    getAll: getAll, 
    create: create, 
    update: update 
  }

  export default noteService
 