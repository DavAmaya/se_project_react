import { useEffect, useState } from "react";
import { Routes } from "react-router-dom";
import "./App.css";
import "../../vendor/fonts.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { ClothingAPI } from "../../utils/api";
import { apiKey, latitude, longitude } from "../../utils/constants";
import { WeatherAPI } from "../../utils/weatherApi";
import ItemModal from "../ItemModal/ItemModal";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";
import AddItemModal from "../AddItemModal/AddItemModal";
import { Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import ConfirmationDelete from "../ConfirmationDelete/ConfirmationDelete";

function App() {
  const weatherApi = new WeatherAPI(apiKey, latitude, longitude);
  const clothingApi = new ClothingAPI();
  const [weather, setWeather] = useState(null);
  const [weatherCondition, setWeatherCondition] = useState(null);
  const [clothingItems, setClothingItems] = useState(null);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

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
      name: "imageUrl",
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
          temp: {
            F: res.main.temp,
            C: Math.round(((res.main.temp - 32) * 5) / 9),
          },
          weatherType: res.weather[0].main,
          time: res.dt,
        });
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
      });
  }, []);

  useEffect(() => {
    clothingApi
      .getClothing()
      .then((res) => {
        setClothingItems(res);
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
      });
  }, [selectedCard]);

  //determines the weather temp condition when weather is loaded/changes
  useEffect(() => {
    if (!weather) return;

    setWeatherCondition(weatherApi.getWeatherCondition(weather.temp.F));
  }, [weather]);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        {weather && weatherCondition ? (
          <>
            <Header
              city={weather.city}
              setOpenModalWithForm={setOpenModalWithForm}
            ></Header>
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weather={weather}
                    weatherCondition={weatherCondition}
                    clothingItems={clothingItems}
                    setSelectedCard={setSelectedCard}
                  ></Main>
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    clothingItems={clothingItems}
                    setSelectedCard={setSelectedCard}
                    setIsAddItemModalOpen={setIsAddItemModalOpen}
                  />
                }
              />
            </Routes>
          </>
        ) : null}
        <Footer></Footer>

        <AddItemModal
          formFields={formFields}
          radioOptions={radioOptions}
          setClothingItems={setClothingItems}
          isAddItemModalOpen={isAddItemModalOpen}
          setIsAddItemModalOpen={setIsAddItemModalOpen}
          clothingApi={clothingApi}
        ></AddItemModal>

        {selectedCard ? (
          <ItemModal
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
          ></ItemModal>
        ) : null}

        {isDeleteModalOpen ? (
          <ConfirmationDelete
            isDeleteModalOpen={isDeleteModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            setSelectedCard={setSelectedCard}
            selectedCard={selectedCard}
            clothingApi={clothingApi}
          />
        ) : null}
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
