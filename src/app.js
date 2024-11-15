function displayTemperature(response) {
  let temperatureElement = document.querySelector("#value");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let realFeelElement = document.querySelector("#real-feel");
  let descriptionElement = document.querySelector("#description");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-emoji" />`;

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);

  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  realFeelElement.innerHTML = `${Math.round(
    response.data.temperature.feels_like
  )}°C`;
  descriptionElement.innerHTML = response.data.condition.description;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "036afccb5b3e1756f153fo40e081f7t7";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
  <div class="weather-forecast-day">

            <div class="weather-forecast-date">${day}</div>
            <div class="weather-forecast-icon">🌦️</div>
            <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">10°</div>
              <div class="weather-forecast-temperature">8°</div>
               </div>
               </div>
               <div class="vl"></div>`;
  });

  forecastElement.innerHTML = forecastHtml;
}

displayForecast();
