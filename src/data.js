
// Current Dates, Hours, Minutes, Day, Months

let now = new Date ();
let date = document.querySelector(".current-date");
let currentDate = now.getDate();
date.innerHTML = `${currentDate}`;

let housrs = document.querySelector(".current-hours");
let currentHours = now.getHours();
if (currentHours < 10) {
    currentHours = `0${currentHours}`;
} 
housrs.innerHTML = `${currentHours}`;

let minutes = document.querySelector(".current-minutes");
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
  let month = document.querySelector(".current-month");
  month.innerHTML = `${currentMonth}`;

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]
let currentDayOfWeeek = days[now.getDay()];
let dayOfWeek = document.querySelector(".current-day-of-week");
dayOfWeek.innerHTML = `${currentDayOfWeeek}`;

// API

function getApiWeather(city) {
    let apiKey = "238f6bbecd817b0849866bc3d0d8b987";
    let units = "metric";
    let city = "Lisboa";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);
}
