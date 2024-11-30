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
        const response = await fetch(apiUrl); // Sends a request to OpenWeather
        if (!response.ok) throw new Error("City not found"); // If the response is not good, show an error
        const data = await response.json(); // Converts the response to a JavaScript object
        updateWeatherData(data); // Pass the weather data to another function to update the page
    } catch (error) {
        alert(error.message); // Shows an alert if something goes wrong
    }
}

// Function to update weather data in HTML
function updateWeatherData(data) {
    tempDiv.textContent = `${data.main.temp}°C`;
    humidityDiv.textContent = `${data.main.humidity}%`;
    windDiv.textContent = `${data.wind.speed} m/s`;

    // Update weather icon dynamically (if you want)
    const iconCode = data.weather[0].icon;
    imgDiv.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// Add event listener to button
searchButton.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert("Please enter a city name");
    }
});
