import closeItem from "../../assets/grey-close-icon.svg";
import "./ModalWithForm.css";
import { useEffect, useState } from "react";

function ModalWithForm({ setClothingItem, openModal, setOpenModal }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState(17);

  const [formValues, setFormValues] = useState({
    name: "",
    weather: "",
    link: "",
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  //conditional statement to determine if the modal can open
  useEffect(() => {
    openModal ? setIsModalOpen(true) : setIsModalOpen(false);
  }, [openModal]);
  //handles close and set a 1s timer to nullify the seleceted card
  function handleClose(evt) {
    if (
      evt.target.className === "modal modal_is_opened" ||
      evt.target.className === "modal__close_img"
    ) {
      setIsModalOpen(false);
      setTimeout(() => {
        setOpenModal(false);
      }, 1000);
    }
  }

  function handleChange(e) {
    const { name, value, validity } = e.target;

    let errorMessage = "";

    if (!validity) {
      errorMessage = "(This field is required.)";
    } else if (validity.typeMismatch && name === "link") {
      errorMessage = "(Please enter a valid URL.)";
    } else if (validity.tooShort) {
      errorMessage = "(Must be at least 2 characters.)";
    }

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    //error messages for the form inputs
    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));

    setIsValid(e.target.closest("form").checkValidity());
  }

  function handleSubmit(evt) {
    if (evt) {
      evt.preventDefault();
    }

    //return if not valid
    if (!isValid) return;

    const newItem = {
      _id: id,
      ...formValues,
    };
    setClothingItem((prevItems) => [...prevItems, newItem]);

    // resets form
    setFormValues({
      name: "",
      link: "",
      weather: "",
    });

    setId((prevItems) => (prevItems += 1));
    //resets states
    setErrors({});
    setIsValid(false);
    setIsModalOpen(false);
    setTimeout(() => {
      setOpenModal(false);
    }, 1000);
  }
  return (
    <>
      <div
        className={`modal ${isModalOpen ? "modal_is_opened" : ""}`}
        onClick={handleClose}
      >
        <div className="modal__container">
          <h2 className="modal__title">New garment</h2>
          <button
            className="modal__close"
            type="button"
            aria-label="close"
            onClick={handleClose}
          >
            <img className="modal__close_img" src={closeItem} alt="close"></img>
          </button>
          <form noValidate className="modal__form" onSubmit={handleSubmit}>
            <label htmlFor="name-input" className="modal__label">
              <p className="modal__label_title">
                Name* <span className="modal__input_error">{errors.name}</span>
              </p>
              <input
                name="name"
                type="text"
                className={`modal__input ${errors.name ? "modal__input_type_error" : ""}`}
                minLength="2"
                value={formValues.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
            </label>
            <label htmlFor="url-input" className="modal__label">
              <p className="modal__label_title">
                Image* <span className="modal__input_error">{errors.link}</span>
              </p>
              <input
                name="link"
                type="url"
                className={`modal__input ${errors.link ? "modal__input_type_error" : ""}`}
                value={formValues.link}
                onChange={handleChange}
                required
                placeholder="Image Url"
                id="url-input"
              />
            </label>
            <p className="modal__radio_title">Select the weather type:</p>
            <label htmlFor="modal__radio_hot" className="modal__radio">
              <input
                name="weather"
                type="radio"
                id="modal__radio_hot"
                className="modal__radio_input"
                value="hot"
                required
                checked={formValues.weather === "hot"}
                onChange={handleChange}
              />
              Hot
            </label>
            <label htmlFor="modal__radio_warm" className="modal__radio">
              <input
                name="weather"
                type="radio"
                id="modal__radio_warm"
                className="modal__radio_input"
                value="warm"
                checked={formValues.weather === "warm"}
                onChange={handleChange}
              />
              Warm
            </label>
            <label htmlFor="modal__radio_cold" className="modal__radio">
              <input
                name="weather"
                type="radio"
                id="modal__radio_cold"
                className="modal__radio_input"
                value="cold"
                checked={formValues.weather === "cold"}
                onChange={handleChange}
              />
              Cold
            </label>
            <button
              className={`modal__btn ${!isValid ? "modal__btn_disabled" : ""}`}
              type="submit"
              disabled={!isValid}
            >
              Add garment
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalWithForm;
