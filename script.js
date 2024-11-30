// Your API key
const apiKey = "b49d0ddb07546697f27b3953d7b74930"; // Replace this with your OpenWeather API key

// Select elements
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");
const tempDiv = document.querySelector(".temp");
const humidityDiv = document.querySelector(".humidity p");
const windDiv = document.querySelector(".wind p");
const imgDiv = document.querySelector(".img img");

// Function to fetch weather data
async function fetchWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(apiUrl); // Sends a request to OpenWeather to fetch data
        if (!response.ok) throw new Error("City not found"); // If the response is not good, show an error
        const data = await response.json(); // Converts the response to a JavaScript object
        updateWeatherData(data); // Pass the weather data to another function to update the page
    } catch (error) {
        alert(error.message); // Shows an alert if something goes wrong
    }
}

// Function to update weather data in HTML
function updateWeatherData(data) {
    tempDiv.textContent = `${data.main.temp}°C`; // Updates the temperature
    humidityDiv.textContent = `${data.main.humidity}%`; // Updates the humidity
    windDiv.textContent = `${data.wind.speed} m/s`; // Updates the wind speed

    const iconCode = data.weather[0].icon; // Gets the icon code for the current weather
    imgDiv.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`; // Updates the weather icon
}


// Add event listener to button
searchButton.addEventListener("click", () => {
    const city = searchInput.value.trim(); // Gets the city name entered by the user
    if (city) {
        fetchWeather(city); // Calls the function to fetch the weather data
    } else {
        alert("Please enter a city name"); // Shows a message if the input is empty
    }
});

