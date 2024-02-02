import axios from "axios"
const baseUrl = "https://api.openweathermap.org/data/2.5"
const units = "metric"
const APIKey = import.meta.env.VITE_SOME_KEY

const getCountryWeather = (country) => {
    console.log(`getting weather for ${country.name.common}`)

    const capitalCity = country.capital

    console.log(`${country.name.common}'s capital city is ${capitalCity}`)
    const request = axios.get(`${baseUrl}/weather?q=${capitalCity}&appid=${APIKey}&units=${units}`)
    return request.then(response => response.data)
}

export default { getCountryWeather: getCountryWeather }