import { useEffect, useState } from "react";
import { getCountries } from "./services/countries";
import { getWeather } from "./services/weather";
import CountryDetails from "./components/CountryDetails";
import CountryList from "./components/CountryList";

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await getCountries();
      setCountries(data);
    };
    fetchCountries();
  }, []);

  const filteredCountries =
    query.trim() === ""
      ? []
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(query.toLowerCase())
        );

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
    setSelectedCountry(null);
    setWeather(null);
  };

  const showCountryDetails = (country) => {
    setSelectedCountry(country);
    fetchWeatherForCapital(country.capital[0]);
  };

  const fetchWeatherForCapital = async (capital) => {
    if (!capital) return;
    const weatherData = await getWeather(capital);
    setWeather(weatherData);
  };

  const renderContent = () => {
    if (selectedCountry) {
      return <CountryDetails country={selectedCountry} weather={weather} />;
    }

    if (query.trim() === "") {
      return null;
    }

    if (filteredCountries.length > 10) {
      return <p>Too many matches, please specify another filter</p>;
    }

    if (filteredCountries.length === 1) {
      const country = filteredCountries[0];
      fetchWeatherForCapital(country.capital[0]);
      return <CountryDetails country={country} weather={weather} />;
    }

    return (
      <CountryList
        countries={filteredCountries}
        onShowCountry={showCountryDetails}
      />
    );
  };

  return (
    <div>
      <h1>Country Search</h1>
      <div>
        Search: <input value={query} onChange={handleSearchChange} />
      </div>
      {renderContent()}
    </div>
  );
};

export default App;
