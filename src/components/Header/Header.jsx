import WTWRLogo from "../../assets/Logo.svg";
import avatarDefault from "../../assets/avatar.svg";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";

function Header({ city, setOpenModalWithForm }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const username = "Terrence Tegegne";
  const avatar = avatarDefault;
  function openForm() {
    setOpenModalWithForm(true);
  }

  return (
    <>
      <div className="header__container">
        <div className="header__container--left">
          <NavLink to={"/"}>
            <img className="header__logo" src={WTWRLogo} alt="WTWR Logo"></img>
          </NavLink>
          <span className="header__date">
            {currentDate}, {city}
          </span>
        </div>
        <div className="header__container--right">
          <ToggleSwitch />
          <button className="header__button" onClick={openForm}>
            + Add clothes
          </button>
          <NavLink to={"/profile"} className="header-navLink__profile">
            <div className="header__profile">
              <span className="header__username">{username}</span>
              {avatar ? (
                <img className="header__avatar" src={avatar} alt="Avatar"></img>
              ) : (
                <span className="header__avatar header__avatar_none">
                  {username.toUpperCase().charAt(0) || ""}
                </span>
              )}
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Header;
