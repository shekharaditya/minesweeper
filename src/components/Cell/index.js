import React, { Component } from "react";
import classNames from "classnames";

//game over flag
let isGameOver = false;

// reveal cells recursively
function revealCells(target, height, width) {
  target.id = `${height}_${width}_`;
  let vertical = [height - 1, height, height + 1];
  let horizontal = [width - 1, width, width + 1];
  for (let i of vertical) {
    for (let j of horizontal) {
      //asynchronous, code runs a tad bit later than the rest of the code inside the recursionClick function
      //This is important because we need the target.id to be modified before the recursive click() function occurs
      // or else infinite loops occurs
      setImmediate(() => {
        if (document.getElementById(`${i}_${j}`))
          document.getElementById(`${i}_${j}`).click();
      });
    }
  }
  return;
}
// thr game is over when you click on a cell with mine
function gameOver(target) {
  isGameOver = true;
  //make the background of the cell red
  target.style.backgroundColor = "red";
  let height = target.parentElement.parentElement.children.length;
  let width = target.parentElement.children.length;
  // since the game is over, go ahead and click all the cells and hence reveal the mines underneath
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (document.getElementById(`${i}_${j}`))
        document.getElementById(`${i}_${j}`).click();
    }
  }
  return;
}

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false, flag: "" };
  }
  handleCellClick({ target }) {
    let { row, column, cellsClicked, value } = this.props;
    let { clicked, flag } = this.state;
    if (!flag) this.setState({ clicked: true });
    if (!clicked) cellsClicked();
    if (!isGameOver) {
      // Empty cell click --> reveal cells recursively
      if (value === "" && target.id === `${row}_${column}`)
        revealCells(target, row, column);
      //click bomb scenario --> end game
      if (value === "💣" && !flag) {
        gameOver(target);
      }
    }
  }

  //right click, this will toggle the flag
  handleContextMenu(e) {
    //prevent the default behavior of right click
    e.preventDefault();
    let { clicked, flag } = this.state;
    if (!clicked)
      flag ? this.setState({ flag: "" }) : this.setState({ flag: "⚑" });
  }
  render() {
    let { row, column, value } = this.props;
    let { clicked, flag } = this.state;
    let cellsClass = classNames({
      cell: true,
      clicked,
      bomb: value === "💣"
    });
    return (
      <td
        id={`${row}_${column}`}
        className={cellsClass}
        onClick={this.handleCellClick.bind(this)}
        onContextMenu={this.handleContextMenu.bind(this)}
      >
        {clicked && !flag ? value : ""}
        {flag}
      </td>
    );
  }
}

export default Cell;

