import { useEffect, useState } from 'react'
import countriesServices from './services/countries'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState(countries)

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
    </div>
    
  )
}

export default App
