function getTemperature(response) {
    console.log(response.data);
    let tempElement = document.querySelector("#temperature");
    tempElement.innerHTML = Math.round(response.data.main.temp);
    let cityElement = document.querySelector("#city");
    let city = response.data.name;
    let country = response.data.sys.country;
    cityElement.innerHTML = `${city}, ${country}`;
    let conditionElement = document.querySelector("#condition");
    conditionElement.innerHTML = response.data.weather[0].description;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;
}

let apiKey = "99b6d7e451166786e8df2d31f57d9b2a";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(getTemperature);

let now = new Date();

let date = document.querySelector("#date");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
let day = days[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

date.innerHTML = `${day}, ${hours}:${minutes}`;