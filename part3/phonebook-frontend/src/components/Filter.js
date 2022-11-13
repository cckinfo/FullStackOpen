
const Filter = ({ setNewFilter }) => (
  <div>
    Filter by: <input onChange={(e) => setNewFilter(e.target.value)} />
  </div>
);

export default Filter;