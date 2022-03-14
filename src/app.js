function getForecast(coordinates) {
  let apiKey = "99b6d7e451166786e8df2d31f57d9b2a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getTemperature(response) {
    let iconElement = document.querySelector("#icon");
    let tempElement = document.querySelector("#temperature");
    let locationElement = document.querySelector("#location");
    let city = response.data.name;
    let country = response.data.sys.country;
    let dateElement = document.querySelector("#date");
    let conditionElement = document.querySelector("#condition");
    let windElement = document.querySelector("#wind");
    let humidityElement = document.querySelector("#humidity");
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    tempElement.innerHTML = Math.round(response.data.main.temp);
    locationElement.innerHTML = `${city}, ${country}`;
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    conditionElement.innerHTML = response.data.weather[0].description;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    humidityElement.innerHTML = response.data.main.humidity;

    getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "99b6d7e451166786e8df2d31f57d9b2a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemperature);
}

function formatDate(timestamp) {
    let date = new Date (timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
      }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
      }
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
    let day = days[date.getDay()];
    return `${day}, ${hours}:${minutes}`;
}

function handleSubmit(event) {
  event.preventDefault();
  let inputElement = document.querySelector("#form-input");
  search(inputElement.value);
}

let form = document.querySelector("#location-form");
form.addEventListener("submit", handleSubmit);

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row row-cols-md-5">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
    forecastHTML = forecastHTML + `
    <div class="col">
      ${formatDays(forecastDay.dt)}
      <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="65">
        <span class="forecast-temperature-max">${Math.round(forecastDay.temp.max)}℃</span>
        <span class="forecast-temperature-min">${Math.round(forecastDay.temp.min)}℃</span>
    </div>
`;
    }
});
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function formatDays(timestamp) {
  let date = new Date (timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun"
  ];

  return days[day];
}

search("Budapest");