// I wanted to make a default name but was I scared lol
const apiKey = '7037c3a8356a3e1fc5718593686540cf'; 

// Html elements
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const searchHistory = document.getElementById('search-history');
const currentWeather = document.getElementById('current-weather');
const forecast = document.getElementById('forecast');

// Recieve input city value
searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city !== '') {
    getWeather(city);
    cityInput.value = '';
  }
});

// Fetch all info from OpenWeather API
function getWeather(city) {
  // Clear previous data
  currentWeather.innerHTML = '';
  forecast.innerHTML = '';

  // Fetch current weather data, with error catch
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      displayCurrentWeather(data);
      saveSearchHistory(city);
    })
    .catch(error => {
      console.log('Error:', error);
    });

  // Fetch forecast data, with error catch
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      displayForecast(data);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

// Display searched city
function displayCurrentWeather(data) {
  const cityName = data.name;
  const date = new Date(data.dt * 1000).toLocaleDateString();
  const iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  const temperature = data.main.temp;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  const currentWeatherCard = document.createElement('div');
  currentWeatherCard.classList.add('weather-card');

  currentWeatherCard.innerHTML = `
    <h2>${cityName}</h2>
    <h2>${date}</h2>
    <img src="${iconUrl}" alt="Weather Icon">
    <p>Temp: ${temperature}&deg;C</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind: ${windSpeed} m/s</p>
  `;

  currentWeather.appendChild(currentWeatherCard);
}

// Display a 5 day forecast
function displayForecast(data) {
  const forecastData = data.list.filter(item => item.dt_txt.includes('12:00:00'));
  
  forecastData.forEach(item => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    const iconUrl = `https://openweathermap.org/img/w/${item.weather[0].icon}.png`;
    const temperature = item.main.temp;
    const humidity = item.main.humidity;
    const windSpeed = item.wind.speed;

    const forecastCard = document.createElement('div');
    forecastCard.classList.add('weather-card');

    forecastCard.innerHTML = `
      <h2>${date}</h2>
      <img src="${iconUrl}" alt="Weather Icon">
      <p>Temp: ${temperature}&deg;C</p>
      <p>Humidity: ${humidity}%</p>
      <p>Wind: ${windSpeed} m/s</p>
    `;

    forecast.appendChild(forecastCard);
  });
}

function saveSearchHistory(city) {
  const searchItem = document.createElement('p');
  searchItem.textContent = city;
  searchHistory.appendChild(searchItem);
  
  searchItem.addEventListener('click', function() {
    getWeather(city);
  });
}
