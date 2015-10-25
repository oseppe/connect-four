var Gameboard = function (checker, playerOne, playerTwo, height, width) {
	this.board = createTwoDArray(height, width),
	this.columns = width,
	this.rows = height,
	this.checker = checker,
	this.playerOne = playerOne,
	this.playerTwo = playerTwo,
	this.maxTurns = height * width,
	this.noTurns = 0;
	this.turn = 1,
	
	/**
     * Check if someone won
     *
     * @param object hash
     * @return boolean
     */
	this.check = function(otherData) {
		// return this.checker.check(this.board, otherData);
		return false;
	},

	/**
     * Restart game
     *
     * @param none
     * @return none
     */
    this.restart = function() {
    	this.board = createTwoDArray(rows, columns);
    	this.noTurns = 0;
		this.turn = 1;
    }
	/**
     * Process user's turn
     *
     * @param int
     * @return object hash
     */
	this.dropChip = function(col) {
		
		var chipColor = '';
		var draw = false;
		var place = {col: col, row: 0};
		var row = this.updateBoard(col, this.turn);
		var win = false;

		place['row'] = row;

		// don't change game data if column already filled
		if (row != -1) {

			// increment number of turns
			this.noTurns = this.noTurns + 1;

			switch(this.turn) {
				case 1:
					chipColor = this.playerOne;
					this.turn = 2;
					break;
				case 2:
					chipColor = this.playerTwo;
					this.turn = 1;
					break;
			}

			win = this.check(place);
			
			draw = this.maxTurns == this.noTurns;
		};
			
		return { place: place, chipColor: chipColor, win: win, draw: draw };
	}
	// Start game
	this.startGame = function() {

	},

	/**
     * Update board to reflect dropped chip
     *
     * @param int
     * @param int
     * @return int
     */
    this.updateBoard = function(col, player) {

    	// get index of last 0 in array
    	var row = this.board[col].lastIndexOf(0);

    	// dont update board if column already filled
    	if (row != -1) {
    		this.board[col][row] = player;
    	};

    	return row
    }
};

/**
 * Creates an empty two dimensional array
 *
 * @param int
 * @param int
 * @return array
 */
function createTwoDArray(height, width) {
	var array = new Array(width);

	for (var i = 0 ; i < array.length; i++) {
		
		array[i] = new Array(height);

		// fill newly created array with 0
		for (var j = 0 ; j < height; j++) {
			array[i][j] = 0;
		};
	};

	return array;
}
