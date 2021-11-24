import "./Card.css";
import FlipSound from "./utils/FlipSound.mp3";

// De enkelte cards har eget Card component, der har egen handleClik function, hvor 4 props bliver sendt videre
export default function Card({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
      new Audio(FlipSound).play();
    }
  };

  return (
    <div className="card">
      {/* flipped er lidt special idet den kun får en className, hvis flipped er true */}
      <div className={flipped ? "flipped" : ""}>
        {/* Som default har cards et "back image", men hvis src passer på card, så bliver image's src sat og derved vist i hvad end stringen er */}
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
