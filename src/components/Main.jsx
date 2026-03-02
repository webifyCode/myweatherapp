import React from "react";
import Search from "./Search";
import Today from "./Today";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";

const Main = ({
  searchQuery,
  setSearchQuery,
  matches,
  setMatches,
  location,
  setLocation,
  serverError,
  setServerError,
  weatherData,
  fetchWeatherData,
  units,
  values,
  mouseDown,
  mouseUp,
  loading
}) => {
  return (
    <>
      <div className="top-section">
        <h1>How's the sky looking today?</h1>
        <Search
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          location={location}
          setLocation={setLocation}
          matches={matches}
          setMatches={setMatches}
          serverError={serverError}
          setServerError={setServerError}
          fetchWeatherData={fetchWeatherData}
          mouseDown={mouseDown}
          mouseUp={mouseUp}
        />
      </div>
      <div className="bottom-section">
        <Today
          location={location}
          weatherData={weatherData}
          units={units}
          values={values}
          loading={loading}
        />
        <HourlyForecast
          weatherData={weatherData}
          values={values}
          mouseDown={mouseDown}
          mouseUp={mouseUp}
        />
        <DailyForecast
          weatherData={weatherData}
          units={units}
          values={values}
        />
      </div>
    </>
  );
};

export default Main;
