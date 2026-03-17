import "./ConfirmationDelete.css";
import closeItem from "../../assets/grey-close-icon.svg";
import { useEffect, useState } from "react";

function ConfirmationDelete({
  openDeleteModal,
  setDeleteModal,
  selectedCard,
  setSelectedCard,
  clothingApi,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  //conditional statement to determine if the modal can open
  useEffect(() => {
    openDeleteModal ? setIsModalOpen(true) : setIsModalOpen(false);
  }, [openDeleteModal]);

  //handles close and set a 1s timer to nullify the seleceted card
  function handleClose(evt) {
    console.log(evt.target);
    if (
      evt.target.className === "modal modal_is_opened" ||
      evt.target.className === "confirmation-delete__close_img" ||
      evt.target.className ===
        "confirmation-delete__btn confirmation-delete__cancel"
    ) {
      setIsModalOpen(false);
      setTimeout(() => {
        setDeleteModal(false);
        setSelectedCard(null);
      }, 1000);
    }
  }

  function handleDelete() {
    clothingApi
      .deleteItem(selectedCard)
      .then(() => {
        setIsModalOpen(false);
        setTimeout(() => {
          setDeleteModal(false);
        }, 1000);
        setSelectedCard(null);
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
      });
  }
  return (
    <>
      <div
        className={`modal ${isModalOpen ? "modal_is_opened" : ""}`}
        onClick={handleClose}
      >
        <div className="confirmation-delete__container">
          <button
            className="confirmation-delete__close"
            type="button"
            aria-label="close"
            onClick={handleClose}
          >
            <img
              className="confirmation-delete__close_img"
              src={closeItem}
              alt="close"
            ></img>
          </button>
          <p className="confirmation-delete__text">
            Are you sure you want to delete this item? This action is
            irreversible.
          </p>
          <div className="confirmation-delete__options">
            <button
              className="confirmation-delete__btn confirmation-delete__delete"
              onClick={handleDelete}
            >
              Yes, delete item
            </button>
            <button
              className="confirmation-delete__btn confirmation-delete__cancel"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmationDelete;
