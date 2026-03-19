import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

export default function Profile({
  clothingItems,
  setSelectedCard,
  setIsAddItemModalOpen,
}) {
  return (
    <section className="profile">
      <SideBar></SideBar>
      <ClothesSection
        clothingItems={clothingItems}
        setSelectedCard={setSelectedCard}
        setIsAddItemModalOpen={setIsAddItemModalOpen}
      ></ClothesSection>
    </section>
  );
}
