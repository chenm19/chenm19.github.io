/*
∗ Game.js
∗ This program implements a memory game in which participants need to match the tiles on the board
∗ Weijia Li, Yueying He, Chloe Zheng
∗ December 3, 2019
∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗∗
 */

var newArray = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I']; // create 18 blocks
var Tileid = []; //store the ids of tiles left on the board
var Tilef = 0;//track how many tiles are flipped (increase num by 2 each time you succeed)
var Value = [];// empty array that stores memories
Array.prototype.Flip = function(){ //create a new method called flip, use to shuffle the cards
    var i = this.length;
    var j;
    var temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));//Random position every time player starts a new game
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
function newBoard(){
    Tilef = 0; // each time we created a new board, we reset the value to zero
    var output = ''; // created an empty variable
    newArray.Flip(); // shuffle the whole "decks"
    for(var i = 0; i < newArray.length; i++){
        output += '<div id="tile_'+i+'" onclick="Flip(this/*what div is pointing*/,\''+newArray[i]/*card id*/+'\')"></div>';//edit tile number
    }
    document.getElementById('memory_board').innerHTML = output; //update output
} // draw the board
function Flip(card,val){
    if(card.innerHTML == "" && Value.length < 2){ //if the tile is empty and did not click on more than 2 tiles
        card.style.background = '#fff5fd'; //change the background color of the tile
        card.innerHTML = val;
        if(Value.length == 0){
            Value.push(val);
            Tileid.push(card.id);
        } else if(Value.length == 1){
            Value.push(val);
            Tileid.push(card.id);
            if(Value[0] == Value[1]){ //if the two tiles we click match
                Tilef = Tilef + 2;  // number of tiles flipped plus 2
                Value = [];
                Tileid = [];
                // Check whether the board is clear
                if(Tilef == newArray.length){      // When all tiles have been flipped
                    alert("Wanna start a new game?");   // Prompt user to start a new game
                    document.getElementById('memory_board').innerHTML = "";
                    var element = document.createElement("button");
                    element.appendChild(document.createTextNode("Click Me!"));
                    newBoard();
                }
            } else {
                function flip2Back(){
                    var tile_1 = document.getElementById(Tileid[0]);
                    var tile_2 = document.getElementById(Tileid[1]);
                    tile_1.style.background = 'url(../../src/Rabbit_Face_Emoji.png) no-repeat';
                    tile_1.innerHTML = "";
                    tile_2.style.background = 'url(../../src/Rabbit_Face_Emoji.png) no-repeat';
                    tile_2.innerHTML = "";
                    Value = [];
                    Tileid = [];
                }//flip the block back if not matched
                setTimeout(flip2Back,700);//wait for a short time to flip back
            }
        }
    }
}