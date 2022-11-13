const Persons = ({ persons, filter, deletePerson }) => {
  console.log(persons);
  const personsToShow = persons
    .filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )
    .map((person) => (
      <div key={person.name}>
        {person.name} {person.number} <button onClick={() => deletePerson(person.id)}>Delete</button>
      </div>
    ));
  return <div>{personsToShow}</div>;
};

export default Persons;
