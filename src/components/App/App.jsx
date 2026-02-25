import { useEffect, useState } from "react";
import "./App.css";
import "../../vendor/fonts.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { defaultClothingItems } from "../../utils/clothingItems";
import { apiKey, latitude, longitude } from "../../utils/constants";
import { WeatherAPI } from "../../utils/weatherApi";
import ItemModal from "../ItemModal/ItemModal";
import ModalWithForm from "../ModalWithForm/ModalWithFrom";

function App() {
  const weatherApi = new WeatherAPI(apiKey, latitude, longitude);
  const [weather, setWeather] = useState(null);
  const [weatherCondition, setWeatherCondition] = useState(null);
  const [clothingItems, setClothingItem] = useState(defaultClothingItems);
  const [openModalWithForm, setOpenModalWithForm] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  //form fields object arr
  const formFields = [
    {
      name: "name",
      min: "2",
      type: "text",
      title: "Name",
      placeholder: "Name",
    },
    {
      name: "link",
      min: null,
      type: "url",
      title: "Image",
      placeholder: "Image Url",
    },
  ];

  const radioOptions = {
    title: "Select the weather type:",
    selections: ["hot", "warm", "cold"],
  };

  //get the weather information by calling the api fetch
  useEffect(() => {
    //gets the weather data from the api
    weatherApi
      .getWeather()
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

    setWeatherCondition(weatherApi.getWeatherCondition(weather.temp));
  }, [weather]);

  return (
    <div className="page">
      {weather && weatherCondition ? (
        <>
          <Header
            city={weather.city}
            setClothingItem={setClothingItem}
            setOpenModalWithForm={setOpenModalWithForm}
          ></Header>
          <Main
            weather={weather}
            weatherCondition={weatherCondition}
            clothingItems={clothingItems}
            setSelectedCard={setSelectedCard}
          ></Main>
        </>
      ) : null}
      <Footer></Footer>

      {openModalWithForm ? (
        <ModalWithForm
          formFields={formFields}
          hasRadio={true}
          radioOptions={radioOptions}
          btnText={"Add garment"}
          setClothingItem={setClothingItem}
          openModalWithForm={openModalWithForm}
          setOpenModalWithForm={setOpenModalWithForm}
        ></ModalWithForm>
      ) : null}

      {selectedCard ? (
        <ItemModal
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        ></ItemModal>
      ) : null}
    </div>
  );
}

export default App;
