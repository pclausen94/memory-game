import "./Card.css";
import FlipSound from "./FlipSound.mp3";

export default function Card({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
      new Audio(FlipSound).play();
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          src="/img/back3.jpg"
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
}
