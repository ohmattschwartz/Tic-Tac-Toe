// defines the variable state as an an array with three
// more arrays that represent the rows and columns of the tic tac toe board
const state = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]
// defines the variable x with a value of 1
const X = 1
// defines the variable o with a value of 2
const O = 2
// defines the variable cellValues as an object
// with key value pairs ex. 0 is the key and the emptry string
// is the value associated with that key
const cellValues = { 0: '', 1: 'X', 2: 'O' }
//defines the global variable playerTurn and initialized it to x that can be accessed anywhere in the program and references whose turn it is
let playerTurn = X
let won = false
//drawBoard is a function (=> means function) that contains a for loop.  This function draws the board.  i represents rows, j represents columns.
const drawBoard = () => {
//  initializer, condition, incrementer or after thought
  for (let i = 0; i < state.length; i++) {
    for (let j = 0; j < state[i].length; j++) {
// the value col is equal to row i column j like x and y coordinates
      const col = state[i][j]
// selects against a css selector in this case refers to the table and table rows the nth child of i+1 and the table data nth child j+1 (represents which cell we are in on the table/tic tac toe board)
      const cell = document.querySelector(
        `table tr:nth-child(${i+1}) td:nth-child(${j+1})`
      )
// the text content will become the value stored in each cell which is referenced by the col value. if col = 0 we get back an empty string.  if col = 1 we get back an x.  if col = 2 we get back an o.
      cell.textContent = cellValues[col]
    }
  }
//the message that is below our board will be set to whose turn it currently is using string interpolation on the cell values based on the player turns.
  if (!won) {
    document.querySelector('.message').textContent = `It's ${cellValues[playerTurn]}'s move.`
  }
}
// play function where we pass in a row, a column, and a player when we call it.  based on the row and column we know exactly where the x a y coordinates are and set = to where that player is.
const play = (row, col) => { // play function where we pass in a row, a column and a player when we call it by clicking on the button.
 if (state[row][col] === 0 && !won) {
   state[row][col] = playerTurn
   if (checkForWinner()) {
     console.log(playerTurn, 'You won!')
     document.querySelector('.message').textContent = `Congratulations! ${cellValues[playerTurn]} won!`
   }
 }
 playerTurn = playerTurn === X ? O : X
}
const checkForWinner = () => { // function to check for winner
 let arr = [
   [state[0][0], state[0][1], state[0][2]], // first row.
   [state[1][0], state[1][1], state[1][2]], // second row.
   [state[2][0], state[2][1], state[2][2]], // third row.
   [state[0][0], state[1][0], state[2][0]], // first column.
   [state[0][1], state[1][1], state[2][1]], // second column.
   [state[0][2], state[1][2], state[2][2]], // third column.
   [state[0][0], state[1][1], state[2][2]], // first diagonal.
   [state[0][2], state[1][1], state[2][0]] // second diagonal.
 ]
 for (let i = 0; i < arr.length; i++) {
   won = arr[i].every(function (m) { return m === playerTurn }) // won equals = arr1 (row in array above) and m equals random variable. Is the variable the only variable in the array? Checks for that.
   if (won) { return true }
 }
}
//initialize the first function we call when the DOM is loaded
const init = () => {
// loop through the table rows.
  const rows = document.querySelectorAll('tr')
  for (let i = 0; i < rows.length; i++) {
// loop through table data (cells)
    const cols = rows[i].querySelectorAll('td')
    for (let j = 0; j < cols.length; j++) {
// establishes that we can click on the table data in the current cell
      cols[j].addEventListener('click', () => {
        play(i, j, playerTurn)
// draws x or o in each cell and changes the player's turn
        drawBoard()
      })
    }
  }
  drawBoard()
}

document.addEventListener('DOMContentLoaded', init)
