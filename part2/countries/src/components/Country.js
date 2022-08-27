import axios from 'axios';
import { useState, useEffect } from 'react';
import CountryData from './CountryData';

const Country = ({ country, length, handleClick }) => {
  const [weather, setWeather] = useState({});
  const api = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&APPID=${api}&units=metric`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [api, country.capital]);

  if (!weather.main || !weather.weather) {
    return;
  }
  console.log("country: ", weather.weather[0].main)


  let show = false;
  const clickToShow = !show ? (
    <div key={country.name.common}>
      {country.name.common}
      <button id={country.name.common} onClick={handleClick}>
        Show
      </button>
    </div>
  ) : (
    <CountryData country={country} weather={weather} />
  );

  return length === 1 ? <CountryData country={country} weather={weather} /> : clickToShow;
};

export default Country;
