import React from "react";
import { WeatherContext } from "../Context";

const CurrentStats = () => {
  const { prevDaysWeather } = React.useContext(WeatherContext);

  const [currentDay] = [...prevDaysWeather].slice(0, 1);
  const URL = import.meta.env.VITE_ICON_URL;
  const roundString = (val) => Math.round(val).toString();
  const icon = `${URL}${currentDay?.value?.current?.weather[0]?.icon}@2x.png`;
  const temp = roundString(currentDay?.value?.current?.temp);
  const feelsLike = roundString(currentDay?.value?.current?.feels_like);
  const humidity = roundString(currentDay?.value?.current?.humidity);
  const dew_point = roundString(currentDay?.value?.current?.dew_point);
  const wind_speed = roundString(currentDay?.value?.current?.wind_speed);
  const main = currentDay?.value?.current?.weather[0]?.main;
  const formatSunrise = new Date(currentDay?.value?.current?.sunrise * 1000);
  const formatSunset = new Date(currentDay?.value?.current?.sunset * 1000);
  const options = { hour: "numeric", minute: "numeric" };

  return (
    <div className="current-wrapper">
      <div className="current-temperature">
        <div className="current-temperature__icon-container">
          <img
            src={icon ? icon : `${URL}01d@2x.png`}
            className="current-temperature__icon"
            alt={main}
          />
        </div>
        <div className="current-temperature__content-container">
          <div className="current-temperature__value">{temp}&deg;</div>
          <div className="current-temperature__summary">{main}</div>
        </div>
      </div>
      <div className="current-stats">
        <div>
          <div className="current-stats__value">{dew_point}&deg;C</div>
          <div className="current-stats__label">Dew Point</div>
          <div className="current-stats__value">{feelsLike}&deg;C</div>
          <div className="current-stats__label">Feels Like</div>
        </div>
        <div>
          <div className="current-stats__value">{wind_speed}ms</div>
          <div className="current-stats__label">Wind</div>
          <div className="current-stats__value">{humidity}%</div>
          <div className="current-stats__label">Humidity</div>
        </div>
        <div>
          <div className="current-stats__value">
            {formatSunrise.toLocaleTimeString("en-US", options)}
          </div>
          <div className="current-stats__label">Sunrise</div>
          <div className="current-stats__value">
            {formatSunset.toLocaleTimeString("en-US", options)}
          </div>
          <div className="current-stats__label">Sunset</div>
        </div>
      </div>
    </div>
  );
};

export default CurrentStats;
