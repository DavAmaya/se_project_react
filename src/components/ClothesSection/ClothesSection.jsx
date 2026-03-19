import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({
  clothingItems,
  setSelectedCard,
  setIsAddItemModalOpen,
}) {
  function handleSelectedCard(card) {
    setSelectedCard(card);
  }

  function openForm() {
    setIsAddItemModalOpen(true);
  }
  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p className="clothes-section__text">Your Items</p>
        <button className="clothes-section__button" onClick={openForm}>
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems
          ? clothingItems.map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  clothingItem={item}
                  handleSelectedCard={handleSelectedCard}
                ></ItemCard>
              );
            })
          : null}
      </ul>
    </div>
  );
}
