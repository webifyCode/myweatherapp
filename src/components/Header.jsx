import React from "react";
import { useEffect } from "react";
import logo from "../assets/images/logo.svg";
import unitsIcon from "../assets/images/icon-units.svg";
import dropdownIcon from "../assets/images/icon-dropdown.svg";
import checkMark from "../assets/images/icon-checkmark.svg";
import { fetchForecast, UNIT_PRESETS } from "../api";

const Header = ({
  unitSystem,
  setUnitSystem,
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
    setUnits(UNIT_PRESETS[newUnitSystem]);
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
  }, [units]);

  // Re-fetch with the user's chosen units whenever the units or location
  // change, so the displayed values never belong to a previous location.
  useEffect(() => {
    if (!location?.lat || !location?.lon) return;

    const controller = new AbortController();
    fetchForecast(location.lat, location.lon, units, controller.signal)
      .then((data) => {
        if (!data.current) return;
        setValues((prevValues) => ({
          ...prevValues,
          temperature: Math.floor(data.current.temperature_2m),
          apparentTemp: Math.floor(data.current.apparent_temperature),
          windSpeed: Math.floor(data.current.wind_speed_10m),
          precipitation: Math.floor(data.current.precipitation),
          hourlyTemp: data.hourly.temperature_2m.map(Math.floor),
          minDailyTemp: data.daily.temperature_2m_min.map(Math.floor),
          maxDailyTemp: data.daily.temperature_2m_max.map(Math.floor),
        }));
      })
      .catch(() => {
        // The main fetch in App surfaces errors; ignore here.
      });

    return () => controller.abort();
  }, [units, location?.lat, location?.lon, setValues]);

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
