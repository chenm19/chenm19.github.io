var N_SIZE = 4, //initial variable declarations and initializations
  boxes = [],
  isChanged = false,
  score = 0,
  highScore = 0,
  newGame = false;

var grid = new Array(4); //creates a 2D array for use with the tile values
for (var i = 0; i < grid.length; i++) {
    grid[i] = new Array(4);
    }
for (var i=0; i < 4;++i) {
    for (var j = 0; j < 4; ++j) {
    grid[i][j]=0;
    }
}

randomNumber(grid); //generates two random numbers (90% chance of being a 2, 10% 4) on the board to begin with
randomNumber(grid);

var copy = new Array(4); //generates a copy of the array for use in the checkRandom method
for (var i = 0; i < copy.length; i++) {
    copy[i] = new Array(4);
    }
for (var i=0; i < 4;++i) {
    for (var j = 0; j < 4; ++j) {
    copy[i][j]=grid[i][j];
    }
}

var board = document.createElement('table'); //initial creation of the element for the table and set initial spacing
board.setAttribute('border', 1);
board.setAttribute('cellspacing', 1);

var cell = new Array(4); //creation of arrays for use with the js elements
for (var i = 0; i < cell.length; i++) {
    cell[i] = new Array(4);
}
for (var i = 0; i < N_SIZE; i++) {
    var row = document.createElement('tr');
    board.appendChild(row);
    for (var j = 0; j < N_SIZE; j++) {
        cell[i][j] = document.createElement('td'); //initial sizing and spacing for the cells
        cell[i][j].setAttribute('height', 120);
        cell[i][j].setAttribute('width', 120);
        cell[i][j].setAttribute('align', 'center');
        cell[i][j].classList.add('col' + j, 'row' + i);
        if (grid[i][j]==0) { //if the value of the tile is zero, the text is null and the background is the generic background color
            cell[i][j].innerHTML = '';
            cell[i][j].style.backgroundColor = '#8ba6c1';
        } else { // if the value of the tile is nonzero, the value is checked and assigned with the correct number value and color
            cell[i][j].innerHTML = grid[i][j];
            switch (grid[i][j]) {
                case 2:
                    cell[i][j].style.backgroundColor = '#d2e3f5';
                    cell[i][j].style.fontSize = '80px';
                    cell[i][j].style.textShadow = '2px 2px 3px grey';
                    break;
                case 4:
                    cell[i][j].style.backgroundColor = '#a7e0fd';
                    cell[i][j].style.fontSize = '80px';
                    break;
                case 8:
                    cell[i][j].style.backgroundColor = '#76b5da';
                    cell[i][j].style.fontSize = '80px';
                    break;
                case 16:
                    cell[i][j].style.backgroundColor = '#1982bf';
                    cell[i][j].style.fontSize = '80px';
                    break;
                case 32:
                    cell[i][j].style.backgroundColor = '#42799a';
                    cell[i][j].style.fontSize = '80px';
                    break;
                case 64:
                    cell[i][j].style.backgroundColor = '#2952a3';
                    cell[i][j].style.fontSize = '80px';
                    break;
                case 128:
                    cell[i][j].style.backgroundColor = '#193366';
                    cell[i][j].style.fontSize = '60px';
                    break;
                case 256:
                    cell[i][j].style.backgroundColor = '#cc99ff';
                    cell[i][j].style.fontSize = '60px';
                    break;
                case 512:
                    cell[i][j].style.backgroundColor = '#b366ff';
                    cell[i][j].style.fontSize = '60px';
                    break;
                case 1024:
                    cell[i][j].style.backgroundColor = '#9933ff';
                    cell[i][j].style.fontSize = '45px';
                    break;
                case 2048:
                    cell[i][j].style.backgroundColor = '#ffd633';
                    cell[i][j].style.fontSize = '45px';
                    break;
            }
        }
        row.appendChild(cell[i][j]);
        boxes.push(cell[i][j]);
    }
}

