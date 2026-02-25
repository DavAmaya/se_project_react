//day img imports
import clearDay from "../assets/day/sunny.svg";
import cloudyDay from "../assets/day/cloudy.svg";
import fogDay from "../assets/day/fog.svg";
import rainDay from "../assets/day/rain.svg";
import snowDay from "../assets/day/snow.svg";
import stormDay from "../assets/day/storm.svg";

//night img imports
import clearNight from "../assets/night/sunny.svg";
import cloudyNight from "../assets/night/cloudy.svg";
import fogNight from "../assets/night/fog.svg";
import rainNight from "../assets/night/rain.svg";
import snowNight from "../assets/night/snow.svg";
import stormNight from "../assets/night/storm.svg";

//api weather codes
const defaultWeatherCard = {
  weatherType: "Clear",
  day: clearDay,
  night: clearNight,
};
const weatherCards = [
  { weatherType: "Thunderstorm", day: stormDay, night: stormNight },
  { weatherType: "Rain", day: rainDay, night: rainNight },
  { weatherType: "Snow", day: snowDay, night: snowNight },
  { weatherType: "Fog", day: fogDay, night: fogNight },
  { weatherType: "Clouds", day: cloudyDay, night: cloudyNight },
  { weatherType: "", day: clearDay, night: clearNight },
];

//determines the time of day and returns correct weather card svg
export function getWeatherCard(time, weatherType) {
  time *= 1000;
  const date = new Date(time);
  const hour = date.getHours();
  const weather = getWeather(weatherType);

  const isDay = hour >= 6 && hour < 18;
  return isDay
    ? weather
      ? weather.day
      : defaultWeatherCard.day
    : weather
      ? weather.day
      : defaultWeatherCard.night;
}

function getWeather(weatherType) {
  return weatherCards.find(
    (weatherCard) => weatherCard.weatherType === weatherType,
  );
}
