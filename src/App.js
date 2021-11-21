import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import ShuffleCardsSound from "./ShuffleCardsSound.mp3";
import MatchSound from "./MatchSound.wav";

const cardArray = [
  { src: "/img/bird3.jpg", matched: false },
  { src: "/img/cat3.jpg", matched: false },
  { src: "/img/dog3.jpg", matched: false },
  { src: "/img/flamingo3.jpg", matched: false },
  { src: "/img/giraffe3.jpg", matched: false },
  { src: "/img/panda3.jpg", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [rounds, setRounds] = useState(0);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [matchedCardsCount, setMatchedCardsCount] = useState(0);
  const [gameWon, setGameWon] = useState({ isWon: false, msg: "" });

  // Shuffle cards
  const shuffleCards = () => {
    const shuffleCards = [...cardArray, ...cardArray]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setFirstChoice(null);
    setSecondChoice(null);

    setMatchedCardsCount(0);
    setGameWon({ isWon: false, msg: "" });
    new Audio(ShuffleCardsSound).play();

    setCards(shuffleCards);
    setRounds(1);
  };

  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  };

  useEffect(() => {
    if (matchedCardsCount > 0 && matchedCardsCount === cards.length / 2) {
      setGameWon({ isWon: true, msg: "Tillykke! Du har vundet" });
    }
  }, [matchedCardsCount, cards]);

  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      if (firstChoice.src === secondChoice.src) {
        setMatchedCardsCount((m) => m + 1);
        new Audio(MatchSound).play();
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === firstChoice.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [firstChoice, secondChoice]);

  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setRounds((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Vendespillet</h1>
      <button onClick={shuffleCards}>Start nyt spil</button>
      {gameWon.isWon && (
        <h1>
          {gameWon.msg} i runde {rounds}!
        </h1>
      )}
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={
              card === firstChoice || card === secondChoice || card.matched
            }
            disabled={disabled}
          />
        ))}
      </div>
      <p>Runde {rounds}</p>
    </div>
  );
}

export default App;
