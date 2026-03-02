import React from "react";
import iconDrizzle from "../assets/images/icon-drizzle.webp";
import iconFog from "../assets/images/icon-fog.webp";
import iconOvercast from "../assets/images/icon-overcast.webp";
import iconPartlyCloudy from "../assets/images/icon-partly-cloudy.webp";
import iconRain from "../assets/images/icon-rain.webp";
import iconSnow from "../assets/images/icon-snow.webp";
import iconStorm from "../assets/images/icon-storm.webp";
import iconSunny from "../assets/images/icon-Sunny.webp";

const Today = ({ location, weatherData, units, values, loading }) => {
  let weatherCode = weatherData.current?.weather_code;
  let icon;
  switch (weatherCode) {
    case 0:
      icon = iconSunny;
      break;
    case 1:
    case 2:
      icon = iconPartlyCloudy;
      break;
    case 3:
      icon = iconOvercast;
      break;
    case 45:
    case 48:
      icon = iconFog;
      break;
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      icon = iconDrizzle;
      break;
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
      icon = iconRain;
      break;
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      icon = iconSnow;
      break;
    case 80:
    case 81:
    case 82:
      icon = iconRain;
      break;
    case 95:
    case 96:
    case 99:
      icon = iconStorm;
      break;
    default:
      icon = iconSunny;
  }
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
