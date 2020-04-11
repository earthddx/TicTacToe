import React, { useState, useEffect } from "react";
import { calculateWinner } from "../util/helpers";
import Board from "./Board";

const styleLarge = {
  width: "200px",
  margin: "20px auto",
  position: "absolute",
  top: "100px",
  right: "10%",
};

const styleSmall = {
  width: "200px",
  margin: "20px auto",
};

function useMedia(query) {
  let [matches, setMatches] = useState(window.matchMedia(query).matches);

  // cDM, cDU
  useEffect(() => {
    let media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    let listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [query, matches]);

  return matches;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);

  let small = useMedia("(max-width: 1200px)");

  function handleClick(i) {
    const timeInHistory = history.slice(0, stepNumber + 1);
    const current = timeInHistory[stepNumber];
    const squares = [...current];
    if (winner || squares[i]) return; // if theres a winner already or a user clicked on a occupied square already
    squares[i] = xIsNext ? "X" : "O"; //X or O turn
    setHistory([...timeInHistory, squares]); //update the state
    setStepNumber(timeInHistory.length);
    setXisNext(!xIsNext); //set X or O next
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  }

  function renderMoves() {
    return history.map((_step, move) => {
      const destination = move ? `Go to move#${move}` : "Go to start";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });
  }

  return (
    <>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div style={small ? styleSmall : styleLarge}>
        <p style={{fontSize: '20px'}}>
          {winner
            ? "Winner: " + winner
            : "Next Player: " + (xIsNext ? "X" : "O")}
          {renderMoves()}
        </p>
      </div>
    </>
  );
}
