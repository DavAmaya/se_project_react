import ModalWithForm from "../ModalWithForm/ModalWithFrom";

function AddItemModal({
  isAddItemModalOpen,
  setIsAddItemModalOpen,
  radioOptions,
  setClothingItems,
  formFields,
  clothingApi,
  onSubmit,
}) {
  return isAddItemModalOpen ? (
    <ModalWithForm
      formFields={formFields}
      hasRadio={true}
      radioOptions={radioOptions}
      btnText={"Add garment"}
      isAddItemModalOpen={isAddItemModalOpen}
      setIsAddItemModalOpen={setIsAddItemModalOpen}
      onSubmit={onSubmit}
    ></ModalWithForm>
  ) : null;
}

export default AddItemModal;
