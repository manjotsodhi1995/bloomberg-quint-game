const Cell = require("./cell");

// class to create the board logic
class Board {
  constructor() {
    this.cells = this._initializeCells();

    this._diamondCells = [];
    this._revealedDiamonds = 0;
    this._cellWithHint = "";

    this.unopenedCells = 64;
    this.gameOver = false;

    this._addDiamonds();
  }

  // initialize cell with an id for 8*8 board
  _initializeCells() {
    const cells = [];
    let cellId = 0;
    for (let i = 0; i < 8; i += 1) {
      cells[i] = [];
      for (let j = 0; j < 8; j += 1) {
        cells[i].push(new Cell(cellId));
        cellId += 1;
      }
    }
    return cells;
  }

  // get a particular cell
  _getCell(xIndex, yIndex) {
    return this.cells[xIndex][yIndex];
  }

  // clear the hints
  _clearHints() {
    if (this._cellWithHint !== "") {
      this._cellWithHint.clearHint();
    }
  }

  // fimd the distance between the cells
  _findDistance(xIndex1, yIndex1, xIndex2, yIndex2) {
    const xDiff = (xIndex1 - xIndex2) ** 2;
    const yDiff = (yIndex1 - yIndex2) ** 2;
    return (xDiff + yDiff) ** 0.5;
  }

  // find the nearest diamond
  _findNearestDiamond(cell, xIndex, yIndex) {
    let minX = 0;
    let minY = 0;
    let minDistance = 10;

    for (let i = 0, len = this._diamondCells.length; i < len; i += 1) {
      const diamondCell = this._diamondCells[i];
      const distance = this._findDistance(
        xIndex,
        yIndex,
        diamondCell[0],
        diamondCell[1]
      );
      const cellImage = this._getCell(diamondCell[0], diamondCell[1]).image;
      if (distance < minDistance && cellImage === "unknown") {
        minDistance = distance;
        [minX, minY] = diamondCell;
      }
    }
    return { nearestXIndex: minX, nearestYIndex: minY };
  }

  // find the nearest diamond direction
  _findNearestDiamondDirection(cell) {
    const { xIndex, yIndex } = this._findCoordinatesForId(cell.id);
    const { nearestXIndex, nearestYIndex } = this._findNearestDiamond(
      cell,
      xIndex,
      yIndex
    );

    const xDiff = xIndex - nearestXIndex;
    const yDiff = yIndex - nearestYIndex;

    if (xDiff === 0) {
      if (yDiff > 0) {
        return "left";
      }
      return "right";
    }

    if (yDiff === 0) {
      if (xDiff > 0) {
        return "up";
      }
      return "down";
    }

    if (xDiff > 0) {
      if (yDiff > 0 && xDiff - yDiff < 0) {
        return "left";
      } else if (yDiff < 0 && xDiff - yDiff < 0) {
        return "right";
      }
      return "up";
    }

    if (yDiff > 0 && xDiff - yDiff < 0) {
      return "left";
    } else if (yDiff < 0 && xDiff - yDiff < 0) {
      return "right";
    }
    return "down";
  }

  // update the hints
  _updateHint(cell) {
    this._clearHints();
    const direction = this._findNearestDiamondDirection(cell);

    cell.addHint(direction);
    this._cellWithHint = cell;
  }

  // reveal the diamond
  revealDiamond(id) {
    const cell = this._findCell(id);
    const diamondFound = cell.reveal();

    if (diamondFound) {
      this._revealedDiamonds += 1;
    } else {
      this._updateHint(cell);
    }

    if (this._revealedDiamonds === 8) {
      this.gameOver = true;
    }
  }

  // find the coordinates of a particular id
  _findCoordinatesForId(id) {
    return { xIndex: parseInt(id / 8, 10), yIndex: id % 8 };
  }

  // find the cell
  _findCell(id) {
    const { xIndex, yIndex } = this._findCoordinatesForId(id);

    this.unopenedCells -= 1;
    return this._getCell(xIndex, yIndex);
  }

  //get the random coordinates
  _getRandomCoordinates() {
    return {
      xIndex: Math.floor(Math.random() * 8),
      yIndex: Math.floor(Math.random() * 8)
    };
  }

  // adding the diamond at 8 random places
  _addDiamonds() {
    let diamondCount = 0;
    while (diamondCount < 8) {
      const { xIndex, yIndex } = this._getRandomCoordinates();

      const status = this._getCell(xIndex, yIndex).addDiamond();

      if (status) {
        this._diamondCells.push([xIndex, yIndex]);
        diamondCount += 1;
      }
    }
  }
}

module.exports = Board;
