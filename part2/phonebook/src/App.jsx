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
    getAllPersons().then((data) => {
      if (Array.isArray(data)) {
        setPersons(data);
      } else {
        console.error("Data received is not an array:", data);
        setPersons([]);
      }
    });
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      console.log(`Attempting to delete person with id: ${id}, name: ${name}`);

      deletePerson(id)
        .then((response) => {
          console.log(`Delete successful for ${id}`, response);
          setPersons((currentPersons) => {
            console.log("Current persons before filter:", currentPersons);
            const newPersons = currentPersons.filter(
              (person) => person.id !== id
            );
            console.log("Persons after filter:", newPersons);
            return newPersons;
          });
          setNotificationMessage(`Deleted ${name}`);
          setTimeout(() => setNotificationMessage(null), 3000);
        })
        .catch((error) => {
          console.error(`Error deleting ${name}:`, error);
          setErrorMessage(error.message || `Error deleting ${name}`);
          setTimeout(() => setErrorMessage(null), 5000);
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
            setErrorMessage(
              error.message || `Failed to update ${newName}'s number`
            );
            setTimeout(() => setErrorMessage(null), 5000);
            console.error("Update failed:", error);
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
          setErrorMessage(error.message || `Failed to add ${newName}`);
          setTimeout(() => setErrorMessage(null), 5000);
          console.error("Add failed:", error);
        });
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="phonebook-container">
      <h1>Phonebook</h1>

      <Notification message={notificationMessage} type="success" />
      <Notification message={errorMessage} type="error" />

      <div className="filter-section">
        <Filter value={filter} onChange={handleFilterChange} />
      </div>

      <div className="form-section">
        <h2>Add a New Contact</h2>
        <PersonForm
          newName={newName}
          newNumber={newNumber}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
          handleSubmit={handleSubmit}
        />
      </div>

      <div className="contacts-section">
        <h2>Contacts</h2>
        <Persons persons={filteredPersons} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default App;
