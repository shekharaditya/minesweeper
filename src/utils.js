//This helper method will create an Empty 2D array for the dimentions passed
export function createEmpty2DArray(height, width) {
  let outer= [];
  for (let i = 0; i < height; i++) {
    let inner = [];
    for (let j = 0; j < width; j++) {
      inner.push("");
    }
    outer.push(inner);
  }
  return outer;
}

//This helper method will plant mines
export function plantMines(arr,bomb,minesCount) {
  let rows = arr.length;
  let cols = arr[0].length;
  while (minesCount) {
    let y = randomNumber(rows);
    let x = randomNumber(cols);
    if (!arr[y][x]) {
      arr[y][x] = bomb;
      minesCount--;
    }
  }
  return arr;
}

// This helper method will determine the number value of neighbour cells
export function neighbourValue(arr, bomb) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      if (arr[i][j] === bomb) {
        //whenever it finds bomb, it will increase 1 for each adjacent cells
        arr = neighbourAddOne(arr, i, j, bomb);
      }
    }
  }
  return arr;
}

//This helper method will increase the value of adjacent cells by 1, if the cell's underneath is bomb
function neighbourAddOne(arr,i,j,bomb) {
  let vertical = [i - 1, i, i + 1];
  let horizontal = [j - 1, j, j + 1];
  for (let x of vertical) {
    if (arr[x]) {
      for (let y of horizontal) {
        if (arr[x][y] !== undefined && arr[x][y] !== bomb) {
          // If bomb is not there and the cell is empty then do nothing
          if (typeof arr[x][y] !== "number") arr[x][y] = 0;
          // else increase the value by 1
          arr[x][y]++;
        }
      }
    }
  }
  return arr;
}

//This helper method will return a random number for the dimensions
function randomNumber(max) {
  return Math.floor(Math.random() * max);
}
