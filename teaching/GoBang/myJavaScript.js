var flag = true; //true represents the black stone, false represents the white stone
var isWin = false; //determining if the game has ended. "true" ends, "false" doesn't end
var step = 40;  //setting the size of every grid as 40, both length and height


var txt = document.getElementById("txt");
var btn = document.getElementById("btn");
var cas = document.getElementById("cas");
var ctx = cas.getContext("2d");

//  Create images
var img_b = new Image();
img_b.src = "imgs/b.png";//Setting the picture of the white stone(player 2)
var img_w = new Image();
img_w.src = "imgs/w.png";//Setting the picture of the black stone(player 1)

//  Using two-dimentional array to store the board, 0 means never occupied, 1 means white stone occupied, 2 means black stone occupied
var arr = new Array(17);
for (var i = 0; i < 17; i++) {
    arr[i] = new Array(17);
    for (var j = 0; j < 17; j++) {
        arr[i][j] = 0;
    }
}

//drawing the board\
function drawLine() {
    for (var i = 0; i <= 640 / step; i++) {
        //vertical line
        ctx.moveTo(i * step+20, 20);
        ctx.lineTo(i * step+20, 660);
        //horizontal line
        ctx.moveTo(20, i * step+20);
        ctx.lineTo(660, i * step+20);
        ctx.stroke();
    }
}
// getting the location of mouse clicks
cas.onclick = function (e) {
    // first determine whether the game is over
    if (isWin) {
        alert("Game over. Please start a new game");
        return 0;
    }
    //Visualizing images on the place of mouse clicks
    //The mouse click location minus the sum of the length between upper and left bound of the page (10)
    //And minus half of the grid size (20)

    var x = (e.clientX - 20 - 20 - 20) / 40;
    var y = (e.clientY - 20 - 20 - 20) / 40;

    //Rounding to the nearest integer
    x = Math.floor(x) + 1;
    y = Math.floor(y) + 1;

    //if the mouse click exceeds the board bound, returns
    if(x < 0 || x >= 17 || y < 0 || y >= 17) {
        return;
    }
    //Determining whether the place of mouse click is occupied
    if (arr[x][y] != 0) {
        alert("You can not put your stone here!");
        return;
    }
    //Determining whether it is the black stone (player1) or the white stone (player2)
    if (flag) {//white stone
        flag = false; //note as false, to let the next click become black
        drawChess(1, x, y);

    } else {//black stone
        flag = true; //note as true, to let the next click become white
        drawChess(2, x, y);

    }
}
//Draw the stone
function drawChess(num, x, y) {
    var x0 = x * step + 22 - 40 + 20;
    var y0 = y * step + 22 - 40 + 20;
    if (num == 1) {
        ctx.drawImage(img_b, x0, y0);
        arr[x][y] = 1;
    } else if (num == 2) {
        ctx.drawImage(img_w, x0, y0);
        arr[x][y] = 2;
    }
    judge(num, x, y);
}
//Determing the winner
function judge(num, x, y) {
    var n1 = 0, //left right
        n2 = 0, //up down
        n3 = 0, //left up to right down
        n4 = 0; //right up to left down
    //***************left and rigth**********************************
    //start with the left side of the click, stone with the same color adds up the sum
    //exit the loop when meeting a different colored stone
    for (var i = x; i >= 0; i--) {
        if (arr[i][y] != num) {
            break;
        }
        n1++;
    }
    //start with the right side of the click, stone with the same color adds up the sum
    //exit the loop when meeting a different colored stone
    for (var i = x + 1; i < 17; i++) {
        if (arr[i][y] != num) {
            break;
        }
        n1++;
    }
    //****************up and down******************************
    for (var i = y; i >= 0; i--) {
        if (arr[x][i] != num) {
            break;
        }
        n2++;
    }
    for (var i = y + 1; i < 17; i++) {
        if (arr[x][i] != num) {
            break;
        }
        n2++;
    }
    //****************left up to right down******************************
    for(var i = x, j = y; i >=0, j >= 0; i--, j--) {
        if (i < 0 || j < 0 || arr[i][j] != num) {
            break;
        }
        n3++;
    }
    for(var i = x+1, j = y+1; i < 17, j < 17; i++, j++) {
        if (i >= 17 || j >= 17 || arr[i][j] != num) {
            break;
        }
        n3++;
    }
    //****************right up to left down******************************
    for(var i = x, j = y; i >= 0, j < 17; i--, j++) {
        if (i < 0 || j >= 17 || arr[i][j] != num) {
            break;
        }
        n4++;
    }
    for(var i = x+1, j = y-1; i < 17, j >= 0; i++, j--) {
        if (i >= 17 || j < 0 || arr[i][j] != num) {
            break;
        }
        n4++;
    }

    var str;
    if (n1 >= 5 || n2 >= 5 || n3 >= 5 || n4 >= 5) {
        if (num == 1) {
            str = "Player1 wins!"
        } else if (num == 2) {
            str = "Player2 wins!"
        }
        txt.innerHTML = str;
        isWin = true;
    }
}
//Restart
btn.onclick = function() {
    flag = true;
    isWin = false;

    for (var i = 0; i < 17; i++) {
        for (var j = 0; j < 17; j++) {
            arr[i][j] = 0;
        }
    }
    ctx.clearRect(0, 0, cas.width, cas.height);
    txt.innerHTML = "";
    drawLine();
}
drawLine();