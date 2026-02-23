import { useEffect, useState } from "react";
import "./App.css";
import "../../vendor/fonts.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { defaultClothingItems } from "../../utils/clothingItems";
import { APIKey, latitude, longitude } from "../../utils/constants";
import { WeatherAPI } from "../../utils/weatherApi";

function App() {
  const API = new WeatherAPI(APIKey, latitude, longitude);
  const [weather, setWeather] = useState(null);
  const [weatherCondition, setWeatherCondition] = useState(null);
  const [clothingItems, setClothingItem] = useState(defaultClothingItems);

  //get the weather information by calling the api fetch
  useEffect(() => {
    //gets the weather data from the api
    API.getWeather()
      .then((res) => {
        setWeather({
          city: res.name,
          temp: res.main.temp,
          weatherType: res.weather[0].main,
          time: res.dt,
        });
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
      });
  }, []);

  //determines the weather temp condition when weather is loaded/changes
  useEffect(() => {
    if (!weather) return;

    setWeatherCondition(API.getWeatherCondition(weather.temp));
  }, [weather]);

  return (
    <>
      <div className="page">
        {weather && weatherCondition ? (
          <>
            <Header
              city={weather.city}
              setClothingItem={setClothingItem}
            ></Header>
            <Main
              weather={weather}
              weatherCondition={weatherCondition}
              clothingItems={clothingItems}
            ></Main>
          </>
        ) : null}
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
