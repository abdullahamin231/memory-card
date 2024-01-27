import { useState } from "react";
import Start from "./Start";
import MemoryCards from "./MemoryCards";
import Top from './Top';

const sizes = {
    "easy": 5,
    "medium": 10,
    "hard": 20,
}

export default function Cards() {
    const [mode, setMode] = useState('easy');
    const [score, setScore] = useState(0);
    const [highScore, setHigh] = useState(0);
    const [unit, setUnit] = useState(0);
    const [total, setTotal] = useState(sizes[mode]);
    const [gameStarted, setGameStarted] = useState(false);

    function startGame() {
        setGameStarted(true);
    }

    return (
        <>
            <Top score={score} highScore={highScore} total={total} unit={unit} />
            
            {gameStarted ? (
                
                <MemoryCards score={score} highScore={highScore} setScore={setScore} setHighScore={setHigh} size={sizes[mode]} />
            ) : (
                <Start setMode={setMode} startGame={startGame} />
            )}
        </>
    );
}
