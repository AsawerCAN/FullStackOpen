const CountryList = ({ countries, onShowCountry }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.cca3}>
          {country.name.common}{" "}
          <button onClick={() => onShowCountry(country)}>Show</button>
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
