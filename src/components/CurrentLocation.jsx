import React from "react";
import { WeatherContext } from "../Context";

const Location = () => {
  const { cityName, country, dayOfWeek, date, month, year } =
    React.useContext(WeatherContext);

  return (
    <div className="location">
      <div className="location-and-date">
        <h1 className="location-and-date__location">
          {cityName}, {country}
        </h1>
        <div>
          {dayOfWeek}, {date} {month} {year}
        </div>
      </div>
    </div>
  );
};

export default Location;
