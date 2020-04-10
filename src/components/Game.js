import React, { useState } from "react";
import Board from "./Board";
import calculateWinner from "../helpers/";

export default function Game() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(board);

  function handleClick(i) {
    //logic that controls the game
    const boardCopy = [...board]; //it creates shallow copy but it works in this case
    if (winner || boardCopy[i]) return;
    boardCopy[i] = xIsNext ? "X" : "O";
    setBoard(boardCopy);
    setXisNext(!xIsNext);
  }

  return <Board squares={board} onClick={handleClick} />;
}
