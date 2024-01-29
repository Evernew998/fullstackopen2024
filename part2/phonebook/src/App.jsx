import { useState, useEffect } from 'react'
import contactService from './services/contacts'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)
  const [notificationObject, setNotificationMessage] = useState({ status: "error", message: "success" })

  useEffect(() => {
    contactService
      .getAll()
      .then(contacts => {
        setPersons(contacts)
        setPersonsToShow(contacts)
      })
  }, [])

  const addContact = (event) => {
    event.preventDefault()

    const personFromDb = persons.find(person => person.name === newName)

    if (personFromDb !== undefined) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

        const personObject = 
        { 
          name: personFromDb.name,
          number: newNumber,
          id: personFromDb.id
        }

        contactService
          .update(personObject.id, personObject)
          .then(updatedPerson => {
            const newPersonsList = persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson)

            setPersons(newPersonsList)
            setPersonsToShow(newPersonsList)

            const newNotificationObject = { status: "success", message: `Updated ${updatedPerson.name}'s number` }
            setNotificationMessage(newNotificationObject)

            setTimeout(() => {
              setNotificationMessage(null)
            }, 4000)
          })
        return
      }
      return
    }

    const personObject = 
      { 
        name: newName,
        number: newNumber,
      }
    
    contactService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setPersonsToShow(persons.concat(returnedPerson))

        const newNotificationObject = { status: "success", message: `Added ${returnedPerson.name}` }
        setNotificationMessage(newNotificationObject)

        setTimeout(() => {
          setNotificationMessage(null)
        }, 4000)
      })
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

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      console.log(`deleting ${person.name}`)
      contactService
        .deleteContact(person.id)
        .then(deletedPerson => {
          const newPersonsList = persons.filter(person => person.id !== deletedPerson.id)
          setPersons(newPersonsList)
          setPersonsToShow(newPersonsList)
        })
        .catch(error => {
          const newPersonsList = persons.filter(person => person.id !== deletedPerson.id)
          setPersons(newPersonsList)
          setPersonsToShow(newPersonsList)

          const newNotificationObject = { status: "error", message: `Information of ${person.name} has already been remove from the server` }
          setNotificationMessage(newNotificationObject)
  
          setTimeout(() => {
            setNotificationMessage(null)
          }, 4000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notificationObject={notificationObject} />
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
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App