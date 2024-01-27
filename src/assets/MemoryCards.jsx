import React, { useEffect, useState, useRef } from "react";
import GameOverButton from "./GameOver";
// import LoadingScreen from "./LoadingScreen";
const baseUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon`;

const generateRandomIds = (size) => {
const ids = [];
for (let i = 0; i < size; i++) {
  ids[i] = Math.floor(Math.random() * 1024) + 1;
}
return ids;
};

const Card = ({ pokemon, onClick, onClickCard, setTotal, setScore }) => {
const cardRef = useRef(null);

return (
  <div
    className="card"
    key={pokemon.id}
    ref={cardRef}
    onClick={() => {
      onClick();
      onClickCard(pokemon);
      setTotal((prevTotal) => prevTotal + 1); // Increment total
      setScore((prevScore) => prevScore + 1);
    }}
  >
    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    <p>{pokemon.name}</p>
    <div className="glow"></div>
  </div>
);
};

function shuffle(array) {
let currentIndex = array.length,
  randomIndex;

while (currentIndex > 0) {
  randomIndex = Math.floor(Math.random() * currentIndex);
  currentIndex--;

  [array[currentIndex], array[randomIndex]] = [
    array[randomIndex],
    array[currentIndex],
  ];
}

return array;
}

export default function MemoryCards({ score, setScore, size, setHighScore, highScore }) {
const [data, setData] = useState([]);
const [IDs, setIDs] = useState(generateRandomIds(size));
const [total, setTotal] = useState(0);
const [gameOver, setGameOver] = useState(false);
const [isLoading, setLoading] = useState(true);
const [clickedCardId, setClickedCardId] = useState([]);

const fetchData = async () => {
  const newData = [];
  for (let i = 0; i < size; i++) {
    const response = await fetch(`${baseUrl}/${IDs[i]}`);
    const res = await response.json();
    newData.push(res);
  }
  setLoading(false);
  setData(newData);
};

useEffect(() => {
  fetchData();
}, [IDs, size]);

const handleClick = () => {
  setData((prevData) => {
    const newData = [...prevData];
    shuffle(newData);
    return newData;
  });
};

const handleCardClick = (pokemon) => {
  if (pokemon) {
    if (clickedCardId.includes(pokemon.id)) {
      if(score > highScore) setHighScore(score);
      setScore(0);
      setGameOver(true);
      return;
    }
    setClickedCardId((prevData) => [...prevData, pokemon.id]);
  }
};

const playAgain = () => {
  setGameOver(false);
  setClickedCardId([]);
  setScore(0);
  setIDs(generateRandomIds(size));
  setTotal(0);
};

const quit = () => {
  console.log("quit");
  // Add logic for quitting the game
};
if(isLoading){
  return (
    <div className="loading">
          <img src="/ls.png" alt="" />
          <h2>Loading Cards...</h2>
      </div>
  );
}

return (
  <div className="cards">
    {!gameOver && data.map((pokemon) => (
      <Card
        key={pokemon.id}
        pokemon={pokemon}
        onClick={handleClick}
        onClickCard={handleCardClick}
        setTotal={setTotal}
        setScore={setScore}
      />
    ))}
    {gameOver && (
      <div className="gameover">
        <p>GAME OVER! YOU LOST</p>
        <GameOverButton text="Play Again" onClick={playAgain} />
        <GameOverButton text="Quit" onClick={quit} />
      </div>
    )}
  </div>
);
}
