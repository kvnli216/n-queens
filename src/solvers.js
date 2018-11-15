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
  //////////////////////////////////////////
  // LEFT OFF HERE DEBUGGING ACCESSING TOGGLEPIECE IN OUR HELPER FUNCTION
  //////////////////////////////////////////
  
  let a = 'poop'; 
  debugger;
  let newBoard = new Board({'n': n});
  let boardState = newBoard.rows();
  let counter = 0;
  let numRooks = 0;
  // // define a board
  let solveBoard = function(board) {
    // input: entire board
    // base case if no next row, then something
    if (counter === boardState.length) {
      if (numRooks === n) {
        return board;
      } else {
        return undefined;
      }
    }
    let row = board[counter];
    for (let j = 0; j < row.length; j++) {
      //     place rook
      debugger;
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
        solveBoard(board);
      }  
    }
    //output: boardState if solved, else undefined
  };
  return solveBoard(boardState);
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // return solution;

  // output: list of arrays (board)
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
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
