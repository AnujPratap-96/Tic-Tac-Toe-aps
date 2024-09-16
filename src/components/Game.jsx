import { useState } from "react";

const winnerPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const Game = () => {
  const [boxes, setBoxes] = useState(Array(9).fill(""));
  const [turnO, setTurnO] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (boxes[index] !== "" || winner) return;
    const newBoxes = [...boxes];
    newBoxes[index] = turnO ? "O" : "X";
    setBoxes(newBoxes);
    setTurnO(!turnO);
    checkWinner(newBoxes);
  };

  const checkWinner = (newBoxes) => {
    for (let pattern of winnerPatterns) {
      const [a, b, c] = pattern;
      if (
        newBoxes[a] &&
        newBoxes[a] === newBoxes[b] &&
        newBoxes[a] === newBoxes[c]
      ) {
        setWinner(newBoxes[a]);
        return;
      }
    }
  };

  const resetGame = () => {
    setBoxes(Array(9).fill(""));
    setTurnO(true);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center min-h-screen justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Tic Tac Toe</h1>
      <div className="grid grid-cols-3 gap-2">
        {boxes.map((box, index) => {
          return (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className="w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] md:w-[100px] md:h-[100px] text-3xl flex items-center justify-center border-2 border-gray-400 hover:bg-gray-200 transition-colors duration-300"
            >
              {box}
            </button>
          );
        })}
      </div>
      {winner && (
        <div className="mt-6 text-center text-2xl font-semibold">
          <p>Congratulations! Winner is {winner}</p>
        </div>
      )}
      <div className="flex space-x-4 mt-6">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
          onClick={resetGame}
        >
          New Game
        </button>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300"
          onClick={resetGame}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default Game;
