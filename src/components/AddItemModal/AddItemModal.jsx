import ModalWithForm from "../ModalWithForm/ModalWithFrom";

function AddItemModal({
  isAddItemModalOpen,
  setIsAddItemModalOpen,
  radioOptions,
  setClothingItems,
  formFields,
  clothingApi,
}) {
  return isAddItemModalOpen ? (
    <ModalWithForm
      formFields={formFields}
      hasRadio={true}
      radioOptions={radioOptions}
      btnText={"Add garment"}
      setClothingItems={setClothingItems}
      isAddItemModalOpen={isAddItemModalOpen}
      setIsAddItemModalOpen={setIsAddItemModalOpen}
      clothingApi={clothingApi}
    ></ModalWithForm>
  ) : null;
}

export default AddItemModal;
