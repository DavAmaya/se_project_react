import { useState } from "react";
import WTWRLogo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.svg";
import "./Header.css";
import ModalWithForm from "../ModalWithForm/ModalWithFrom";

function Header({ city, setClothingItem }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const [openModal, setOpenModal] = useState(false);

  function openForm() {
    setOpenModal(true);
  }

  return (
    <>
      <div className="header__container">
        <div className="header__container--left">
          <img className="header__logo" src={WTWRLogo} alt="WTWR Logo"></img>
          <span className="header__date">
            {currentDate}, {city}
          </span>
        </div>
        <div className="header__container--right">
          <div className="header__content">
            <button className="header__button" onClick={openForm}>
              + Add clothes
            </button>
            <span className="header__username">Terrence Tegegne</span>
          </div>
          <img className="header__avatar" src={avatar} alt="Avatar"></img>
        </div>
      </div>

      {openModal ? (
        <ModalWithForm
          setClothingItem={setClothingItem}
          openModal={openModal}
          setOpenModal={setOpenModal}
        ></ModalWithForm>
      ) : null}
    </>
  );
}

export default Header;
