import { useState } from "react";
import "./App.css";

const cardArray = [
  { src: "/img/bird.jpg" },
  { src: "/img/cat.jpg" },
  { src: "/img/dog.jpg" },
  { src: "/img/flamingo.jpg" },
  { src: "/img/giraffe.jpg" },
  { src: "/img/panda.jpg" },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  // Shuffle cards
  const shuffleCards = () => {
    const shuffleCards = [...cardArray, ...cardArray]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffleCards);
    setTurns(0);
  };

  console.log(cards, turns);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Vendespillet</h1>
        <button onClick={shuffleCards}>Start</button>

        <div className="card-grid">
          {cards.map((card) => (
            <div className="card" key={card.id}>
              <div>
                <img className="front" src={card.src} alt="card front" />
                <img className="back" src="/img/back.jpg" alt="card back" />
              </div>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
