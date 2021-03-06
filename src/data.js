
// Current Dates, Hours, Minutes, Day, Months

let now = new Date ();
let date = document.querySelector("#date");
let currentDate = now.getDate();
date.innerHTML = `${currentDate}`;

let housrs = document.querySelector("#hours");
let currentHours = now.getHours();
if (currentHours < 10) {
    currentHours = `0${currentHours}`;
} 
housrs.innerHTML = `${currentHours}`;

let minutes = document.querySelector("#minutes");
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
}
minutes.innerHTML = `${currentMinutes}`;

let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let currentMonth = months[now.getMonth()];
  let month = document.querySelector("#month");
  month.innerHTML = `${currentMonth}`;

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
let currentDayOfWeeek = days[now.getDay()];
let dayOfWeek = document.querySelector("#day");
dayOfWeek.innerHTML = `${currentDayOfWeeek}`;

// Forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sun",
    "Mon",
    "Tues",
    "Wed",
    "Thurs",
    "Fri",
    "Sat"
];
  return days[day];

}


function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay, index) {
    if (index < 6) {
    forecastHTML = forecastHTML + `<div class="col">
                  <ul class="forecast-list">
                    <li class="forecast-item forecast-day-of-week">${formatDay(forecastDay.dt)}</li>
                  </ul>
                </div>
                <div class="col">
                  <ul class="forecast-list">
                    <li class="forecast-item forecast-temperature">${Math.round(forecastDay.temp.day)}??</li>
                  </ul>
                </div>
                <div class="col">
                  <ul class="forecast-list">
                    <li class="forecast-icon">
                      <img 
                      class="mini-icon" 
                      src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
                      alt="Sunny" 
                      width="35px">
                    </li>
                  </ul>
                </div>`;
    }
  })
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}




// API

function getApiWeather(city) {
    let apiKey = "238f6bbecd817b0849866bc3d0d8b987";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);
}

// Search Form

function search(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-text-input");
    getApiWeather(searchInput.value);
    let currentCity = document.querySelector("#city");
    if (searchInput.value) {
    currentCity.innerHTML = `${searchInput.value}`;
    } 
}


let form = document.querySelector("#search-form");
form.addEventListener("submit", search);


function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "238f6bbecd817b0849866bc3d0d8b987";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);

}

function showTemperature(response) {
    temp = Math.round(response.data.main.temp);
    let showTemp = document.querySelector("#temperature");
    showTemp.innerHTML = `${temp}`;

    let wind = Math.round(response.data.wind.speed);
    let showWind = document.querySelector("#wind-speed");
    showWind.innerHTML = `${wind}`;
    
    let humidity = Math.round(response.data.main.humidity);
    let showHumidity = document.querySelector("#humidity");
    showHumidity.innerHTML = `${humidity}`;

    getForecast(response.data.coord);
}

// Get current city and temp by Geolocation

function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "238f6bbecd817b0849866bc3d0d8b987";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentData);
}

function showCurrentData(response) {
  let city = response.data.name;
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = `${city}`;
  temp = Math.round(response.data.main.temp);
  let cutTemp = temp.slice(0, -1);
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = `${cutTemp}??C`;
}

function findMeButton() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let button = document.querySelector(".find-me-button");
button.addEventListener("click", findMeButton);

//Change temperature Celsius/Farenhait

function tempFarenhait(event) {
    event.preventDefault();
    let farenhaitTemperatureElement = document.querySelector("#temperature");
    let farenhaitTemperature = (temp * 9) / 5 + 32;
    farenhaitTemperatureElement.innerHTML = Math.round(farenhaitTemperature);
}

function tempCelsius(event) {
    event.preventDefault();
    let celsiusTemperatureElement = document.querySelector("#temperature");
    celsiusTemperatureElement.innerHTML = `${temp}`
}
let temp = null;
let cutTemp = null;

let showTempF = document.querySelector("#farenheit");
showTempF.addEventListener("click", tempFarenhait);

let showTempC = document.querySelector("#celsius");
showTempC.addEventListener("click", tempCelsius);








