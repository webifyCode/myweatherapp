import React from "react";
import iconDrizzle from "../assets/images/icon-drizzle.webp";
import iconFog from "../assets/images/icon-fog.webp";
import iconOvercast from "../assets/images/icon-overcast.webp";
import iconPartlyCloudy from "../assets/images/icon-partly-cloudy.webp";
import iconRain from "../assets/images/icon-rain.webp";
import iconSnow from "../assets/images/icon-snow.webp";
import iconStorm from "../assets/images/icon-storm.webp";
import iconSunny from "../assets/images/icon-Sunny.webp";

const DailyForecast = ({ weatherData, values }) => {
  return (
    <div className="daily-forecast">
      <h3>Daily Forecast</h3>
      <div className="forecast">
        {weatherData &&
          weatherData.daily ?
          weatherData.daily.time.map((day, index) => {
            let weatherCode = weatherData.daily.weather_code[index];
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
