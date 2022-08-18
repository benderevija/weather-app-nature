function formatHour(timestamp) {
  let hours = new Date(timestamp * 1000);
  let hour = hours.getHours();
  if (hour) {
    hour = `${hour}:00`;
  }
  return hour;
}

function displayHourlyForecast(response) {
  let hourlyForecast = response.data.hourly;
  let hourlyForecastElement = document.querySelector("#hourly-forecast");

  let forecastHourlyHTML = `<div class="row">`;
  hourlyForecast.forEach(function (forecastHour, index) {
    if (index < 6) {
      forecastHourlyHTML =
        forecastHourlyHTML +
        `
              <div class="col-2">
                <div class="forecast-hour">${formatHour(forecastHour.dt)}</div>
                <div class="forecast-hour-image">
                  <img
                    src="https://openweathermap.org/img/wn/${
                      forecastHour.weather[0].icon
                    }@2x.png"
                    alt=""
                    width="30px"
                  />
                </div>
                <div class="forecast-hour-temperature">
                  <span class="forecast-hour-temperature-max">${Math.round(
                    forecastHour.temp
                  )}°</span>
                </div>
              </div>
            `;
    }
  });
  forecastHourlyHTML = forecastHourlyHTML + `</div>`;
  hourlyForecastElement.innerHTML = forecastHourlyHTML;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
                <div class="forecast-image">
                  <img
                    src="https://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png"
                    alt=""
                    width="30px"
                  />
                </div>
                <div class="forecast-temperature">
                  <span class="forecast-temperature-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="forecast-temperature-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
              </div>
            `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "ad67c6657704952eeec41ea7e3bfce55";
  let units = "metric";
  let apiUrlLink = "https://api.openweathermap.org/data/2.5/onecall?";
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiUrl = `${apiUrlLink}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayHourlyForecast);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  let feelsLikeElement = document.querySelector("#feels");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = Math.round(response.data.main.temp);
  feelsLikeCelsiusTemperature = Math.round(response.data.main.feels_like);

  temperatureElement.innerHTML = celsiusTemperature;
  cityElement.innerHTML = response.data.name;
  weatherDescriptionElement.innerHTML = response.data.weather[0].description;
  feelsLikeElement.innerHTML = feelsLikeCelsiusTemperature;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${response.data.weather[0].description}`);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "ad67c6657704952eeec41ea7e3bfce55";
  let units = "metric";
  let apiUrlLink = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiUrlLink}q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fullDate = document.querySelector("#date");
let now = new Date();
let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
let day = days[now.getDay()];
let date = now.getDate();
let months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];
let month = months[now.getMonth()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let min = now.getMinutes();
if (min < 10) {
  min = `0${min}`;
}

fullDate.innerHTML = `${day}, ${date} ${month}, ${hour}:${min}`;

search("New York");
