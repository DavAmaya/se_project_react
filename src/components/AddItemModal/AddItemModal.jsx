import ModalWithForm from "../ModalWithForm/ModalWithFrom";

function AddItemModal({
  openModalWithForm,
  setOpenModalWithForm,
  radioOptions,
  setClothingItem,
  formFields,
  clothingApi,
}) {
  return openModalWithForm ? (
    <ModalWithForm
      formFields={formFields}
      hasRadio={true}
      radioOptions={radioOptions}
      btnText={"Add garment"}
      setClothingItem={setClothingItem}
      openModalWithForm={openModalWithForm}
      setOpenModalWithForm={setOpenModalWithForm}
      clothingApi={clothingApi}
    ></ModalWithForm>
  ) : null;
}

export default AddItemModal;
