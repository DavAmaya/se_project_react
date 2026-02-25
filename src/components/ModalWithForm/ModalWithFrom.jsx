import closeItem from "../../assets/grey-close-icon.svg";
import "./ModalWithForm.css";
import { useEffect, useState } from "react";

function ModalWithForm({
  formFields,
  hasRadio,
  radioOptions,
  btnText,
  setClothingItem,
  openModalWithForm,
  setOpenModalWithForm,
}) {
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
    openModalWithForm ? setIsModalOpen(true) : setIsModalOpen(false);
  }, [openModalWithForm]);
  //handles close and set a 1s timer to nullify the seleceted card
  function handleClose(evt) {
    if (
      evt.target.className === "modal modal_is_opened" ||
      evt.target.className === "modal__close_img" ||
      evt.target.className === "modal__close"
    ) {
      setIsModalOpen(false);
      setTimeout(() => {
        setOpenModalWithForm(false);
      }, 1000);
    }
  }

  function handleChange(e) {
    const { name, value, validity } = e.target;

    let errorMessage = "";

    if (validity.valueMissing) {
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
    console.log(newItem);
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
      setOpenModalWithForm(false);
    }, 1000);
  }

  function capitalizeFirstLetter(string) {
    if (!string) return string;

    return string.charAt(0).toUpperCase() + string.slice(1);
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
            {formFields.map((field) => (
              <label
                key={field.name}
                htmlFor={`${field.name}-input`}
                className="modal__label"
              >
                <p className="modal__label_title">
                  {`${field.title}*`}{" "}
                  <span className="modal__input_error">{errors.name}</span>
                </p>
                <input
                  name={field.name}
                  id={`${field.name}-input`}
                  type={field.type}
                  className={`modal__input ${errors[field.name] ? "modal__input_type_error" : ""}`}
                  minLength={field.min ? field.min : null}
                  value={formValues[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required
                />
              </label>
            ))}

            {hasRadio ? (
              <>
                <p className="modal__radio_title">{radioOptions.title}</p>
                {radioOptions.selections.map((option) => (
                  <label
                    key={option}
                    htmlFor={`modal__radio_${option}`}
                    className="modal__radio"
                  >
                    <input
                      name="weather"
                      type="radio"
                      id={`modal__radio_${option}`}
                      className="modal__radio_input"
                      value={option}
                      required
                      checked={formValues.weather === option}
                      onChange={handleChange}
                    />
                    {capitalizeFirstLetter(option)}
                  </label>
                ))}{" "}
              </>
            ) : null}
            <button
              className={`modal__btn ${!isValid ? "modal__btn_disabled" : ""}`}
              type="submit"
              disabled={!isValid}
            >
              {btnText}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalWithForm;
