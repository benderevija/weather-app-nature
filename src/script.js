function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
                <div class="forecast-day">${day}</div>
                <div class="forecast-image">
                  <img
                    src="https://img.freepik.com/premium-vector/sun-icon-bright-yellow-sol-symbol-with-rays-childish-simple-style_53562-14613.jpg?w=1060"
                    alt=""
                    width="20px"
                  />
                </div>
                <div class="forecast-temperature">
                  <span class="forecast-temperature-max">18°</span>
                  <span class="forecast-temperature-min">12°</span>
                </div>
              </div>
            `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "ad67c6657704952eeec41ea7e3bfce55";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&unit=metric`;
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

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperatureElement = document.querySelector("#temperature");
  let feelsLikeFahrenheitTemperatureElement = document.querySelector("#feels");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  let feelsLikeFahrenheitTemperature = Math.round(
    (feelsLikeCelsiusTemperature * 9) / 5 + 32
  );
  fahrenheitTemperatureElement.innerHTML = fahrenheitTemperature;
  feelsLikeFahrenheitTemperatureElement.innerHTML =
    feelsLikeFahrenheitTemperature;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let celsiusTemperatureElement = document.querySelector("#temperature");
  let feelsLikeCelsiusTemperatureElement = document.querySelector("#feels");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  celsiusTemperatureElement.innerHTML = celsiusTemperature;
  feelsLikeCelsiusTemperatureElement.innerHTML = feelsLikeCelsiusTemperature;
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

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
