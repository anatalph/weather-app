import React, { useState, useEffect } from "react";
import { trackPromise } from "react-promise-tracker";

const WeatherContext = React.createContext();

const WeatherProvider = ({ children }) => {
  const [cityName, setCityName] = useState("Toronto");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [state, setState] = useState("");
  const [dates, setDates] = useState([]);
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [month, setMonth] = useState("");
  const [prevDaysWeather, setPrevDaysWeather] = useState([]);

  const today = new Date();
  const date = today.getDate();
  const year = today.getFullYear();

  const searchCity = async (city) => {
    const URL = import.meta.env.VITE_GEOCODING_URL;
    const KEY = import.meta.env.VITE_API_KEY;

    try {
      const response = await fetch(`${URL}?q=${city}&limit=1&appid=${KEY}`);
      const data = await response.json();

      if (data.length !== 0) {
        const { name, lat, lon, country, state } = data[0];
        setCityName(name);
        setCountry(country);
        setLat(lat);
        setLon(lon);
        setState(state);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getPreviousFiveDaysWeather = async (lat, lon, dates) => {
    const URL = import.meta.env.VITE_HISTORICAL_URL;
    const KEY = import.meta.env.VITE_API_KEY;

    try {
      if (lat && lon) {
        const data = await Promise.allSettled(
          dates.map(
            async (date) =>
              await (
                await fetch(
                  `${URL}?lat=${lat}&lon=${lon}&units=metric&dt=${date}&appid=${KEY}`
                )
              ).json()
          )
        );
        setPrevDaysWeather(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cacheImages = async (srcArray) => {
    const promises = await srcArray.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve();
        img.onerror = reject();
      });
    });

    await Promise.all(promises);
  };

  const unixTimestampDates = () => {
    const days = [];
    for (let i = 0; i < 6; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(new Date(d / 1000).valueOf());
    }
    setDates(days);
  };

  const getDayOfWeek = () => {
    const day = today.getDay();

    if (day === 0) setDayOfWeek("Sunday");
    if (day === 1) setDayOfWeek("Monday");
    if (day === 2) setDayOfWeek("Tuesday");
    if (day === 3) setDayOfWeek("Wednesday");
    if (day === 4) setDayOfWeek("Thursday");
    if (day === 5) setDayOfWeek("Friday");
    if (day === 6) setDayOfWeek("Saturday");
  };

  const getMonth = () => {
    const monthNum = today.getMonth();

    if (monthNum === 0) setMonth("Jan.");
    if (monthNum === 1) setMonth("Mon.");
    if (monthNum === 2) setMonth("Mar.");
    if (monthNum === 3) setMonth("Apr.");
    if (monthNum === 4) setMonth("May.");
    if (monthNum === 5) setMonth("June");
    if (monthNum === 6) setMonth("July");
    if (monthNum === 7) setMonth("Aug.");
    if (monthNum === 8) setMonth("Sep.");
    if (monthNum === 9) setMonth("Oct.");
    if (monthNum === 10) setMonth("Nov.");
    if (monthNum === 11) setMonth("Dec.");
  };

  useEffect(() => {
    const imgs = [
      "https://openweathermap.org/img/wn/01d@2x.png",
      "https://openweathermap.org/img/wn/02d@2x.png",
      "https://openweathermap.org/img/wn/03d@2x.png",
      "https://openweathermap.org/img/wn/04d@2x.png",
      "https://openweathermap.org/img/wn/09d@2x.png",
      "https://openweathermap.org/img/wn/10d@2x.png",
      "https://openweathermap.org/img/wn/11d@2x.png",
      "https://openweathermap.org/img/wn/13d@2x.png",
      "https://openweathermap.org/img/wn/50d@2x.png",
      "https://openweathermap.org/img/wn/01n@2x.png",
      "https://openweathermap.org/img/wn/02n@2x.png",
      "https://openweathermap.org/img/wn/03n@2x.png",
      "https://openweathermap.org/img/wn/04n@2x.png",
      "https://openweathermap.org/img/wn/09n@2x.png",
      "https://openweathermap.org/img/wn/10n@2x.png",
      "https://openweathermap.org/img/wn/11n@2x.png",
      "https://openweathermap.org/img/wn/13n@2x.png",
      "https://openweathermap.org/img/wn/50n@2x.png",
    ];

    trackPromise(cacheImages(imgs));
  }, []);

  useEffect(() => {
    unixTimestampDates();
    getDayOfWeek();
    getMonth();
  }, []);

  useEffect(() => {
    trackPromise(searchCity(cityName));
  }, []);

  useEffect(() => {
    trackPromise(getPreviousFiveDaysWeather(lat, lon, dates));
  }, [lat, lon]);

  return (
    <WeatherContext.Provider
      value={{
        cityName,
        country,
        lat,
        lon,
        state,
        searchCity,
        dates,
        dayOfWeek,
        date,
        month,
        year,
        prevDaysWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherProvider, WeatherContext };