document.getElementById('tictactoe').appendChild(board);

document.addEventListener('keydown', keyWasPressed); //event listener for the key press in order to interact with the game

function keyWasPressed(press) { //the heart of the code. When the key is pressed, 5 methods are called and vary slightly depending on the key
    switch (press.keyCode) {
        case 37:
            leftPress(grid);
            checkSameLeft(grid);
            checkRandom(grid, copy);
            printGrid(grid);
            isOver(grid)
            break;
        case 38:
            upPress(grid);
            checkSameUp(grid);
            checkRandom(grid, copy);
            printGrid(grid);
            isOver(grid)
            break;
        case 39:
            rightPress(grid);
            checkSameRight(grid);
            checkRandom(grid, copy);
            printGrid(grid);
            isOver(grid)
            break;
        case 40:
            downPress(grid);
            checkSameDown(grid);
            checkRandom(grid, copy);
            printGrid(grid);
            isOver(grid)
            break;
    }
};

function upPress(array) { //if the up arrow is pressed, all the tiles are moved up
    var temp =0;
    for (var i =0; i<4; ++i) {
        for (var j=0; j<4; ++j) {
            if (array[0][j]==0) {
                temp = array[0][j];
                array[0][j] = array[1][j];
                array[1][j] = array[2][j];
                array[2][j] = array[3][j];
                array[3][j] = temp;
            }
            if (array[1][j]==0) {
                temp = array[1][j];
                array[1][j] = array[2][j];
                array[2][j] = array[3][j];
                array[3][j] = temp;
            }
            if (array[2][j]==0) {
                temp = array[2][j];
                array[2][j] = array[3][j];
                array[3][j] = temp;
            }
        }
    }
}

function leftPress(array) { //if the left arrow is pressed, all the tiles are moved left
    var temp = 0;
    for (var i=0; i<array.length; ++i) {
        for (var j=0; j<array.length; ++j) {
           if (array[i][0]==0) {
               temp = array[i][0];
               array[i][0] = array[i][1];
               array[i][1] = array[i][2];
               array[i][2] = array[i][3];
               array[i][3] = temp;
           }
           if (array[i][1]==0) {
               temp = array[i][1];
               array[i][1] = array[i][2];
               array[i][2] = array[i][3];
               array[i][3] = temp;
           }
           if (array[i][2]==0) {
               temp = array[i][2];
               array[i][2] = array[i][3];
               array[i][3] = temp;
           }
        }
    }
 }

function rightPress(array) { //if the right arrow is pressed, all the tiles are moved right
     var temp =0;
     for (var i = 0; i<4; ++i) {
         for (var j=3; j>=0; --j) {
             if (array[i][3]==0) {
                 temp = array[i][3];
                 array[i][3] = array[i][2];
                 array[i][2] = array[i][1];
                 array[i][1] = array[i][0];
                 array[i][0] = temp;
             }
             if (array[i][2]==0) {
                 temp = array[i][2];
                 array[i][2] = array[i][1];
                 array[i][1] = array[i][0];
                 array[i][0] = temp;
             }
             if (array[i][1]==0) {
                 temp = array[i][1];
                 array[i][1] = array[i][0];
                 array[i][0] = temp;
             }
         }
     }
 }

 function downPress(array) { //if the down arrow is pressed, all the tiles are moved down
     var temp =0;
     for (var i =3; i>=0; --i) {
         for (var j=0; j<4; ++j) {
             if (array[3][j]==0) {
                 temp = array[3][j];
                 array[3][j] = array[2][j];
                 array[2][j] = array[1][j];
                 array[1][j] = array[0][j];
                 array[0][j] = temp;
             }
             if (array[2][j]==0) {
                 temp = array[2][j];
                 array[2][j] = array[1][j];
                 array[1][j] = array[0][j];
                 array[0][j] = temp;
             }
             if (array[1][j]==0) {
                 temp = array[1][j];
                 array[1][j] = array[0][j];
                 array[0][j] = temp;
             }
         }
     }
 }

