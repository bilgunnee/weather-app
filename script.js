document.getElementById("city").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = 'ab853dcecca4b673e158af22aa48528b';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.cod === 200) {
            const timezoneOffset = data.timezone / 3600;
            const localTime = new Date(new Date().getTime() + (timezoneOffset * 3600 ));
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            const formattedDate = localTime.toLocaleDateString('en-US', options);

            const iconCode = data.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

            document.getElementById('date-time').innerHTML = `${formattedDate}`;
            document.getElementById('city-name').innerHTML = `${data.name}`;
            document.getElementById('temperature').innerHTML = `${data.main.temp} °C`;
            document.getElementById('weather-description').innerHTML = `${data.weather[0].description}`;
            document.getElementById('wind-speed').innerHTML = `Wind Speed: ${data.wind.speed} m/s`;
            document.querySelector(".main-icon").src = iconUrl;

        } else {
            document.getElementById('weather-info').innerHTML = 'City not found!';
        }
    } catch (error) {
        document.getElementById('weather-info').innerHTML = 'Error fetching data!';
        console.error('Error:', error);
    }
}
