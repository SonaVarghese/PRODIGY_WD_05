const apiKey = '95de1d83ed0dc52aee4c457bc025b559'; // Replace with your OpenWeatherMap API key

document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

function fetchWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Debugging: Log the data to inspect its structure
            displayWeather(data);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function fetchWeatherByLocation() {
    const location = document.getElementById('location-input').value;
    if (location) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Debugging: Log the data to inspect its structure
                displayWeather(data);
            })
            .catch(error => console.error('Error fetching weather data:', error));
    } else {
        alert('Please enter a location.');
    }
}

function displayWeather(data) {
    const location = document.getElementById('location');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');

    if (data.sys && data.sys.country) {
        location.textContent = `Location: ${data.name}, ${data.sys.country}`;
    } else {
        location.textContent = `Location: ${data.name}`;
    }

    if (data.main && data.main.temp) {
        temperature.textContent = `Temperature: ${data.main.temp}°C`;
    } else {
        temperature.textContent = 'Temperature data not available';
    }

    if (data.weather && data.weather[0] && data.weather[0].description) {
        description.textContent = `Description: ${data.weather[0].description}`;
    } else {
        description.textContent = 'Description not available';
    }
}
