/*
script.js
This program implements the java script code in order to set up an empty board, place tokens for two separagte players, and decide when there is a winner
Sydney Morick and Emma Martin
April 25, 2020
 */
class Script{
    constructor(selector){
        this.ROWS = 6;
        this.COLS = 7;
        this.player = 'red';
        this.selector = selector;
        this.GameOver = false;
        // will be called upon later in the program but are set up now
        this.onPlayerMove = function() {};
        this.createBoard();
        this.clicks();
    }
    createBoard(){
        // set up to board is empty and there is no winner.
        const $board = $(this.selector);
        $board.empty();
        this.GameOver = false;
        // set up player one with red token
        this.player = 'red';
        // assign each open circle on the board with a number based on its row and col with for loop
        for(let row = 0; row<this.ROWS; row++){
            const $row = $('<div>')
                .addClass('row');
            for(let col = 0; col<this.COLS; col++){
                const $col = $('<div>')
                    .addClass('col empty')
                    .attr('data-col',col)
                    .attr('data-row',row);
                $row.append($col);
            }
            $board.append($row);
        }
    }
    clicks() {
        const $board = $(this.selector);
        const that = this;
        // find the last empty slot in the desired col, by running through the col and seeing if it is empty and returning the "cell" in which it is open to place the token in
        function lastEmptyCell(col){
            const cells=$(`.col[data-col='${col}']`);
            for(let i = cells.length-1; i>=0; i--){
                const $cell = $(cells[i]);
                if($cell.hasClass('empty')){
                    return $cell;
                }
            }
            return null;
        }
        $board.on('mouseenter','.col.empty',function(){
            if(that.GameOver) return;
            const col = $(this).data('col');
            const $lastEmptyCell = lastEmptyCell(col);
            $lastEmptyCell.addClass(`next-${that.player}`);
        });
        $board.on('mouseleave','.col',function(){
            $('.col').removeClass(`next-${that.player}`);
        });
        $board.on('click','.col.empty',function(){
            if(that.GameOver) return;
            const col = $(this).data('col');
            const $lastEmptyCell = lastEmptyCell(col);
            $lastEmptyCell.removeClass(`empty next-${that.player}`);
            $lastEmptyCell.addClass(that.player);
            $lastEmptyCell.data('player',that.player);
            const winner = that.isWinner(
                $lastEmptyCell.data('row'),
                $lastEmptyCell.data('col')
            )
            // if statement for when a player wins to alert the players who has won
            if(winner){
                that.GameOver = true;
                alert(`Game Over! The ${that.player} player has won!`);
                $('.col.empty').removeClass('empty');
                return;
            }
            // set up to toggle between the two players after there is a click on the game board
            that.player = (that.player === 'red') ? 'yellow' : 'red';
            that.onPlayerMove();
            $(this).trigger('mouseenter');
        });
    }
    // isWinner function to help indicate when someone has gotten four in a row
    isWinner(row,col){
        const that = this;
        // set up i,j to find the place where each player has placed their token
        function $getCell(i,j){
            return $(`.col[data-row='${i}'][data-col='${j}']`);
        }
        // checking in each "cell" within the board that a place has placed a token
        function checkClick(place){
            let total = 0;
            let i = row + place.i;
            let j = col + place.j;
            let $next = $getCell(i,j);
            while(i >= 0 &&
                i<that.ROWS &&
                j>=0 &&
                j<that.COLS &&
                $next.data('player')===that.player
            ){
                total++;
                i+= place.i;
                j+=place.j;
                $next = $getCell(i,j);
            }
            return total;
        }
        // check for win when the player has four in a row
        function checkWin(placeA, placeB){
            const total = 1 +
                checkClick(placeA) +
                checkClick(placeB);
            if(total >= 4){
                return that.player;
            } else{
                return null;
            }
        }
        // check for four in a row from a diagonal that starts from the bottom left
        function checkDiagonalBottomLeft(){
            return checkWin({i:1,j:-1},{i:1,j:1});
        }
        // check for four in a row from a diagonal that starts from the bottom right
        function checkDiagonalBottomRight(){
            return checkWin({i:1,j:1},{i:-1,j:-1});
        }
        // check for four in a row that runs vertically
        function checkVert(){
            return checkWin({i:-1,j:0},{i:1,j:0});
        }
        // check for four in a row that runs horizontally
        function checkCol(){
            return checkWin({i:0,j:-1},{i:0,j:1});
        }
        return checkVert() ||
            checkCol() ||
            checkDiagonalBottomLeft() ||
            checkDiagonalBottomRight();
    }
    restart (){
        this.createBoard();
        this.onPlayerMove();
    }
}