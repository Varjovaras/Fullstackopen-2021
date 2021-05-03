import React, { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ filter, handleSearchChange }) => {
  return (
    <form>
      <div>
        filter shown with <input value={filter} onChange={handleSearchChange} />{" "}
      </div>
    </form>
  );
};

const Country = ({ country, handleClick }) => {
  return (
    <>
      {country.name}{" "}
      <button onClick={() => handleClick(country.name)}>show</button>
    </>
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
      <WeatherData weatherData={WeatherData} />
    </>
  );
};

const WeatherData = ({ weatherData }) => {
  return (
    <>
      <h2>weather in {weatherData?.location.name}</h2>
      <div>{weatherData?.current.temperature} celsius</div>
    </>
  );
};

const CountryList = ({ countries, handleClick, weatherData }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countries.length > 1 && countries.length <= 10) {
    return (
      <>
        {countries.map((country) => (
          <Country
            key={country.name}
            country={country}
            handleClick={handleClick}
          />
        ))}
      </>
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

  //a48e6f7dca8c2779da151ec1305dd819

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleClick = (countryName) => {
    setSearch(countryName);
  };
  console.log(weatherData);
  return (
    <div>
      <Filter handleSearchChange={handleSearchChange} search={search} />
      <CountryList
        countries={countries}
        handleClick={handleClick}
        weatherData={weatherData}
      />{" "}
    </div>
  );
};

export default App;

//https://github.com/l0ve2cr3ate/fullstack-open-2020/tree/master/part2/data-for-countries
