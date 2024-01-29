import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (person) => {
    const request = axios.post(baseUrl, person)
    return request.then(response => response.data)
}

const deleteContact = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data).catch(error => error)
}

const update = (id, person) => {
    const request = axios.put(`${baseUrl}/${id}`, person)
    return request.then(response => response.data)
}

export default { getAll: getAll, create: create, deleteContact: deleteContact, update: update }