const apiKey = "ae61012ce8f608d0ed704c0caea539dc";
const getWeatherBtn = document.getElementById("getWeather");
const weatherDiv = document.getElementById("weather");

getWeatherBtn.addEventListener("click", () => {
  const city = document.getElementById("city").value;

  if (city === "") {
    weatherDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }
  weatherDiv.innerHTML = "<p>Loading...</p>"; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      const temp =data.main.temp;
      const humidity = data.main.humidity;
      const description = data.weather[0].description;
      const icon = data.weather[0].icon; 
      weatherDiv.innerHTML = `
        <h3>${data.name}</h3>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
        <p>Temperature: ${temp}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Condition: ${description}</p>
        
      `;
    })
    .catch(error => {
      weatherDiv.innerHTML = `<p>${error.message}</p>`;
    });
});
