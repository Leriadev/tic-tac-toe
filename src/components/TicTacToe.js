import React from "react";
import "./TicTacToe.css";

const TicTacToe = () => {
  const [turn, setTurn] = React.useState("x");
  const [winner, setWinner] = React.useState();
  const [cells, setCells] = React.useState(Array(9).fill(""));
  const restart = () => {
    setWinner(null)
    setCells(Array(9).fill(""))
    setTurn('x')
  }
  const checkForWinner = (squares) => {
    let combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonol: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };
    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
            // Если одна или несколько ячеек с индексами паттернов пустые, 
          squares[pattern[0]] === "" ||
          squares[pattern[1]] === "" ||
          squares[pattern[2]] === ""
        ) { // ничего не делаем
        } else if ( // иначе если символы в ячейках паттернов одинаковы, то
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[0]] === squares[pattern[2]]
        ) {
            setWinner(squares[pattern[0]]) // устанавливаем победителя
        }
      });
    }
  };

  const handleClick = (num) => {
    let squares = [...cells];
    if (squares[num] != "") return;
    if (turn == "x") {
      squares[num] = "x";
      setTurn("o");
    } else {
      squares[num] = "o";
      setTurn("x");
    }
    checkForWinner(squares);
    setCells(squares);
  };

  const Cell = ({ num }) => {
    return <td onClick={winner == null ? () => handleClick(num) : ()=>{}}>{cells[num]}</td>;
  };

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      Turn: {turn}
      <div className="game">
        <table>
          <tbody>
            <tr>
              <Cell num={0} />
              <Cell num={1} />
              <Cell num={2} />
            </tr>
            <tr>
              <Cell num={3} />
              <Cell num={4} />
              <Cell num={5} />
            </tr>
            <tr>
              <Cell num={6} />
              <Cell num={7} />
              <Cell num={8} />
            </tr>
          </tbody>
        </table>
      </div>
        {winner && (<div><p>{winner} is the winner!</p></div>)}
      <button onClick={restart}>Play again</button>
    </div>
  );
};

export default TicTacToe;
