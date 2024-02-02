import { useEffect, useState } from 'react'
import countriesServices from './services/countries'
import Countries from './components/Countries'
import Filter from './components/Filter'
import weatherServices from './services/weather'
import Weather from './components/Weather'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState(countries)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countriesServices.getAll()
    .then(allCountries => {
      console.log("Modifying countries state")

      allCountries.map(country => {
        country["showDetails"] = false;
        return country
      })
      setCountries(allCountries)
    })
  },[])

  const handleFilter = (event) => {
    const filterWord = event.target.value
    console.log(filterWord)

    if (filterWord === "") {
      setCountriesToShow([])
      return
    }

    const filteredCountries = 
      countries.filter(c => {
        const commonCountryName = c.name.common.toLowerCase()

        if (commonCountryName.includes(filterWord)) {
          return true
        }
        return false
      })
    console.log("filteredCountries: ", filteredCountries)
    setCountriesToShow(filteredCountries)

    let weatherObject = null

    if (filteredCountries.length !== 1) {
      console.log("weatherObject is ", weatherObject)
      setWeather(weatherObject)
      return
    }

    if (filteredCountries.length === 1) {
      console.log(`There is only one country, ${filteredCountries[0].name.common}`)

      weatherServices.getCountryWeather(filteredCountries[0])
        .then(countryWeather => {
          console.log(`temperature in ${filteredCountries[0].name.common} = ${countryWeather.main.temp}`)
          console.log(`wind speed in ${filteredCountries[0].name.common} = ${countryWeather.wind.speed}`)
          
          const iconUrl = `https://openweathermap.org/img/wn/${countryWeather.weather[0].icon}@2x.png`
          console.log(`iconUrl = ${iconUrl}`)
          const windSpeed = countryWeather.wind.speed
          const temperature = countryWeather.main.temp
          const capitalCity = filteredCountries[0].capital
          
          weatherObject = {
            iconUrl: iconUrl,
            temperature: temperature,
            windSpeed: windSpeed,
            capitalCity: capitalCity
          }

          console.log("weatherObject is ", weatherObject)
          setWeather(weatherObject)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  const toggleShowDetails = country => {
    country.showDetails = !country.showDetails
    console.log(`${country.name.common}'s showDetails is ${country.showDetails}`)

    const updatedCountries = countries.map(c => c.name.common != country.name.common ? c : country)
    setCountries(updatedCountries)
  }

  return (
    <div>
        <Filter handleFilter={handleFilter}/>
        <div>
        {
          <Countries 
            countries={countriesToShow} 
            toggleShowDetails={toggleShowDetails}
          />
        }
        </div>
        <Weather weatherObject={weather} />
    </div>
    
  )
}

export default App
