if (lat && lon) {
  const day0 = fetch(
    `${URL}?lat=${lat}&lon=${lon}&units=metric&dt=${dates[0]}&appid=${KEY}`
  )
    .then((response) => response.json())
    .then((response) => response.current)
    .then(({ data }) => setPrevDaysWeather(data))
    .catch((err) => console.error(err));

  // const day1 = fetch(
  //   `${URL}?lat=${lat}&lon=${lon}&units=metric&dt=${dates[1]}&appid=${KEY}`
  // )
  //   .then((response) => response.json())
  //   .then((response) => response.current)
  //   .then((data) => setPrevDaysWeather(data))
  //   .catch((err) => console.error(err));

  // const day2 = fetch(
  //   `${URL}?lat=${lat}&lon=${lon}&units=metric&dt=${dates[2]}&appid=${KEY}`
  // )
  //   .then((response) => response.json())
  //   .then((response) => response.current)
  //   .then((data) => setPrevDaysWeather(data))
  //   .catch((err) => console.error(err));

  // const day3 = fetch(
  //   `${URL}?lat=${lat}&lon=${lon}&units=metric&dt=${dates[3]}&appid=${KEY}`
  // )
  //   .then((response) => response.json())
  //   .then((response) => response.current)
  //   .then((data) => setPrevDaysWeather(data))
  //   .catch((err) => console.error(err));

  // const day4 = fetch(
  //   `${URL}?lat=${lat}&lon=${lon}&units=metric&dt=${dates[4]}&appid=${KEY}`
  // )
  //   .then((response) => response.json())
  //   .then((response) => response.current)
  //   .then((data) => setPrevDaysWeather(data))
  //   .catch((err) => console.error(err));

  // const day5 = fetch(
  //   `${URL}?lat=${lat}&lon=${lon}&units=metric&dt=${dates[5]}&appid=${KEY}`
  // )
  //   .then((response) => response.json())
  //   .then((response) => response.current)
  //   .then((data) => setPrevDaysWeather(data))
  //   .catch((err) => console.error(err));

  // Promise.all([day0]);

  // const options = { method: "GET" };

  // fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=43.6534817&lon=-79.3839347&units=metric&dt=1646802000&appid=fb35d2961a82212735d87720f5459f48`)
  //   .then(response => response.json())
  //   .then(response => console.log(response))
  //   .catch(err => console.error(err));
  // }

  // const res = await Promise.all(
  //   dates.map(async (date) => {
  //     try {
  //       const response = await fetch(
  //         `${URL}?lat=${lat}&lon=${lon}&units=metric&dt=${date}&appid=${KEY}`
  //       );
  //       const data = await response.json();
  //       setPrevDaysWeather(data.current);
  //     } catch (error) {}
  //   })
  // );
  // console.log(res);
  if (lat && lon) {
    const responses = Promise.allSettled(
      [
        fetch(
          `${URL}?lat=${lat}&lon=${lon}&units=metric&dt=${dates[0]}&appid=${KEY}`
        ).then((response) => response.json()),
      ]
      // dates.map((date) => {
      //   try {
      //     fetch(
      //       `${URL}?lat=${lat}&lon=${lon}&units=metric&dt=${date}&appid=${KEY}`
      //     ).then((response) => response.json());
      //   } catch (error) {
      //     console.error(error);
      //   }
      // })
    );
    console.log(responses);
  }
}

for await (let day of dates) {
  try {
    const response = await fetch(
      `${URL}?lat=${lat}&lon=${lon}&units=metric&dt=${day}&appid=${KEY}`
    );
    const data = await response.json();
    console.log(data.current);
  } catch (error) {}
}
