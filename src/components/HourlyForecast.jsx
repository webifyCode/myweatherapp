import React from "react";
import { getWeatherIcon } from "../weather";
import { useState, useEffect } from "react";
import dropdownIcon from "../assets/images/icon-dropdown.svg";

export const HourlyForecast = ({ weatherData, values, mouseDown, mouseUp }) => {
  const [hours, setHours] = useState(
    weatherData?.hourly?.time.slice(0, 24) || [],
  );

  useEffect(() => {
    if (weatherData && weatherData.hourly) {
      function handleHours() {
        setHours(weatherData.hourly.time.slice(0, 24));
      }
      handleHours();
    }
  }, [weatherData]);

  function chooseDay(e) {
    let day = e.target.innerText;
    if (weatherData && weatherData.hourly) {
      const filteredHours = weatherData.hourly.time.filter((time) => {
        const date = new Date(time);
        return date.toLocaleDateString("en-US", { weekday: "long" }) === day;
      });
      setHours(filteredHours);
    }
  }

  return (
    <div className="hourly-forecast">
      <div className="head">
        <h3>Hourly Forecasts</h3>
        <input
          style={{ display: "none" }}
          type="checkbox"
          name="day-selector"
          id="day-selector-toggle"
        />
        <label htmlFor="day-selector-toggle">
          <div
            className="day-selector"
            onMouseDown={(e) => mouseDown(e)}
            onMouseUp={(e) => mouseUp(e)}
          >
            <div>
              {weatherData.hourly
                ? new Date(hours[0]).toLocaleDateString("en-US", {
                    weekday: "long",
                  })
                : "-"}{" "}
            </div>
            <img src={dropdownIcon} alt="" />
          </div>
        </label>
        <div className="day-selector-options">
          <div
            className="hourly-day"
            onClick={(e) => chooseDay(e)}
            onMouseDown={(e) => mouseDown(e)}
            onMouseUp={(e) => mouseUp(e)}
          >
            Monday
          </div>
          <div
            className="hourly-day"
            onClick={(e) => chooseDay(e)}
            onMouseDown={(e) => mouseDown(e)}
            onMouseUp={(e) => mouseUp(e)}
          >
            Tuesday
          </div>
          <div
            className="hourly-day"
            onClick={(e) => chooseDay(e)}
            onMouseDown={(e) => mouseDown(e)}
            onMouseUp={(e) => mouseUp(e)}
          >
            Wednesday
          </div>
          <div
            className="hourly-day"
            onClick={(e) => chooseDay(e)}
            onMouseDown={(e) => mouseDown(e)}
            onMouseUp={(e) => mouseUp(e)}
          >
            Thursday
          </div>
          <div
            className="hourly-day"
            onClick={(e) => chooseDay(e)}
            onMouseDown={(e) => mouseDown(e)}
            onMouseUp={(e) => mouseUp(e)}
          >
            Friday
          </div>
          <div
            className="hourly-day"
            onClick={(e) => chooseDay(e)}
            onMouseDown={(e) => mouseDown(e)}
            onMouseUp={(e) => mouseUp(e)}
          >
            Saturday
          </div>
          <div
            className="hourly-day"
            onClick={(e) => chooseDay(e)}
            onMouseDown={(e) => mouseDown(e)}
            onMouseUp={(e) => mouseUp(e)}
          >
            Sunday
          </div>
        </div>
      </div>
      <div className={`hours scrollable`}>
        {weatherData.hourly
          ? hours.map((hour) => {
              let i = weatherData.hourly.time.indexOf(hour);

              let weatherCode = weatherData.hourly.weather_code[i];
              const icon = getWeatherIcon(weatherCode);
              return (
                <div className="hour" key={hour}>
                  <img className="weather-icon" src={icon} alt="weather-icon" />
                  <div className="time">
                    {new Date(weatherData.hourly.time[i]).toLocaleTimeString(
                      "en-US",
                      { hour: "numeric", hour12: true },
                    )}
                  </div>
                  <div className="temp">
                    {values.temperature !== undefined &&
                    values.temperature !== ""
                      ? values.hourlyTemp[i] + "°"
                      : Math.floor(weatherData.hourly?.temperature_2m[i]) + "°"}
                  </div>
                </div>
              );
            })
          : Array.from({ length: 24 }).map((_, i) => (
              <div className="hour" key={i}></div>
            ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
