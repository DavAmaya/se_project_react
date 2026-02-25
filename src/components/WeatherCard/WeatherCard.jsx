import "./WeatherCard.css";
import { getWeatherCard } from "../../utils/weatherUtils";
import { useEffect, useState } from "react";

function WeatherCard({ weatherType, temp, time }) {
  const [card, setCard] = useState("");
  useEffect(() => {
    setCard(getWeatherCard(time, weatherType));
  }, [time, weatherType]);

  return (
    <>
      {card ? (
        <div className="weatherCard__container">
          <img
            className="weatherCard__Img"
            src={card}
            alt={`${weatherType ? weatherType : null} weather background`}
          ></img>
          <span className="weatherCard__temp">{Math.floor(temp)}°F</span>
        </div>
      ) : null}
    </>
  );
}

export default WeatherCard;
