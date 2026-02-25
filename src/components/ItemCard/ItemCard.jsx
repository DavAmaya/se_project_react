import { useEffect, useState } from "react";
import "./ItemCard.css";

function ItemCard({ weatherCondition, clothing, setSelectedCard }) {
  const [filteredClothing, setFilteredClothing] = useState(null);

  useEffect(() => {
    setFilteredClothing(
      clothing.filter((item) => {
        return weatherCondition === item.weather;
      }),
    );
  }, [weatherCondition, clothing]);

  function handleSelectedCard(card) {
    setSelectedCard(card);
  }

  return (
    <div className="cardItems_container">
      <ul className="cardList__container">
        {filteredClothing
          ? filteredClothing.map((item) => {
              return (
                <li
                  className="card__container"
                  key={item._id}
                  onClick={() => handleSelectedCard(item)}
                >
                  <span className="card__name">{item.name}</span>
                  <img
                    className="card__img"
                    src={item.link}
                    alt={item.name}
                  ></img>
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
}

export default ItemCard;
