import { useState } from 'react'

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
        <h2>add a new</h2>
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)

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