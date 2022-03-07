function search(city) {
let apiKey = "99b6d7e451166786e8df2d31f57d9b2a";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(getTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let inputElement = document.querySelector("#form-input");
    search(inputElement.value);
}

let form = document.querySelector("#location-form");
form.addEventListener("submit", handleSubmit);

search("Budapest");

function getTemperature(response) {
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    let tempElement = document.querySelector("#temperature");
    let locationElement = document.querySelector("#location");
    let city = response.data.name;
    let country = response.data.sys.country;
    let dateElement = document.querySelector("#date");
    let conditionElement = document.querySelector("#condition");
    let windElement = document.querySelector("#wind");
    let humidityElement = document.querySelector("#humidity");
    tempElement.innerHTML = Math.round(response.data.main.temp);
    locationElement.innerHTML = `${city}, ${country}`;
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    conditionElement.innerHTML = response.data.weather[0].description;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    humidityElement.innerHTML = response.data.main.humidity;
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