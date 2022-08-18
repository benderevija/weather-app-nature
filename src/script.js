function formatHour(timestamp) {
  let hours = new Date(timestamp * 1000);
  let hour = hours.getHours(timestamp * 1000);
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
                    src="../weather-app-nature/img/${
                      forecastHour.weather[0].icon
                    }.svg"
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
                    src="../weather-app-nature/img/${
                      forecastDay.weather[0].icon
                    }.svg"
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
function getSunTimes(timestamp) {
  let time = new Date(timestamp * 1000);
  let hour = time.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let min = time.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  return `${hour}:${min}`;
}

function displaySunTimes(response) {
  let sunriseElement = document.querySelector("#sunrise-hour");
  let sunsetElement = document.querySelector("#sunset-hour");

  sunriseElement.innerHTML = `${getSunTimes(response.data.sys.sunrise)}`;
  sunsetElement.innerHTML = `${getSunTimes(response.data.sys.sunset)}`;
}

function displayTemperature(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  let feelsLikeElement = document.querySelector("#feels");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let fullDate = document.querySelector("#date");

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
    `../weather-app-nature/img/${response.data.weather[0].icon}.svg`
  );
  iconElement.setAttribute("alt", `${response.data.weather[0].description}`);
  fullDate.innerHTML = getFullDate(new Date(), response.data.timezone);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "ad67c6657704952eeec41ea7e3bfce55";
  let units = "metric";
  let apiUrlLink = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiUrlLink}q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayTemperature);

  axios.get(apiUrl).then(displaySunTimes);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function getFullDate(date, timezone) {
  let localOffsetInMs = date.getTimezoneOffset() * 60 * 1000;
  let targetOffsetInMs = timezone * 1000;
  let targetTimestamp = date.getTime() + localOffsetInMs + targetOffsetInMs;
  let now = new Date(targetTimestamp);

  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let min = now.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }

  let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  let day = days[now.getDay()];
  let dates = now.getDate();
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

  return `${day}, ${dates} ${month}, ${hour}:${min}`;
}

search("London");
