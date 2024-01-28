import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ handleFilter }) => {
  return (
    <div>
        filter shown with<input onChange={handleFilter}/>
    </div>
  )
}

const PersonForm = ({ addContact, handleNameChange, newName, handleNumberChange, newNumber }) => {
  return (
    <form onSubmit={addContact}>
        <div>
          name: <input onChange={handleNameChange} value={newName}/>
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

const Persons = ({ personsToShow }) => {
  return (
    <div>
      {personsToShow.map(person => 
        <Person key={person.id} person={person} />
      )}
    </div>
  )
}

const Person = ({ person }) => {
  return (
    <>
      <p>{person.name} {person.number}</p>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        console.log(response)
        setPersons(response.data)
        setPersonsToShow(response.data)
      })

    console.log("effect")
  }, [])

  console.log("render")

  const addContact = (event) => {
    event.preventDefault()

    const doesPersonExist = persons.find(person => person.name === newName)
    if (doesPersonExist) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const nameObject = 
      { 
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

    setPersons(persons.concat(nameObject))

    setNewName('')
    setNewNumber('')
    setPersonsToShow(persons.concat(nameObject))
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    const nameLowerCase = event.target.value.toLowerCase()
    const personsFiltered = persons.filter(person => {
      const personName = person.name.toLowerCase()

      if (personName.includes(nameLowerCase)) {
        return true
      }
      return false
    })

    setPersonsToShow(personsFiltered)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      <h3>add a new</h3>
      <PersonForm 
        addContact={addContact}
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App