const apiKey = '7037c3a8356a3e1fc5718593686540cf'; // I wanted to make aname but was scared lol

// Html elements
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const searchHistory = document.getElementById('search-history');
const currentWeather = document.getElementById('current-weather');
const forecast = document.getElementById('forecast');

searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city !== '') {
    getWeather(city);
    cityInput.value = '';
  }
});

function getWeather(city) {
  // Clear previous data
  currentWeather.innerHTML = '';
  forecast.innerHTML = '';

  // Fetch current weather data
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      displayCurrentWeather(data);
      saveSearchHistory(city);
    })
    .catch(error => {
      console.log('Error:', error);
    });

  // Fetch forecast data
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      displayForecast(data);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

