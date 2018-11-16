/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  // input: num (size of board)
  // var solution = undefined; //fixme
  let newBoard = new Board({'n': n});

  let counter = 0;
  let numRooks = 0;
  // // define a board
  let solveBoard = function(board) {
    // input: entire board
    let boardState = board.rows(); // we are changing newBoard to board ???
    // base case if no next row, then something
    if (counter === boardState.length) {
      if (numRooks === n) {
        // instead of returning immediately
        // create solution array to push multiple solutions
        // if there are no more solutions
        // return solutions array
        return board.rows();
      } else {
        return undefined;
      }
    }
    let row = boardState[counter];
    for (let j = 0; j < row.length; j++) {
      //     place rook
      board.togglePiece(counter, j);
      if (board.hasColConflictAt(j)) {
        board.togglePiece(counter, j);
      } else {
        //     if next row iterate next row 
        //       if no collisions with this index 
        //         place rook
        //         recall helper function
        counter++;
        numRooks++; 
        return solveBoard(board);
      }  
    }
    //output: boardState if solved, else undefined
  };
  return solveBoard(newBoard);
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // return solution;

  // output: list of arrays (board)
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  let newBoard = new Board({'n': n});
  let solutionCounter = 0;
  let rowIndex = 0;
  let pieceCounter = 0;

  // solveBoard(rowIndex);
  let solveBoard = function(rowIndex) {
  //   iterates over rowIndex (i)
    for (let i = 0; i < n; i++) {
      newBoard.togglePiece(rowIndex, i);
      if (newBoard.hasColConflictAt(i)) {
        //       untoggle
        newBoard.togglePiece(rowIndex, i);
      } else {
        pieceCounter++;
        //     else (if pass) 
        //       if next row exists
        if (rowIndex + 1 < n) {
          //         solveBoard(rowIndex + 1)
          solveBoard(rowIndex + 1);
        } else {
          //       else (this is the last row)
          if (pieceCounter === n) {
            //         if we placed all the pieces
            //           add to solutionCounter
            solutionCounter++;
            if (i + 1 < n) {
              newBoard.togglePiece(rowIndex, i);
              pieceCounter--;
            }
          }
        }
      }
    }
    let board = newBoard.rows();
    for (let i = 0; i < n; i++) {
      if (board[rowIndex][i] === 1) {
        newBoard.togglePiece(rowIndex, i);
        pieceCounter--;
      }
      if (rowIndex !== 0) {
        if (board[rowIndex - 1][i] === 1) {
          newBoard.togglePiece(rowIndex - 1, i);
          pieceCounter--;
        }
      }
    }
  };
  
  solveBoard(rowIndex);

  return solutionCounter;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
