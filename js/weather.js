// ================================================
// WEATHER API INTEGRATION
// ================================================

class WeatherManager {
    constructor(apiKey = 'demo') {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.openweathermap.org/data/2.5';
    }

    /**
     * Get weather for city
     */
    async getWeather(city) {
        try {
            const response = await fetchWithTimeout(
                `${this.baseUrl}/weather?q=${city}&units=metric&appid=${this.apiKey}`,
                {},
                5000
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Weather API error:', error);
            return null;
        }
    }

    /**
     * Display weather widget
     */
    displayWeather(city, container) {
        this.getWeather(city).then(data => {
            if (!data || data.cod !== 200) {
                console.log('Weather data not available');
                return;
            }

            const temp = Math.round(data.main.temp);
            const description = data.weather[0].description;
            const icon = data.weather[0].icon;

            const html = `
                <div class="weather-widget">
                    <div class="weather-temp">${temp}°C</div>
                    <div class="weather-desc">${description}</div>
                    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
                </div>
            `;

            container.innerHTML = html;
        });
    }
}

const weatherManager = new WeatherManager();
