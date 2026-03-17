import "./ItemModal.css";
import closeItem from "../../assets/grey-close-icon.svg";
import { useEffect, useState } from "react";

function ItemModal({ selectedCard, setSelectedCard, setIsDeleteModalOpen }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  //conditional statement to determine if the modal can open
  useEffect(() => {
    selectedCard ? setIsModalOpen(true) : setIsModalOpen(false);
  }, [selectedCard]);

  //handles close and set a 1s timer to nullify the seleceted card
  function handleClose(evt) {
    if (
      evt.target.className === "modal modal_is_opened" ||
      evt.target.className === "itemModal__close_img" ||
      evt.target.className === "itemModal__close"
    ) {
      setIsModalOpen(false);
      setTimeout(() => {
        setSelectedCard(null);
      }, 1000);
    }
  }

  function handleDelete() {
    setIsDeleteModalOpen(true);
    setIsModalOpen(false);
  }
  return (
    <div
      className={`modal ${isModalOpen ? "modal_is_opened" : ""}`}
      onClick={handleClose}
    >
      <div className="itemModal__container">
        <button
          className="itemModal__close"
          type="button"
          aria-label="close"
          onClick={handleClose}
        >
          <img
            className="itemModal__close_img"
            src={closeItem}
            alt="close"
          ></img>
        </button>
        <img
          className="itemModal__img"
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
        ></img>
        <div className="itemModal__bottom-containter">
          <div className="itemModal_description">
            <span className="itemModal__text">{selectedCard.name}</span>
            <span className="itemModal__text">
              Weather: {selectedCard.weather}
            </span>
          </div>
          <button className="itemModal__delete" onClick={handleDelete}>
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
