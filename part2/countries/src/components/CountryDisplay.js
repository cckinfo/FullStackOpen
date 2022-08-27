import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Country from './Country';

const CountryDisplay = ({ filter, handleClick}) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    console.log('contacting restapi');
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => setCountries(response.data));
  }, []);

  let matchingCountries = countries.filter((country) => {
    const countryName = country.name.common.toLowerCase();
    return countryName.includes(filter.toLowerCase());
  });

  return (
    <>
      {matchingCountries.length > 10
        ? 'Too many'
        : matchingCountries.map((country, i) => (
            <Country key={country.name.common + i} country={country} length={matchingCountries.length} handleClick={handleClick} />
          ))}
    </>
  );
};

export default CountryDisplay;
