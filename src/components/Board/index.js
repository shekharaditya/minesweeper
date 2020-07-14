// @flow

import React, { Component } from "react";
import Cell from "../Cell";
import {
  createEmpty2DArray,
  plantMines,
  neighbourValue
} from "../../utils";

class Board extends Component {
  state = {
    boardData: neighbourValue(
      plantMines(createEmpty2DArray(this.props.dimension, this.props.dimension),
      "💣",
      this.props.mines),
      "💣"
    ),
    cellsClickedCount: 1,
    win: false,
  };


  handleCellsClicked() {
    let notMinesCells = (this.props.dimension * this.props.dimension) - this.props.mines;
    let { cellsClickedCount } = this.state;
    this.setState({
      cellsClickedCount: cellsClickedCount + 1
    });
    // checking if the numbers of cells clicked is equal to cells which does not have mine underneath
    if (cellsClickedCount === notMinesCells) {
      // You won !!!
      this.setState({
        win: true,
      })
      let cols = this.props.dimension;
      let rows = this.props.dimension;
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (document.getElementById(`${i}_${j}`))
            document.getElementById(`${i}_${j}`).click();
        }
      }
    }
  }

  // Component methods
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
        this.setState({
          boardData: neighbourValue(
            plantMines(createEmpty2DArray(nextProps.dimension, nextProps.dimension), "💣", nextProps.mines),
            "💣"
          ),
        });
    }
 }

  render() {
    return (
      <div>
        <div>
          <span className="winningSpan">{this.state.win ? "Hurray!! You won!!!": null}</span>
          <span className="losingSpan">Oops!! You lost. Please try again!!</span>
        </div>
        <table>
          <tbody>
            {this.state.boardData.map((item, row) => {
              return (
                <tr key={row} className="mapRow">
                  {item.map((subitem, col) => {
                    return (
                      <Cell
                        key={col}
                        row={row}
                        column={col}
                        value={subitem}
                        cellsClicked={this.handleCellsClicked.bind(this)}
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Board;
