import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Board from "../Board";
import "./index.css";

export default class App extends Component {

  state = {
    dimension: 4,
    mines: 5,
  };
  handleReset = () => {
    window.location.reload();
  }

  handleChange= (e) => {
    // if(e.target.value <=0) {
    //   alert('Please enter correct values');
    //   return;
    // }
    if((this.state.dimension * this.state.dimension) < e.target.value) 
      alert('Mines exceeds number of cells!! Please enter again');
    else 
      this.setState({mines: e.target.value});
  }

  //select level of difficulty
  handleDropdown = () => {
    let difficulty = document.getElementById("level_select");
    if (difficulty.value === 'easy') {
      this.setState({
          dimension: 4,
          mines: 5,
      });
    }
    if (difficulty.value === 'beginner') {
        this.setState({
            dimension: 8,
            mines: 10,
        });
    }
    if (difficulty.value === 'intermediate') {
        this.setState({
            dimension: 12,
            mines: 20,
        });
    }
    if (difficulty.value === 'expert') {
        this.setState({
            dimension: 16,
            mines: 40,
        });
    }
  }
  render() {
    const { dimension, mines } = this.state;
    return (
      <div>
        <div className="App">
          <h1>Minesweeper</h1>
          <div className="game-info">
                  <span className="info">Please select level:
                  <select id="level_select" onChange={this.handleDropdown}>
                      <option value="easy"> Easy </option>
                      <option value="beginner"> Beginner </option>
                      <option value="intermediate"> Intermediate </option>
                      <option value="expert"> Expert </option>
                  </select>
                  </span>
                  <input 
                      type="text" 
                      value={this.state.mines} 
                      onChange={this.handleChange.bind(this) } 
                      placeholder="Enter number of mines"
                  />
                  <Button variant="contained" color="primary"onClick={this.handleReset}>New Game</Button>
              </div>
          <br />
          <Board dimension={dimension} mines={mines} />
          <div className = "rules">
            <h2>Rules of the Game -:</h2>
            <p>DO NOT click on mines</p>
            <p>Each number on the cell tells you how many bombs are adjacent to it.</p>
            <p>There can be max 8 neighbors, keep that in mind</p>
            <p>Use elimnination to choose where to click next.</p>
            <p>Have fun!!!!</p>
            <h3>Note: You can customize level and number of bombs as per your convenience</h3>
          </div>
        </div>
      </div>
    );
  }
}
