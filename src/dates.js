const dates = [...Array(5)].map((_, i) => {
  const d = new Date(1646802000);
  d.setDate(d.getDate() - ++i);
  return d.valueOf();
});

const options = { method: "GET" };

fetch(
  "http://api.openweathermap.org/geo/1.0/direct?q=mississauga&limit=1&appid=fb35d2961a82212735d87720f5459f48",
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

function targetDates() {
  const days = [];
  for (let i = 0; i < 6; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(new Date(d / 1000).valueOf());
  }
  return days;
}

Promise.all(
  targetDates().map(async (id) => {
    fetch(
      "https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=43.6534817&lon=-79.3839347&units=metric&dt=1647154368&appid=fb35d2961a82212735d87720f5459f48"
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  })
);

const data = Promise.all([fetchUsers(), fetchTodos()])
  .then((res) => {
    console.log(res);
    const [users, todos] = res;
  })
  .catch((err) => console.log(err));

// fetching the users
function fetchUsers() {
  return fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
    res.json()
  );
}

// fetching the todos
function fetchTodos() {
  return fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
    res.json()
  );
}

console.log(data);

fetch(
  `http://api.openweathermap.org/geo/1.0/direct?q=${locationSearch}&limit=1&appid=fb35d2961a82212735d87720f5459f48`
)
  .then((response) => response.json())
  .then((response) => console.log(response[0]))
  .catch((err) => console.error(err));
