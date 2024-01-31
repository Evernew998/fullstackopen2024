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

  return (
    <div>
        <Filter handleFilter={handleFilter}/>
        <div>
        {
          <Countries countries={countriesToShow} />
        }
        </div>
    </div>
    
  )
}

export default App
