// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // input num (row number)
      // initialize counter var = 0
      let counter = 0;
      // save board to a rows var
      let row = this.rows()[rowIndex];
      // iterate through currentRow
      for (let i = 0; i < row.length; i++) {
      //   everytime we hit a queen add 1 to counter
        if (row[i] === 1) {
          counter++;
        }
      }

      if (counter > 1) {
      // if counter > 1
      //   return true
        return true;
      }
      // return false
      return false;
      // output boolean
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // save board to rows var
      let rows = this.rows();
      // iterate through every row
      for (let i = 0; i < this.attributes.n; i++) { //iterates through size of board
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      //   if (hasRowConflictAt current row)
      //     return true

      // return false
      return false;

    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // input: num (column index)
      // save board to rows variable
      let rows = this.rows();
      // create counter variable
      let counter = 0;
      // iterate through every row
      for (let i = 0; i < this.attributes.n; i++) {
        //   if equal to 1 
        if (rows[i][colIndex] === 1) {
          //   add to counter
          counter++;
        }
      }
      
      if (counter > 1) {
        // if counter > 1 return true
        return true;
      }
      // else return false
      return false;
      // output: boolean
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // input: n/a
      // iterate size of board 
      for (let i = 0; i < this.attributes.n; i++) {
        //   run hasColConflictAt specific index
        if (this.hasColConflictAt(i)) {
          //   if true return true 
          return true;
        }
      }
      
      // return false
      return false;
      // output: boolean
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // input: num (index of first row)
      // set counter variable
      let counter = 0;
      // set row variable
      let rows = this.rows();
      let input = majorDiagonalColumnIndexAtFirstRow;
      // iterate size of board
      for (let i = 0; i < this.attributes.n; i++) {
        // if its not undefined run below lines
        if (rows[i][i + input] === 1) {
          counter++;
        }
      }
      // if counter > 1 
      if (counter > 1) {
        //   return true 
        return true;
      }
      // else return false

      return false;
      // output: boolean
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // starting point = -(boardlength-1)
      let rows = this.rows();
      let startIndex = -(rows.length - 1);
      // iterate from starting point to boardsize
      for (let i = startIndex; i < this.attributes.n; i++) {
      //   call hasMajorDiagonalConflictAt 
        if (this.hasMajorDiagonalConflictAt(i)) {
          //     if true return true
          return true;
        }
      }

      // return false
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // input: num (index of first row)
      // set counter variable
      let counter = 0;
      // set row variable
      let rows = this.rows();
      let input = minorDiagonalColumnIndexAtFirstRow;
      // iterate size of board
      for (let i = 0; i < this.attributes.n; i++) {
        // if its not undefined run below lines
        if (rows[i][input - i] === 1) {
          counter++;
        }
      }
      // if counter > 1 
      if (counter > 1) {
        //   return true 
        return true;
      }
      // else return false

      return false;
      // output: boolean
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // starting point = -(boardlength-1)
      let rows = this.rows();
      let endIndex = 2 * (rows.length - 1);
      // iterate from starting point to boardsize
      for (let i = 0; i <= endIndex; i++) {
      //   call hasMinorDiagonalConflictAt 
        if (this.hasMinorDiagonalConflictAt(i)) {
          //     if true return true
          return true;
        }
      }

      // return false
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
