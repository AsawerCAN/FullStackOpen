const CountryDetails = ({ country, weather }) => {
  if (!country) return null;

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area} km²</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width="100"
      />
      <h3>Weather in {country.capital[0]}:</h3>
      {weather ? (
        <div>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather icon"
          />
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default CountryDetails;
