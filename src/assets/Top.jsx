export default function Top(props){
    const { score, highScore, unit, total } = props;

    return (
        <>
        <div className="top">
            <div className="title">
                <img src="../pokeball.png" alt="" />
                <p>Pokemon<span>Memory</span></p>
            </div>

            <div className="scores">
                <p>Score: <span>{score}</span></p>
                <p>High Score: <span>{highScore}</span></p>
            </div>

            <div className="outof">
                <p><span>{unit}</span> / <span>{total}</span></p>
            </div> 
        </div>
        </>
    );

}