function checkSameUp(array) { //these loops check if two tiles above and below each other share the same value and push them together and up if they do
    isChanged = false;
    for (var j=0;j<array.length; ++j) {
        for (var i=0;i<array[j].length-1;++i) {
            if (array[i][j]>0 && (array[i][j]==array[i+1][j])) {
                score += array[i][j] + array[i+1][j];
                array[i][j] += array[i+1][j];
                isChanged = true;
                document.getElementById('score').innerHTML = 'Score: ' + score;
                checkHighScore();
                for (var k=i+1;k<array[i].length-1;++k) {
                    array[k][j] = array[k+1][j];
                }
                array[3][j] = 0;
            }
        }
    }
}

function checkSameLeft(array) { //these loops check if two tiles next to each other share the same value and push them together and left if they do
    isChanged = false;
    for (var i=0;i<array.length; ++i) {
        for (var j=0;j<array[i].length-1;++j) {
            if (array[i][j]>0 && (array[i][j]==array[i][j+1])) {
                score += array[i][j] + array[i][j+1];
                array[i][j] += array[i][j+1];
                isChanged = true;
                document.getElementById('score').innerHTML = 'Score: ' + score;
                checkHighScore();
                for (var k=j+1;k<array[j].length-1;++k) {
                    array[i][k] = array[i][k+1];
                }
                array[i][3] = 0;
            }
        }
    }
}

function checkSameRight(array) {//these loops check if two tiles next to each other share the same value and push them together and right if they do
    isChanged = false;
    for (var i=0;i<array.length; ++i) {
        for (var j=3;j>0;--j) {
            if (array[i][j]>0 && (array[i][j]==array[i][j-1])) {
                score += array[i][j] + array[i][j-1];
                array[i][j] += array[i][j-1];
                isChanged = true;
                document.getElementById('score').innerHTML = 'Score: ' + score;
                checkHighScore();
                for (var k=j-1;k>0;--k) {
                    array[i][k] = array[i][k-1];
                }
                array[i][0] = 0;
            }
        }
    }
}

function checkSameDown(array) { //these loops check if two tiles above and below each other share the same value and push them together and down if they do
    isChanged = false;
    for (var j=0;j<array.length; ++j) {
        for (var i=3;i>0;--i) {
            if (array[i][j]>0 && (array[i][j]==array[i-1][j])) {
                score += array[i][j] + array[i-1][j];
                array[i][j] += array[i-1][j];
                isChanged = true;
                document.getElementById('score').innerHTML = 'Score: ' + score;
                checkHighScore();
                for (var k=i-1;k>0;--k) {
                    array[k][j] = array[k-1][j];
                }
                array[0][j] = 0;
            }
        }
    }
}

function printGrid(array) { //prints the new grid the same way it was initialized. 0 values are null and others are given specific coloring
    for (var i = 0; i < N_SIZE; i++) {
          for (var j = 0; j < N_SIZE; j++) {
          if (grid[i][j]==0) {
            cell[i][j].innerHTML = '';
            cell[i][j].style.backgroundColor = '#8ba6c1';
          } else {
            cell[i][j].innerHTML = grid[i][j];
            switch (grid[i][j]) {
                case 2:
                    cell[i][j].style.backgroundColor = '#d2e3f5';
                    cell[i][j].style.fontSize = '80px';
                    cell[i][j].style.textShadow = '2px 2px 3px grey';
                    break;
                case 4:
                    cell[i][j].style.backgroundColor = '#a7e0fd';
                    cell[i][j].style.fontSize = '80px';
                    break;
                case 8:
                    cell[i][j].style.backgroundColor = '#76b5da';
                    cell[i][j].style.fontSize = '80px';
                    break;
                case 16:
                    cell[i][j].style.backgroundColor = '#1982bf';
                    cell[i][j].style.fontSize = '80px';
                    break;
                case 32:
                    cell[i][j].style.backgroundColor = '#42799a';
                    cell[i][j].style.fontSize = '80px';
                    break;
                case 64:
                    cell[i][j].style.backgroundColor = '#2952a3';
                    cell[i][j].style.fontSize = '80px';
                    break;
                case 128:
                    cell[i][j].style.backgroundColor = '#193366';
                    cell[i][j].style.fontSize = '60px';
                    break;
                case 256:
                    cell[i][j].style.backgroundColor = '#cc99ff';
                    cell[i][j].style.fontSize = '60px';
                    break;
                case 512:
                    cell[i][j].style.backgroundColor = '#b366ff';
                    cell[i][j].style.fontSize = '60px';
                    break;
                case 1024:
                    cell[i][j].style.backgroundColor = '#9933ff';
                    cell[i][j].style.fontSize = '45px';
                    break;
                case 2048:
                    cell[i][j].style.backgroundColor = '#ffd633';
                    cell[i][j].style.fontSize = '45px';
                    break;
            }
          }
        }
    }
}

