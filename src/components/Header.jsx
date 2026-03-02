import React from "react";
import { useEffect } from "react";
import logo from "../assets/images/logo.svg";
import unitsIcon from "../assets/images/icon-units.svg";
import dropdownIcon from "../assets/images/icon-dropdown.svg";
import checkMark from "../assets/images/icon-checkmark.svg";

const Header = ({
  unitSystem,
  setUnitSystem,
  fetchWeatherData,
  location,
  units,
  setUnits,
  setValues,
  mouseDown,
  mouseUp,
}) => {
  function handleSystemSwitch() {
    const newUnitSystem = unitSystem === "metric" ? "imperial" : "metric";
    setUnitSystem(newUnitSystem);

    setUnits({
      temperature: newUnitSystem === "metric" ? "celsius" : "fahrenheit",
      windSpeed: newUnitSystem === "metric" ? "kmh" : "mph",
      precipitation: newUnitSystem === "metric" ? "mm" : "inch",
    });
    if (location) {
      fetchWeatherData(location.lat, location.lon, newUnitSystem);
    }
  }

  function handleUnits(e) {
    const target = e.currentTarget;
    const value = target.getAttribute("value");
    if (target.classList.contains("temperature-option")) {
      setUnits((prevUnits) => {
        return { ...prevUnits, temperature: value };
      });
    } else if (target.classList.contains("wind-option")) {
      setUnits((prevUnits) => {
        return { ...prevUnits, windSpeed: value };
      });
    } else if (target.classList.contains("precipitation-option")) {
      setUnits((prevUnits) => {
        return { ...prevUnits, precipitation: value };
      });
    }
  }

  function changeValue() {
    if (!location.lat || !location.lon) {
      return;
    }
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&daily=temperature_2m_min,temperature_2m_max,weather_code&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,weather_code&temperature_unit=${units.temperature}&windspeed_unit=${units.windSpeed}&precipitation_unit=${units.precipitation}&timezone=auto`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.current) return;

        setValues((prevValues) => {
          return {
            ...prevValues,
            temperature: Math.floor(data.current.temperature_2m),
            apparentTemp: Math.floor(data.current.apparent_temperature),
            windSpeed: Math.floor(data.current.wind_speed_10m),
            precipitation: Math.floor(data.current.precipitation),
            hourlyTemp: data.hourly.temperature_2m.map((temp) =>
              Math.floor(temp),
            ),
            minDailyTemp: data.daily.temperature_2m_min.map((temp) =>
              Math.floor(temp),
            ),
            maxDailyTemp: data.daily.temperature_2m_max.map((temp) =>
              Math.floor(temp),
            ),
          };
        });
      });
  }

  useEffect(() => {
    const precipitationOptions = document.querySelectorAll(
      ".precipitation-option",
    );
    const windOptions = document.querySelectorAll(".wind-option");
    const temperatureOptions = document.querySelectorAll(".temperature-option");

    temperatureOptions.forEach((option) => {
      if (option.getAttribute("value") === units.temperature) {
        option.classList.add("selected");
        option.querySelector("img").style.display = "block";
      } else if (units.temperature !== "") {
        option.classList.remove("selected");
        option.querySelector("img").style.display = "none";
      }
    });

    windOptions.forEach((option) => {
      if (option.getAttribute("value") === units.windSpeed) {
        option.classList.add("selected");
        option.querySelector("img").style.display = "block";
      } else if (units.windSpeed !== "") {
        option.classList.remove("selected");
        option.querySelector("img").style.display = "none";
      }
    });

    precipitationOptions.forEach((option) => {
      if (option.getAttribute("value") === units.precipitation) {
        option.classList.add("selected");
        option.querySelector("img").style.display = "block";
      } else if (units.precipitation !== "") {
        option.classList.remove("selected");
        option.querySelector("img").style.display = "none";
      }
    });
    changeValue();
  }, [units]);

  return (
    <header className="header">
      <div className="title">
        <img src={logo} alt="logo" />
      </div>

      <div className="header-menu">
        <input
          style={{ display: "none" }}
          type="checkbox"
          name="header-dropdown"
          id="header-toggle"
        />
        <label htmlFor="header-toggle">
          <div
            className="header-dropdown"
            onMouseDown={(e) => mouseDown(e)}
            onMouseUp={(e) => mouseUp(e)}
          >
            <img src={unitsIcon} alt="dropdown-icon" /> Units
            <img src={dropdownIcon} alt="" />
          </div>
        </label>
        <div className="header-dropdown-list">
          <div
            className="unit-switch option"
            onClick={handleSystemSwitch}
            onMouseDown={(e) => mouseDown(e)}
            onMouseUp={(e) => mouseUp(e)}
          >
            Switch to {unitSystem === "metric" ? "Imperial" : "Metric"}
          </div>
          <div className="option-group temperature">
            <div className="group-name">Temperature</div>
            <ul>
              <li
                onClick={(e) => {
                  handleUnits(e);
                }}
                onMouseDown={(e) => mouseDown(e)}
                onMouseUp={(e) => mouseUp(e)}
                value={"celsius"}
                className="temperature-option option"
              >
                Celsius (°C){" "}
                <img style={{ display: "none" }} src={checkMark} alt="" />
              </li>
              <li
                onClick={(e) => {
                  handleUnits(e);
                }}
                onMouseDown={(e) => mouseDown(e)}
                onMouseUp={(e) => mouseUp(e)}
                value={"fahrenheit"}
                className="temperature-option option"
              >
                Farenheit (°F){" "}
                <img style={{ display: "none" }} src={checkMark} alt="" />
              </li>
            </ul>
          </div>
          <div className="option-group wind-speed">
            <div className="group-name">Wind Speed</div>
            <ul>
              <li
                onClick={(e) => {
                  handleUnits(e);
                }}
                onMouseDown={(e) => mouseDown(e)}
                onMouseUp={(e) => mouseUp(e)}
                value={"kmh"}
                className="wind-option option"
              >
                km/h <img style={{ display: "none" }} src={checkMark} alt="" />
              </li>
              <li
                onClick={(e) => {
                  handleUnits(e);
                }}
                onMouseDown={(e) => mouseDown(e)}
                onMouseUp={(e) => mouseUp(e)}
                value={"mph"}
                className="wind-option option"
              >
                mph <img style={{ display: "none" }} src={checkMark} alt="" />
              </li>
            </ul>
          </div>
          <div className="option-group precipitation">
            <div className="group-name">Precipitation</div>
            <ul>
              <li
                onClick={(e) => {
                  handleUnits(e);
                }}
                onMouseDown={(e) => mouseDown(e)}
                onMouseUp={(e) => mouseUp(e)}
                value={"mm"}
                className="precipitation-option option"
              >
                Millimeters (mm){" "}
                <img style={{ display: "none" }} src={checkMark} alt="" />
              </li>
              <li
                onClick={(e) => {
                  handleUnits(e);
                }}
                onMouseDown={(e) => mouseDown(e)}
                onMouseUp={(e) => mouseUp(e)}
                value={"inch"}
                className="precipitation-option option"
              >
                Inches (in){" "}
                <img style={{ display: "none" }} src={checkMark} alt="" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
