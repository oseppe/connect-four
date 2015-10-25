// this file contains different checkers that can be used for the game board

var LastChipMethod = function (maxRows, maxColumns, noToWin) {
	
	this.currentPlayer = 0,
	this.maxRows = maxRows,
	this.maxColumns = maxColumns,
	this.noToWin = noToWin,

	/**
     * Check if someone won
     *
     * @param object hash
     * @param object hash
     * @return boolean
     */
	this.check = function(board, lastChip) {
		var win = false
		var row = lastChip['row'];
		var col = lastChip['col'];

		this.currentPlayer = board[col][row];

		win = this.diagonalRisingCheck(board, lastChip) || this.diagonalFallingCheck(board, lastChip) || this.horizontalCheck(board, lastChip) || this.verticalCheck(board, lastChip);
		return win;
	},

	this.diagonalRisingCheck = function(board, lastChip) {
		var count = 1;
		var colIndex = lastChip['col'] - 1;
		var rowIndex = lastChip['row'] + 1;
		

		// check diagonal left down
		while(colIndex > -1 && rowIndex < this.maxRows && board[colIndex][rowIndex] == this.currentPlayer) {
			count = count + 1;

			// move diagonal left down
			colIndex = colIndex - 1;
			rowIndex = rowIndex + 1;
		}

		colIndex = lastChip['col'] + 1;
		rowIndex = lastChip['row'] - 1;
		// check downward right up
		while(colIndex < this.maxColumns && rowIndex > -1 && board[colIndex][rowIndex] == this.currentPlayer) {
			count = count + 1;

			// move diagonal left down
			colIndex = colIndex + 1;
			rowIndex = rowIndex - 1;
		}

		return count > (noToWin - 1);
	},

	this.diagonalFallingCheck = function(board, lastChip) {
		var bingo = false;
		// TODO: check downward until see 0 or opposing color or index length - 1
		// TODO: check upward until see 0 or opposing color or index 0
		return bingo;
	},

	this.horizontalCheck = function(board, lastChip) {
		var count = 1;
		var row = lastChip['row'];
		var index = lastChip['col'] - 1;

		// check left until index 0 or no longer same color as current player
		while (index > -1 && board[index][row] == this.currentPlayer) {
			count = count + 1;

			// move left
			index = index - 1;
		}

		index = lastChip['col'] + 1;
		
		// check right until indexLength - 1 or no longer same color as current player
		while (index < this.maxColumns && board[index][row] == this.currentPlayer) {
			count = count + 1;

			// move right
			index = index + 1;
		}

		return count > (noToWin - 1);
	},

	this.verticalCheck = function(board, lastChip) {
		var count = 1;
		var column = board[lastChip['col']];
		var index = lastChip['row'] + 1;

		// check downward until indexLength - 1 or no longer same color as current player
		while (index < this.maxRows && column[index] == this.currentPlayer) {
			count = count + 1;

			// move down
			index = index + 1;
		}

		return count > (noToWin - 1);
	}
};