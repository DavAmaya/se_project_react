import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext, useEffect, useState } from "react";
import "./Main.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";

function Main({ clothingItems, weather, weatherCondition, setSelectedCard }) {
  const [filteredClothing, setFilteredClothing] = useState(null);

  const context = useContext(CurrentTemperatureUnitContext);

  useEffect(() => {
    setFilteredClothing(
      clothingItems.filter((item) => {
        return weatherCondition === item.weather;
      }),
    );
  }, [weatherCondition, clothingItems]);

  function handleSelectedCard(card) {
    setSelectedCard(card);
  }

  return (
    <div className="main">
      <WeatherCard
        weatherType={weather.weatherType}
        temp={weather.temp}
        time={weather.time}
      ></WeatherCard>
      <div>
        <span>
          Today is {Math.floor(weather.temp[context.currentTemperatureUnit])}°{" "}
          {context.currentTemperatureUnit} / You may want to wear:
        </span>
        <div className="cardItems_container">
          <ul className="cardList__container">
            {filteredClothing
              ? filteredClothing.map((item) => {
                  return (
                    <ItemCard
                      key={item._id}
                      clothingItem={item}
                      handleSelectedCard={handleSelectedCard}
                    ></ItemCard>
                  );
                })
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Main;
