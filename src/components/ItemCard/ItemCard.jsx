import "./ItemCard.css";

function ItemCard({ clothingItem, handleSelectedCard }) {
  return (
    <li
      className="card__container"
      onClick={() => handleSelectedCard(clothingItem)}
    >
      <span className="card__name">{clothingItem.name}</span>
      <img
        className="card__img"
        src={clothingItem.imageUrl}
        alt={clothingItem.name}
      ></img>
    </li>
  );
}

export default ItemCard;
