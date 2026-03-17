import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

export default function Profile({
  clothingItems,
  setSelectedCard,
  setOpenModalWithForm,
}) {
  return (
    <section className="profile">
      <SideBar></SideBar>
      <ClothesSection
        clothingItems={clothingItems}
        setSelectedCard={setSelectedCard}
        setOpenModalWithForm={setOpenModalWithForm}
      ></ClothesSection>
    </section>
  );
}
