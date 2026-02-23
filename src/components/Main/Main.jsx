import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";

function Main({ clothingItems, weather, weatherCondition }) {
  //console.log(weather);

  return (
    <div className="main">
      <WeatherCard
        weatherType={weather.weatherType}
        temp={weather.temp}
        time={weather.time}
      ></WeatherCard>
      <div>
        <span>
          Today is {Math.floor(weather.temp)}° F / You may want to wear:
        </span>
        <ItemCard
          weatherCondition={weatherCondition}
          clothing={clothingItems}
        ></ItemCard>
      </div>
    </div>
  );
}

export default Main;
