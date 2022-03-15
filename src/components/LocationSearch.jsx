import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { WeatherContext } from "../Context";

const LocationSearch = () => {
  const { searchCity } = React.useContext(WeatherContext);
  const [city, setCity] = useState("");
  const disableSearch = city.trim() === "";

  const handleSubmit = (e) => {
    e.preventDefault();
    city ? searchCity(city) : null;
  };

  return (
    <div className="search">
      <form autoComplete="off" className="search-form" onSubmit={handleSubmit}>
        <input
          id="search-input"
          type="text"
          placeholder="Enter Location.."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSubmit} disabled={disableSearch}>
          <FontAwesomeIcon icon={faLocationDot} className="search-icon fa-2x" />
        </button>
      </form>
    </div>
  );
};

export default LocationSearch;
