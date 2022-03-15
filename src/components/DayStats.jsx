import React from "react";

const DayStats = ({ day }) => {
  const URL = import.meta.env.VITE_ICON_URL;
  const formatDate = (timestamp) => new Date(timestamp * 1000);
  const roundString = (val) => Math.round(val).toString();
  const timestamp = formatDate(day?.value?.current?.dt);
  const icon = `${URL}${day?.value?.current?.weather[0]?.icon}@2x.png`;
  const alt = day?.value?.current?.weather[0]?.main;
  const temp = roundString(day?.value?.current?.temp);
  const feelsLike = roundString(day?.value?.current?.feels_like);
  const humidity = roundString(day?.value?.current?.humidity);
  const wind_speed = roundString(day?.value?.current?.wind_speed);

  return (
    <div className="next-5-days__row">
      <div className="next-5-days__date">
        {timestamp.toLocaleString("en-US", {
          weekday: "short",
        })}
        <div className="next-5-days__label">
          {timestamp.toLocaleString("en-US", {
            month: "numeric",
            day: "numeric",
          })}
        </div>
      </div>
      <div className="next-5-days__low">
        {temp} &deg;C
        <div className="next-5-days__label">Temp</div>
      </div>

      <div className="next-5-days__high">
        {feelsLike} &deg;C
        <div className="next-5-days__label">Feels Like</div>
      </div>

      <div className="next-5-days__icon">
        <img src={icon == undefined ? `${URL}01d@2x.png` : icon} alt={alt} />
      </div>

      <div className="next-5-days__rain">
        {humidity}%<div className="next-5-days__label">Humidity</div>
      </div>

      <div className="next-5-days__wind">
        {wind_speed}ms
        <div className="next-5-days__label">Wind</div>
      </div>
    </div>
  );
};

export default DayStats;
