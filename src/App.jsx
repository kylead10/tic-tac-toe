import { useState } from 'react';
import './Footer';

function Box({ value, onBoxClick }) {
  const style = value === 'X' ? 'square x' : 'square o';

  return (
    <button className={style} onClick={onBoxClick}>
      {value}
    </button>
  );
}

function Board({ player1Name, player2Name, playClicked }) {
  const [boxes, setBoxes] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [score, setScore] = useState({ xScore: 0, oScore: 0 });
  const [scoreUpdated, setScoreUpdated] = useState(false);

  function handleClick(i) {
    if (boxes[i] || calculateWinner(boxes)) return;

    const nextBoxes = boxes.slice();

    nextBoxes[i] = xIsNext ? 'X' : 'O';
    setBoxes(nextBoxes);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(boxes);

  let status = '';
  if (winner) {
    status =
      'Congratulations to ' +
      (!xIsNext ? player1Name : player2Name) +
      ' for winning the game';
    if (!scoreUpdated) {
      setScore((prevScore) =>
        !xIsNext
          ? { xScore: prevScore.xScore + 1, oScore: prevScore.oScore }
          : { xScore: prevScore.xScore, oScore: prevScore.oScore + 1 }
      );
      setScoreUpdated(!scoreUpdated);
    }
  } else {
    status = 'Turn: ' + (xIsNext ? player1Name + '(X)' : player2Name + '(O)');
    if (boxes.every((value) => value) && !winner) {
      status = 'The game is a draw 👍';
    }
  }

  function resetGame() {
    if (boxes.some((value) => value !== null)) {
      setBoxes(Array(9).fill(null));
      setXIsNext(true);
      setScoreUpdated(!scoreUpdated);
    }
  }
  const boardClassName = playClicked ? 'game active' : 'game';
  return (
    <>
      <div className={boardClassName}>
        <h1 className='title'>Tic-Tac-Toe Game</h1>
        <div className='score'>
          <p>
            Score {player1Name} : {score.xScore}
          </p>
          <p>
            Score {player2Name} : {score.oScore}
          </p>
        </div>
        <p className='status'>{status}</p>
        <div className='board'>
          <Box value={boxes[0]} onBoxClick={() => handleClick(0)} />
          <Box value={boxes[1]} onBoxClick={() => handleClick(1)} />
          <Box value={boxes[2]} onBoxClick={() => handleClick(2)} />
          <Box value={boxes[3]} onBoxClick={() => handleClick(3)} />
          <Box value={boxes[4]} onBoxClick={() => handleClick(4)} />
          <Box value={boxes[5]} onBoxClick={() => handleClick(5)} />
          <Box value={boxes[6]} onBoxClick={() => handleClick(6)} />
          <Box value={boxes[7]} onBoxClick={() => handleClick(7)} />
          <Box value={boxes[8]} onBoxClick={() => handleClick(8)} />
        </div>
        <button className='reset' onClick={resetGame}>
          Restart the game
        </button>
      </div>
    </>
  );
}

export default function Game() {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [playClicked, setPlayClicked] = useState(false);

  function handlePlayers() {
    const inputValue1 = document.getElementById('Player-1').value;
    const inputValue2 = document.getElementById('Player-2').value;

    setPlayer1Name(inputValue1);
    setPlayer2Name(inputValue2);

    if (inputValue1 && inputValue2) setPlayClicked(true);
    else {
      alert('Player names must be filled in');
    }
  }
  return (
    <>
      {!playClicked ? (
        <label className='playerNames'>
          <input
            className='player'
            type='text'
            placeholder='Enter Player 1 name'
            id='Player-1'
            required
          />
          <input
            className='player'
            type='text'
            placeholder='Enter Player 2 name'
            id='Player-2'
            required
          />
          <button onClick={handlePlayers} className='playButton'>
            Start
          </button>
        </label>
      ) : null}
      <Board
        player1Name={player1Name}
        player2Name={player2Name}
        playClicked={playClicked}
      />
    </>
  );
}

function calculateWinner(boxes) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
      return boxes[a];
    }
  }
  return null;
}
