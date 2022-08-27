import { useState } from 'react';
import Filter from './components/Filter';
import CountryDisplay from './components/CountryDisplay';

const App = () => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (e) => setFilter(e.target.value.toLowerCase());
  const handleButtonChange = (e) => setFilter(e.target.id.toLowerCase());

  return (
    <div>
      <Filter handleFilterChange={handleFilterChange} />
      <CountryDisplay filter={filter} handleClick={handleButtonChange}/>
    </div>
  );
};

export default App;
