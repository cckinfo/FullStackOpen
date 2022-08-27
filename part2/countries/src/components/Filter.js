const Filter = ({ handleFilterChange }) => (
  <div>
    Find countries:
    <input onChange={handleFilterChange} />
  </div>
);

export default Filter;
