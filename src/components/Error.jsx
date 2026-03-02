import React from 'react'
import iconError from "../assets/images/icon-error.svg";
import iconRetry from "../assets/images/icon-retry.svg";

const Error = ({setServerError, setMatches, setSearchQuery, setLocation, setWeatherData}) => {
    function handleRetry() {
        setServerError(false)
        setMatches([])
        setSearchQuery("")
        setLocation({})
        setWeatherData([])
    }
  return (
    <div className="error">
    <img src={iconError} alt="Error icon" />
    <h1>Something went wrong</h1>
    <p>We could't connect to the server (API error). Please try again in a few moments.</p>
    <button className="retry-button" onClick={handleRetry}>
      <img src={iconRetry} alt="Retry icon" />
      <span>Retry</span>
    </button>
    </div>
  )
}

export default Error