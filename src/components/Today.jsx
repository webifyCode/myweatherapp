import React from "react";
import { getWeatherIcon } from "../weather";

const Today = ({ location, weatherData, units, values, loading }) => {
  let weatherCode = weatherData.current?.weather_code;
  const icon = getWeatherIcon(weatherCode);
  return (
    <div className="today">
      <div className={loading === true ? "today-hero loading" : "today-hero"}>
        <div className="today-locale">
          <div className="today-location">
            {location && location.name && location.country
              ? location.name + ", " + location.country
              : "-"}
          </div>
          <div className="today-date">
            {location.name
              ? new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "-"}
          </div>
        </div>
        <div className="today-weather">
          <img src={icon} alt="weather-icon" className="today-weather-icon" />
          <div className="today-temp">
            {values.temperature !== undefined && values.temperature !== ""
              ? values.temperature + "°"
              : weatherData.current
                ? Math.floor(weatherData.current.temperature_2m) + "°"
                : "-"}
          </div>
        </div>
      </div>
      <div className="today-details">
        <div className="temp-feel">
          Feels like
          <span>
            {values.apparentTemp !== undefined && values.apparentTemp !== ""
              ? values.apparentTemp + "°"
              : weatherData.current
                ? Math.floor(weatherData.current.apparent_temperature) + "°"
                : "-"}
          </span>
        </div>
        <div className="humidity">
          Humidity
          <span>
            {weatherData.current
              ? weatherData.current.relative_humidity_2m + "%"
              : "-"}
          </span>
        </div>
        <div className="wind">
          Wind
          <span>
            {values.windSpeed !== undefined && values.windSpeed !== ""
              ? values.windSpeed + " " + (units.windSpeed === "kmh" ? "km/h" : units.windSpeed)
              : weatherData.current
                ? Math.floor(weatherData.current.wind_speed_10m) + " " + weatherData.current_units?.wind_speed_10m
                : "-"}
          </span>
        </div>
        <div className="precipitation">
          Precipitation
          <span>
            {values.precipitation !== undefined && values.precipitation !== ""
              ? values.precipitation + " " + units.precipitation
              : weatherData.current
                ? Math.floor(weatherData.current.precipitation) + " " + weatherData.current_units?.precipitation
                : "-"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Today;