function checkRandom(array, copy) { //this function is called to check that the grid was actually changed before it adds another number. If the grid was not changed, no new number is added
    var diff = false;
    for (var i=0; i<array.length; ++i) {
        for (var j=0; j<array[i].length; ++j) {
            if (array[i][j] != copy[i][j]) {
                diff = true;
                break;
            }
        }
    }
    if (diff) {
        randomNumber(array);
    }
    for (var i=0; i<array.length; ++i) {
        for (var j=0; j<array[i].length; ++j) {
            copy[i][j]=array[i][j];
        }
    }
}

function randomNumber(array) { //this function inputs a new random number at a random location that is not already filled
    var x = Math.floor(Math.random() * 4);
    var y = Math.floor(Math.random() * 4);
    var seed = Math.random();
    if (array[x][y]!=0) {
        randomNumber(array);
    } else {
        if (seed>0.9) {
            array[x][y] = 4;
        } else {
            array[x][y] = 2;
        }
    }
}

function isOver(array) { //this function checks if the game is over. If it is, a game over message is printed on-screen. It also calls a method to check if there is a winner
    var filled = true;
    var same = false;
    win(array);
    for (var i=0;i<array.length; ++i) {
        for (var j=0; j<array[i].length; ++j) {
            if (array[i][j]==0) {
            filled = false;
            break;
            }
        }
    }
    for (var i=0;i<array.length-1;++i) {
        for (var j=0; j<array[i].length-1; ++j) {
            if (array[i][j]==array[i][j+1]) {
                same = true;
                break;
            }
            if (array[i][j]==array[i+1][j]) {
                same = true;
                break;
            }
        }
    }
    if (filled && !same) {
    document.getElementById('win').innerText = 'Game Over';
    }
}

function win(array) { //if one of the tiles is 2048, the "You Win!" message is printed
    for (var i=0;i<array.length;++i) {
        for (var j=0; j<array[i].length; ++j) {
            if (array[i][j]==2048) {
                document.getElementById('win').innerText = String.fromCodePoint(0x1F389) + ' You Win! ' + String.fromCodePoint(0x1F389);
            }
        }
    }
}

function checkHighScore() { //checks the current score and assigns a new high score if the current score is higher
    if (score>=highScore) {
        highScore = score;
        document.getElementById('highScore').innerHTML = 'High Score: ' + highScore;
    }
}

function buttonClick() { //creates a new game is the new game button is pressed
    newGame = true;
    startNew();
}

function startNew() { //resets the score and winner message and resets the grid
    newGame = false;
    score = 0;
    document.getElementById('win').innerText = '';
    document.getElementById('score').innerHTML = 'Score: ' + score;

    resetGrid();
    printGrid();
}


function resetGrid() { //assigns all grid values to zero and calls randomNumber() twice to start the game
    for (var i=0; i < 4;++i) {
          for (var j = 0; j < 4; ++j) {
          grid[i][j]=0;
          }
      }
      randomNumber(grid);
      randomNumber(grid);
}
