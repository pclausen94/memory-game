import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card/Card";
import ShuffleCardsSound from "./utils/ShuffleCardsSound.mp3";
import MatchSound from "./utils/MatchSound.wav";

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

  /*   Denne shuffle algoritme gør brug af spread operatoren til at kører CardArray 
  igennem 2 gange og sortere dem ved hjælp af et nummer, for til sidst at tilegne et card til specifikke numre (udnytter her id) */
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

  // Sammenligner ved hjælp af useState, om første kort er det samme som det andet kort
  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  };

  // Når matchedCardsCount er større end 0 (altså efter runde 1) og staten er det samme som cards divderet i 2 - altså arrayet, så opdatere den objektet med boolean og string
  useEffect(() => {
    if (matchedCardsCount > 0 && matchedCardsCount === cards.length / 2) {
      setGameWon({ isWon: true, msg: "Tillykke! Du har vundet" });
    }
  }, [matchedCardsCount, cards]);

  // Opdatere states afhængig af forskellige conditions, primært for at tjekke om enkelte cards matcher
  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      if (firstChoice.src === secondChoice.src) {
        setMatchedCardsCount((m) => m + 1);
        new Audio(MatchSound).play();
        setCards((prevCards) => {
          return prevCards.map((card) => {
            // Her kan også bruge secondChoice.src i stedet, da princippet for at compare er det samme
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

  // genstarter turen ved klik på knappen "Start nyt spil"
  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setRounds((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // sætter kortene til at blive vist når app'en åbnes. Fjernes denne skal der klikkes på knappen før der bliver shufflet
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
