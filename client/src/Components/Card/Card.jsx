import styles from "../Card/Card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardDetails}>
        <img src={props.image} alt={props.name}></img>
        <Link to="/" className={styles.Button}>
          Descubri más
        </Link>
        <h1 className={styles.title}>{props.name}</h1>
      </div>
    </div>
  );
};

export default Card;
