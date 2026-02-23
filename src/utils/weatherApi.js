export class WeatherAPI {
  constructor(key, latitude, longitude) {
    this.key = key;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  getWeather() {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&units=imperial&appid=${this.key}`,
      { method: "GET" },
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getWeatherCondition(temp) {
    if (temp >= 89) {
      return "hot";
    } else if (temp >= 66) {
      return "warm";
    } else {
      return "cold";
    }
  }
}
