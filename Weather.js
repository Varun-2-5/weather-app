document.addEventListener("DOMContentLoaded", () =>
{
    const cityInp = document.getElementById("city-inp");
    const weatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-Info");
    const cityName = document.getElementById("city-name");
    const temp = document.getElementById("temperature");
    const Description = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");
    const API_key = "4764b2e192e3246a62533e36786baa7a";

    weatherBtn.addEventListener("click", async () =>
    {
        const city = cityInp.value.trim();

        if(!city) return;

        try
        {
            const weatherData = await fetchWeather(city);
            displayWeather(weatherData);
        }
        catch(error)
        {
            showError();
        }
    });
    
    async function fetchWeather(city)
    {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`;

        const response = await fetch(url);

        if(!response.ok)
        {
            throw new Error("City not found!");
        }

        const data = await response.json();
        return  data;


    }

    function displayWeather(weatherData)
    {
        console.log(weatherData);
        const {name, main, weather} = weatherData;
        cityName.textContent = name;
        temp.textContent = `Temperature : ${main.temp}℃`;
        Description.textContent = `Weather : ${weather[0].description}`;
        

        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");
    }

    function showError()
    {
        weatherInfo.classList.add("hidden");
        errorMessage.classList.remove("hidden");
    }


});