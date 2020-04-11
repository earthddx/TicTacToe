import React from "react";
import Square from "./Square";

const styles = {
  border: "4px solid black",  
  width: "400px",
  height: "400px",
  margin: "100px auto",
  display: "grid",
  gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)",
};

export default function Board({ squares, onClick }) {
  return (
    <div style={styles}>
      {squares.map((square, i)=> (
          <Square key={i} value={square} onClick={() => onClick(i)} />
      ))}
    </div>
  );
}

