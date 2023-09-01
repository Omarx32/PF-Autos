import Card from "../Card/Card";
import "../Cards/styles.css";
const Cards = ({ cars }) => {
  return (
    <div className="cards">
      {cars.map(({ name, image }) => {
        return <Card title={name} image={image}></Card>;
      })}
    </div>
  );
};

export default Cards;
