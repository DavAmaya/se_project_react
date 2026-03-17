import "./WeatherCard.css";
import { getWeatherCard } from "../../utils/weatherUtils";
import { useEffect, useState, useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";

function WeatherCard({ weatherType, temp, time }) {
  const [card, setCard] = useState("");
  useEffect(() => {
    setCard(getWeatherCard(time, weatherType));
  }, [time, weatherType]);

  const context = useContext(CurrentTemperatureUnitContext);

  return (
    <>
      {card ? (
        <div className="weatherCard__container">
          <img
            className="weatherCard__Img"
            src={card}
            alt={`${weatherType ? weatherType : null} weather background`}
          ></img>
          <span className="weatherCard__temp">
            {Math.floor(temp[context.currentTemperatureUnit])}°
            {context.currentTemperatureUnit}
          </span>
        </div>
      ) : null}
    </>
  );
}

export default WeatherCard;
