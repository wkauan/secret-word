import "./GameOver.css";

const GameOver = ({ retry, score, pickedWord }) => {
  return (
    <div>
      <h1>Fim de jogo</h1>
      <h2>
        A sua pontuação foi: <span>{score}</span>
      </h2>
      <p>
        A palavra era: <span>{pickedWord}</span>
      </p>
      <button onClick={retry}>Recomeçar o jogo</button>
    </div>
  );
};

export default GameOver;
