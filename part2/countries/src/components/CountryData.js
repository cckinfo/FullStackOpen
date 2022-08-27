const CountryData = ({ country, weather }) => {
  let linkString = "http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png";
  return (
    <div>
      <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population.toLocaleString()}</p>
        <p>Area: {country.area.toLocaleString()} km<sup>2</sup></p>
      <h4>Languages:</h4>
        <ul>
          {Object.values(country.languages).map((lang, i) => (
            <li key={country.name.common + i}>{lang}</li>
          ))}
        </ul>
        <img
          src={country.flags['png']}
          width="200"
          alt={`Flag of ${country.name}`}
        />
      <h3>Weather in {country.capital}</h3>
        <p>{weather.weather.main}</p>
        <p>Temperature: {weather.main.temp} °C</p>
        <p>Weather: {weather.weather[0].main}</p>
        <img src={linkString}></img>
    </div>
  );
};

export default CountryData;
