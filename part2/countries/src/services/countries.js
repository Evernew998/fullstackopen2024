import axios from "axios"
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api"

const testPromise = () => {
    console.log("getting countries")

    const request = axios.get(`${baseUrl}/all`)
        .then(response => {
            console.log(response)
            return(response.data)
        })
        .then(response => {
            console.log(response)
        })
        .then(response => {
            console.log(response)
            console.log(request)
        })
}

const getAll = () => {
    console.log("getting all countries")

    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

export default {getAll: getAll}