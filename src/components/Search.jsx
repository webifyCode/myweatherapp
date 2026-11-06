import React from "react";
import { useEffect, useState } from "react";
import iconSearch from "../assets/images/icon-search.svg";
import { searchPlaces } from "../api";

const DEBOUNCE_MS = 300;

const Search = ({
  searchQuery,
  setSearchQuery,
  setLocation,
  matches,
  setMatches,
  setServerError,
  mouseDown,
  mouseUp,
}) => {
  const [input, setInput] = useState("");

  // Debounce typing so we don't call the geocoding API on every keystroke.
  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(input.trim()), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [input, setSearchQuery]);

  function handleSearch() {
    setSearchQuery(input.trim());
  }

  function handleLocation(match) {
    setLocation({
      name: match.name,
      country: match.country,
      lat: match.latitude,
      lon: match.longitude,
    });
    setInput("");
    setSearchQuery("");
  }

  useEffect(() => {
    if (searchQuery === "") {
      setMatches([]);
      return;
    }

    // Cancel the previous request so out-of-order responses can't overwrite
    // the results of a newer query.
    const controller = new AbortController();
    searchPlaces(searchQuery, controller.signal)
      .then((results) => {
        setMatches(results);
        setServerError(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setServerError(true);
      });

    return () => controller.abort();
  }, [searchQuery, setMatches, setServerError]);

  const showNoResults = searchQuery !== "" && matches.length === 0;

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
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>

      {matches.length > 0 && (
        <div className="matches">
          {matches.map((match) => (
            <div
              onClick={() => handleLocation(match)}
              key={match.id}
              className="match"
            >
              {match.name}, {match.country}
            </div>
          ))}
        </div>
      )}
      {showNoResults && (
        <div className="matches">
          <div className="match">No results found</div>
        </div>
      )}
      <button
        className="search-button"
        onClick={handleSearch}
        onMouseDown={(e) => mouseDown(e)}
        onMouseUp={(e) => mouseUp(e)}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
