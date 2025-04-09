const Persons = ({ persons, onDelete }) => {
  console.log("Rendered persons:", persons);

  return (
    <ul>
      {persons.map((person) => {
        console.log(`Person ${person.name}'s id:`, person.id);
        return (
          <li key={person.id}>
            {person.name} {person.number}
            <button
              onClick={() => {
                console.log(
                  `Delete button clicked for ${person.name} with id ${person.id}`
                );
                onDelete(person.id, person.name);
              }}
            >
              delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Persons;
