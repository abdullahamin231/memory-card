import GameOverButton from "./GameOver";

export default function Start({ setMode, startGame }) {
    function setM(text) {
        setMode(text);
    }

    return (
        <div className="start">
            <div className="options">
                <button onClick={startGame}>Start Game</button>
            </div>
            <div className="diff">
                <GameOverButton onClick={() => setM('easy')} text="easy" />
                <GameOverButton onClick={() => setM('medium')} text="medium" />
                <GameOverButton onClick={() => setM('hard')} text="hard" />
            </div>
        </div>
    );
}
