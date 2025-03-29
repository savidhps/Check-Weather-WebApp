async function getWeather() {
    const city = document.getElementById('city').value;
    if (city === '') {
        alert('Enter a valid city name');
        return;
    }

    const apiKey = '66a0529e6769292c87beebd057aa4e52';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200) {
            document.getElementById('place').innerText = `${data.name}, ${data.sys.country}`;
            document.getElementById('date').innerText = new Date().toLocaleDateString();
            document.getElementById('temperature').innerText = `${data.main.temp}°C`;
            document.getElementById('description').innerText = data.weather[0].description;
            document.getElementById('humidity').innerText = data.main.humidity;
            document.getElementById('wind').innerText = data.wind.speed;
            document.getElementById('pressure').innerText = data.main.pressure;

            const weatherIcon = document.getElementById('weatherIcon');
            const dayNightIcon = document.getElementById('dayNightIcon');
            const weatherCard = document.getElementById('weatherCard');

            const weatherType = data.weather[0].main.toLowerCase();
            const isDaytime = data.dt > data.sys.sunrise && data.dt < data.sys.sunset;

            weatherCard.classList.remove('hidden');
            dayNightIcon.className = isDaytime ? "fas fa-sun" : "fas fa-moon";

            if (weatherType.includes("clear")) {
                weatherIcon.className = "fas fa-sun";
            } else if (weatherType.includes("cloud")) {
                weatherIcon.className = "fas fa-cloud";
            } else if (weatherType.includes("rain")) {
                weatherIcon.className = "fas fa-cloud-showers-heavy";
            } else if (weatherType.includes("snow")) {
                weatherIcon.className = "fas fa-snowflake";
            } else {
                weatherIcon.className = "fas fa-smog";
            }

            weatherCard.style.display = 'block';
        } else {
            alert("City not found!");
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data.');
    }
}