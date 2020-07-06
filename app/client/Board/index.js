import React, { Component } from "react";

import { getGameData, revealCell } from "Api";
import Cell from "Cell";

class Board extends Component {
  // initialize state of the board
  state = {
    cells: [],
    gameOver: false,
    score: 0
  };

  // call method when the board is rendered for the first time
  componentDidMount() {
    //get data from localstorage
    const gameData = localStorage.getItem("gameData");

    if (!this.state.gameOver && gameData) {
      // fetch from localStorage and set the state
      this.setState({ ...JSON.parse(gameData) });
    } else {
      getGameData().then(response => {
        localStorage.setItem("gameData", JSON.stringify(response));
        this.setState({ ...response });
      });
    }
  }

  //handle the click on any of the events
  handleClick = event => {
    if (this.state.gameOver) return;

    const { id } = event.target;
    revealCell(id).then(response => {
      localStorage.setItem("gameData", JSON.stringify(response));

      this.setState({ ...response }, () => {
        if (this.state.gameOver) {
          localStorage.removeItem("gameData");
        }
      });
    });
  };
  // render the user interface
  render() {
    //get the initial state
    const { cells, gameOver, score } = this.state;

    // styles for the game over text
    const styles = {
      textAlign: "center",
      color: "red",
      fontWeight: "normal",
      fontSize: "32px",
      lineHeight: "40px"
    };

    // create empty cells which will have hidden data
    const template = cells.map(innerCells =>
      innerCells.map(cell => (
        <Cell
          key={cell.id}
          id={cell.id}
          handleClick={this.handleClick}
          className={`cell ${cell.image}`}
        />
      ))
    );

    // game over message
    const gameOverMessage = gameOver ? (
      <p style={styles}> Game over!! Your score is: {score} </p>
    ) : (
      ""
    );

    // render the Html on the screen which is responsive
    return (
      <div className="wrapper">
        {gameOverMessage}
        <div id="title">Welcome to the Arena</div>
        <div id="notes">
          <h4>The rules of the game are as follows:</h4>
          <ul>
            <li>
              The game board has 8x8 squares (initially, all represented by
              question marks){" "}
            </li>
            <li>
              There are 8 diamonds hidden on the board, each diamond behind one
              of the squares
            </li>
            <li>When the user clicks on a square</li>
            <ol>
              <li>If the square was hiding a diamond, the diamond appears</li>
              <li>Otherwise, the square is opened, and blank</li>
            </ol>
            <li>
              The game ends when all diamonds are found. The user's score is the
              number of squares still left unturned.
            </li>
          </ul>
        </div>
        <div className="diamondsweeper-board">{template}</div>
      </div>
    );
  }
}

export default Board;
