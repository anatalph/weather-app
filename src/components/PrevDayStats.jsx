import React from "react";
import { WeatherContext } from "../Context";
import DayStats from "./DayStats";

const PrevDayStat = () => {
  const { prevDaysWeather } = React.useContext(WeatherContext);
  const prevFiveDays = [...prevDaysWeather];
  prevFiveDays.splice(0, 1);

  return (
    <div className="next-5-days">
      <h2 className="next-5-days__heading">Last 5 days</h2>
      <div className="next-5-days__container">
        {prevFiveDays.map((day, i) => {
          return <DayStats key={i} day={day} />;
        })}
      </div>
    </div>
  );
};

export default PrevDayStat;
