const express = require("express");

const app = express();
// get the board
const Board = require("./app/models/board");

app.set("view engine", "ejs");
app.use(express.static("public"));

// make the new board
const board = new Board();

// return game data
const returnGameData = res => {
  const data = {
    cells: board.cells,
    gameOver: board.gameOver,
    score: board.unopenedCells
  };
  res.send(JSON.stringify(data));
};

//sample uri
app.get("/", (req, res) => {
  res.render("home/index");
});

// get the game data
app.get("/game_data", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  returnGameData(res);
});

// adding the cell to particular id
app.put("/cell/:id", (req, res) => {
  const { id } = req.params;

  if (!board.gameOver) {
    board.revealDiamond(id);
  }

  returnGameData(res);
});

app.listen(3000, () => {
  console.log(
    "Example app listening on port 3000!"
  ); /* eslint-disable-line no-console */
});
