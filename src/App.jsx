import React from "react";
import { useState, useEffect } from "react";
import { fetchForecast, UNIT_PRESETS } from "./api";
import Header from "./components/Header";
import Main from "./components/Main";
import Error from "./components/Error";

const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [matches, setMatches] = useState([]);
  const [location, setLocation] = useState({});
  const [unitSystem, setUnitSystem] = useState("metric");
  const [units, setUnits] = useState(UNIT_PRESETS.metric);
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

  useEffect(() => {
    if (!location?.lat || !location?.lon) return;

    const controller = new AbortController();
    setLoading(true);
    fetchForecast(
      location.lat,
      location.lon,
      UNIT_PRESETS[unitSystem],
      controller.signal,
    )
      .then((data) => {
        setWeatherData(data);
        setServerError(false);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setServerError(true);
        setLoading(false);
      });

    return () => controller.abort();
  }, [location, unitSystem]);

  return (
    <main>
      <Header
        unitSystem={unitSystem}
        setUnitSystem={setUnitSystem}
        units={units}
        setUnits={setUnits}
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
