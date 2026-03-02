import React from "react";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Error from "./components/Error";

const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [matches, setMatches] = useState([]);
  const [location, setLocation] = useState({});
  const [unitSystem, setUnitSystem] = useState("metric");
  const [units, setUnits] = useState({
    temperature: (unitSystem === "metric" ? "celsius" : "fahrenheit") || "",
    windSpeed: (unitSystem === "metric" ? "kmh" : "mph") || "",
    precipitation: (unitSystem === "metric" ? "mm" : "inch") || "",
  });
  const [values, setValues] = useState({
    temperature: "",
    apparentTemp: "",
    windSpeed: "",
    precipitation: "",
    hourlyTemp: [],
    minDailyTemp: [],
    maxDailyTemp: [],
  });
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  function mouseDown(e) {
    const target = e.currentTarget;
    if (e.target.classList.contains("search-box")) {
      target.classList.add("focused");
    } else if (e.target.classList.contains("search-button")) {
      target.classList.add("button-clicked");
    } else {
      target.classList.add("clicked");
    }
  }

  function mouseUp(e) {
    const target = e.currentTarget;
    if (e.target.classList.contains("search-box")) {
      target.classList.remove("focused");
    } else if (e.target.classList.contains("search-button")) {
      target.classList.remove("button-clicked");
    } else {
      target.classList.remove("clicked");
    }
  }

  function fetchWeatherData(lat, lon, unitSystem) {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_min,temperature_2m_max,weather_code&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,weather_code&temperature_unit=${unitSystem === "metric" ? "celsius" : "fahrenheit"}&windspeed_unit=${unitSystem === "metric" ? "kmh" : "mph"}&precipitation_unit=${unitSystem === "metric" ? "mm" : "inch"}&timezone=auto`,
      setLoading(true)
    )
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data);
        setServerError(false);
      }).then(()=>{setLoading(false)})
      .catch(() => {
        setServerError(true);
      });
  }

  useEffect(()=> {
    console.log(loading)
  }, [loading])

  useEffect(() => {
    if (location && location.lat && location.lon) {
      fetchWeatherData(location.lat, location.lon, unitSystem);
    }
  }, [location, unitSystem]);

  return (
    <main>
      <Header
        unitSystem={unitSystem}
        setUnitSystem={setUnitSystem}
        units={units}
        setUnits={setUnits}
        fetchWeatherData={fetchWeatherData}
        location={location}
        values={values}
        setValues={setValues}
        mouseDown={mouseDown}
        mouseUp={mouseUp}
      />
      {serverError === true ? (
        <Error setServerError={setServerError} 
          setMatches={setMatches}
          setSearchQuery={setSearchQuery}
          setLocation={setLocation}
          setWeatherData={setWeatherData}
        />
      ) : (
        <Main
          weatherData={weatherData}
          searchQuery={searchQuery}
          matches={matches}
          setMatches={setMatches}
          location={location}
          setSearchQuery={setSearchQuery}
          setLocation={setLocation}
          serverError={serverError}
          setServerError={setServerError}
          fetchWeatherData={fetchWeatherData}
          units={units}
          values={values}
          mouseDown={mouseDown}
          mouseUp={mouseUp}
          loading={loading}
        />
      )}
    </main>
  );
};

export default App;
