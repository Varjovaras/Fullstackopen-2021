import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchBar = ({ filter, handleSearchChange }) => {
  return (
    <form>
      <div>
        search for country:{" "}
        <input value={filter} onChange={handleSearchChange} />{" "}
      </div>
    </form>
  );
};

const Country = ({ country, handleClick }) => {
  return (
    <li>
      {country.name}{" "}
      <button onClick={() => handleClick(country.name)}>show</button>
    </li>
  );
};

const CountryDetails = ({ country, weatherData }) => {
  return (
    <>
      <h1>{country.name}</h1>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <h2>Languages</h2>
      {country.languages.map((language) => (
        <li key={language.name}>{language.name}</li>
      ))}
      <img
        src={country.flag}
        alt={`Flag of ${country.name}`}
        width="150px"
        height="100px"
      />
    </>
  );
};

const WeatherData = ({ weatherData }) => {
  console.log(weatherData);
  return (
    <div>
      <h2>{weatherData?.location.name}</h2>

      <div>temperature: {weatherData?.current.temperature} degrees celcius</div>
      <div>
        <img src={weatherData?.current.weather_icons} alt=""></img>
      </div>
      <div>
        wind: {weatherData?.current.wind_speed} km/h direction{" "}
        {weatherData?.current.wind_dir}{" "}
      </div>
    </div>
  );
};

const ListCountries = ({
  countries,
  handleClick,
  weatherData,
  setWeatherData,
}) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countries.length > 1 && countries.length <= 10) {
    return (
      <ul>
        {countries.map((country) => (
          <Country
            key={country.name}
            country={country}
            handleClick={handleClick}
          />
        ))}
      </ul>
    );
  } else {
    return (
      <>
        {countries.map((country) => (
          <CountryDetails key={country.name} country={country} />
        ))}
        <WeatherData weatherData={weatherData} />
      </>
    );
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      if (search !== "") {
        const searchResult = response.data.filter((country) =>
          country.name.toLowerCase().includes(search.toLowerCase())
        );
        setCountries(searchResult);
      } else setCountries(response.data);
    });
  }, [search]);

  useEffect(() => {
    const baseUrl = "http://api.weatherstack.com/current";

    const api_key = process.env.REACT_APP_API_KEY;
    if (countries.length === 1) {
      const capital = countries.map((country) => country.capital);
      if (capital[0]) {
        axios
          .get(`${baseUrl}?access_key=${api_key}&query=${capital[0]}`)
          .then((response) => {
            setWeatherData(response.data);
          });
      }
    }
  }, [countries]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleClick = (countryName) => {
    setSearch(countryName);
  };

  return (
    <div>
      <SearchBar handleSearchChange={handleSearchChange} search={search} />
      <ListCountries
        countries={countries}
        handleClick={handleClick}
        weatherData={weatherData}
      />{" "}
    </div>
  );
};

export default App;
