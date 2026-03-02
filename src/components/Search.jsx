import React from "react";
import { useEffect } from "react";
import iconSearch from "../assets/images/icon-search.svg";

const Search = ({
  fetchWeatherData,
  searchQuery,
  setSearchQuery,
  location,
  setLocation,
  matches,
  setMatches,
  setServerError,
  mouseDown,
  mouseUp,
}) => {
  function handleChange() {
    setSearchQuery(document.querySelector(".search-bar").value);
  }

  function handleLocation(e) {
    let locationName = e.target.innerText.split(",")[0];
    let locationCountry = e.target.innerText.split(",")[1].trim();
    let locationLat = matches.filter((match) => match.name === locationName)[0]
      .latitude;
    let locationLon = matches.filter((match) => match.name === locationName)[0]
      .longitude;
    setLocation({
      name: locationName,
      country: locationCountry,
      lat: locationLat,
      lon: locationLon,
    });
    setSearchQuery("");
    if (location.lat && location.lon) {
      fetchWeatherData(location.lat, location.lon);
    }
  }

  useEffect(() => {
    if (searchQuery === "") {
      setMatches([]);
      return;
    }

    fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}&count=10&language=en&format=json`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          let results = data.results;
          setMatches(results);
        } else {
          setMatches([]);
          setServerError(true);
        }
      }).catch(() => {
        setServerError(true);
      });
  }, [searchQuery]);

  return (
    <div className="search">
      <div
        className="search-box"
        onFocus={(e) => mouseDown(e)}
        onBlur={(e) => mouseUp(e)}
      >
        <img className="search-icon" src={iconSearch} alt="search-icon" />
        <input
          type="search"
          name="search-bar"
          id="search-bar"
          className="search-bar"
          placeholder="Search for a place..."
        />
      </div>

      {matches.length > 0 ? (
        <div className="matches">
          {matches.map((match) => {
            return (
              <div
                onClick={(e) => handleLocation(e)}
                key={match.id}
                className="match"
              >
                {match.name}, {match.country}
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
      <button
        className="search-button"
        onClick={handleChange}
        onMouseDown={(e) => mouseDown(e)}
        onMouseUp={(e) => mouseUp(e)}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
