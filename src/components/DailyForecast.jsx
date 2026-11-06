import React from "react";
import { getWeatherIcon } from "../weather";

const DailyForecast = ({ weatherData, values }) => {
  return (
    <div className="daily-forecast">
      <h3>Daily Forecast</h3>
      <div className="forecast">
        {weatherData &&
          weatherData.daily ?
          weatherData.daily.time.map((day, index) => {
            let weatherCode = weatherData.daily.weather_code[index];
            const icon = getWeatherIcon(weatherCode);

            return (
              <div key={index} className="day">
                <div className="day-name">
                  {new Date(day).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </div>
                <img src={icon} alt="weather-icon" />
                <div className="forecast-temp">
                  <div className="max">
                    {values.maxDailyTemp &&
                    values.maxDailyTemp[index] !== undefined
                      ? values.maxDailyTemp[index] + "°"
                      : weatherData
                        ? Math.floor(
                            weatherData.daily.temperature_2m_max[index],
                          ) + "°"
                        : "-"}
                  </div>
                  <div className="min">
                    {values.minDailyTemp &&
                    values.minDailyTemp[index] !== undefined
                      ? values.minDailyTemp[index] + "°"
                      : weatherData
                        ? Math.floor(
                            weatherData.daily.temperature_2m_min[index],
                          ) + "°"
                        : "-"}
                  </div>
                </div>
              </div>
            );
          }) : Array.from({ length: 7 }).map((_, i) => (
              <div className="day" key={i}></div>
            ))}
      </div>
    </div>
  );
};

export default DailyForecast;
