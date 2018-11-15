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
  /////////////////////////////////////////////////////
  // we got this hurururhr - somehow someway rerun everything iterating backwards (mirrored)
  /////////////////////////////////////////////////////
  let newBoard = new Board({'n': n});
  let counter = 0;
  let numRooks = 0;
  let solutionCount = 0;
  let reRunNum = 0;
  let solveHash = {};

  let solveBoard = function(board) {
    debugger;
    let boardState = board.rows(); //check if newBoard is supposed to be board
    if (counter === boardState.length) {
      if (numRooks === n) {
        // actual board, convert to a var thats the stringify version
        let boardStateString = JSON.stringify(boardState);
        // add the var as a key of solveHash
        solveHash[boardStateString] = 1;
        solutionCount++;
        reRunNum++;
        counter = 0;
        numRooks = 0;
        board = new Board({'n': n});
        boardState = board.rows();
      } else {
        return undefined;
      }
      if (reRunNum === n) {
        reRunNum = 0;
        return solveBoardMirror(board); // DOUBLE CHECK INPUT
      }
    }
    let row = boardState[counter];
    if (counter === 0) {
      for (let j = 0; j < row.length; j++) {
        board.togglePiece(counter, j + reRunNum);
        if (board.hasColConflictAt(j + reRunNum)) {
          board.togglePiece(counter, j + reRunNum);
        } else {
          counter++;
          numRooks++; 
          return solveBoard(board);
        }  
      }
    } else {
      for (let j = 0; j < row.length; j++) {
        board.togglePiece(counter, j);
        if (board.hasColConflictAt(j)) {
          board.togglePiece(counter, j);
        } else {
          counter++;
          numRooks++; 
          return solveBoard(board);
        }  
      }
    }
  };

  let solveBoardMirror = function(board) {
    debugger;
    let boardState = board.rows();
    if (counter === boardState.length) {
      if (numRooks === n) {
        let boardStateString = JSON.stringify(boardState);
        solveHash[boardStateString] = 1;
        solutionCount++;
        reRunNum++;
        counter = 0;
        numRooks = 0;
        board = new Board({'n': n});
        boardState = board.rows();
      } else {
        return undefined;
      }
      if (reRunNum === n) {
        return Object.keys(solveHash).length;
      }
    }
    let row = boardState[counter];
    if (counter === 0) {
      for (let j = 0; j < row.length; j++) { //flip 0 and row.length<------- DO THIS
        board.togglePiece(counter, j + reRunNum);
        if (board.hasColConflictAt(j + reRunNum)) {
          board.togglePiece(counter, j + reRunNum);
        } else {
          counter++;
          numRooks++; 
          return solveBoardMirror(board);
        }  
      }
    } else {
      for (let j = 0; j < row.length; j++) { //flip 0 and row.length
        board.togglePiece(counter, j);
        if (board.hasColConflictAt(j)) {
          board.togglePiece(counter, j);
        } else {
          counter++;
          numRooks++; 
          return solveBoardMirror(board);
        }  
      }
    }
  };

  return solveBoard(newBoard);
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
