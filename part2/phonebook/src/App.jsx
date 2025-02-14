import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import {
  getAllPersons,
  createPerson,
  deletePerson,
  updatePerson,
} from "./services/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    getAllPersons().then((data) => setPersons(data));
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotificationMessage(`Deleted ${name}`);
          setTimeout(() => setNotificationMessage(null), 3000);
        })
        .catch((error) => {
          setErrorMessage(
            `Information of ${name} has already been removed from the server`
          );
          setTimeout(() => setErrorMessage(null), 3000);
          console.error(error);
        });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        updatePerson(existingPerson.id, updatedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? response : person
              )
            );
            setNotificationMessage(`Updated ${newName}'s number`);
            setTimeout(() => setNotificationMessage(null), 5000);
          })
          .catch((error) => {
            setErrorMessage(`Failed to update ${newName}'s number`);
            setTimeout(() => setErrorMessage(null), 5000);
            console.log(error);
          });
      }
    } else {
      createPerson({ name: newName, number: newNumber })
        .then((returnedPerson) => {
          setPersons([...persons, returnedPerson]);
          setNewName("");
          setNewNumber("");
          setNotificationMessage(`Added ${newName}`);
          setTimeout(() => setNotificationMessage(null), 5000);
        })
        .catch((error) => {
          setErrorMessage(`Failed to add ${newName}`);
          setTimeout(() => setErrorMessage(null), 5000);
          console.log(error);
        });
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type="success" />
      <Notification message={errorMessage} type="error" />
      <Filter value={filter} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} onDelete={handleDelete} />
    </div>
  );
};

export default App;
