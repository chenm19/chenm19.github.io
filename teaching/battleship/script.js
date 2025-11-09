/*
* script.js
* This javascript processes user input, stores necessary information and outputs appropriate gameplay functions.
* Ally Ashcraft and Evan Osterberg
* 04/29/2020
*/
var display = {
    printMessage: function (msg) {
        var msgPrintLocation = document.getElementById("msgPrintLocation"); //accesses element in HTML
        msgPrintLocation.innerHTML = msg; //updates HTML page with appropriate message
    },
    outputHit: function (location) {
        var cell = document.getElementById(location); //returns the cell specific to LOCATION
        cell.setAttribute("class","hit") //sets cell equal to HIT, displays hit picture

    },
    outputMiss: function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class","miss") //sets cell equal to MISS, displays miss picture

    }
}
/////////////////////////////////////////////////

///////////////////////////////////////
var board = { //generates and analyzes ship locations and conditions within the table (grid)
    gridLength: 7 ,
    totalShips: 3 ,
    numLocations: 3 ,
    numSunkenShips: 0 ,

    battleship: [ {locations: ["-1","-1","-1"], hits: ["","",""] }, //initializes ships with default values
        {locations: ["-1","-1","-1"], hits: ["","",""] },
        {locations: ["-1","-1","-1"], hits: ["","",""] } ],
    fire: function (guess) {
        for (var i = 0; i < this.totalShips; ++i) {
            var bsInQuestion = this.battleship[i]; // var bsInQuestion is a dummy variable that will eventually represent all  3 battleships (runs through each ship individually)
            var locations = bsInQuestion.locations; // locations for the specific ship are stored under dummy 'locations'
            var shipLocation= locations.indexOf(guess); // searches locations of individual ship if guess is included. if included, will have an index, if not return -1
            if (shipLocation>=0) {   // will only enter if guess is = to on of the locations of the ship (remember index is the position of GUESS within LOCATIONS of ship[i])

                bsInQuestion.hits[shipLocation] = "hit"; //hit array for ship[i] updated to "hit" at the index where GUESS=SHIP LOCATIONS
                display.outputHit(guess); // calls on function within Display
                display.printMessage("You hit a battleship!"); // calls function within Display.... displays message on screen
                if (this.isSunk(bsInQuestion)){ //this will check if the ship that was just hit has been sunken
                    display.printMessage("You hit and sank the battleship!");
                    this.numSunkenShips = this.numSunkenShips + 1; //updates num of ships sunken in object board
                }
                return true; // returns that a ship was hit to Launcher object
            }
        }
        display.outputMiss(guess); // calls function within display
        display.printMessage("Your shot missed!"); // calls function within display
        return false; // if looped through all ships and GUESS was not in any LOCATIONS
    },
    isSunk: function (bsInQuestion) { // returns true if ship is sunk, false if Ship is not; is called above within fire function
        for (var i=0; i < this.numLocations; ++i){ // battleship is still specific to dummy variable above
            if (bsInQuestion.hits[i] !== "hit"){ // goes through every locations of the ship to see if any have NOT been hit
                return false; // if a location has not been hit, It is not sunk
            }
        }
        return true; // if criteria not meant. this means every location has been hit
    },
    assignBattleShipLocations: function () { //updating locations within ships field
        var locations = [];
        for (var i=0; i < this.totalShips; i++) {
            do {
                locations = this.createBattleShip();
            } while (this.isGridSpaceTaken(locations));
            this.battleship[i].locations = locations;
        }
        //when in browser, displays hidden location of ships
        console.log("Battleships array: ");
        console.log(this.battleship);
    },
    createBattleShip: function() {
        var direction = Math.floor(Math.random() *2); // 0 or 1
        var row; //letters on grid
        var column; //numbers on grid
        //determines the first point of the ship
        if (direction === 1){ //horizontal
            row = Math.floor(Math.random() * this.gridLength);
            column = Math.floor(Math.random() * (this.gridLength - (this.numLocations + 1)));
        } else { //vertical
            row = Math.floor(Math.random() * (this.gridLength - (this.numLocations + 1)));
            column = Math.floor(Math.random() * this.gridLength);
        }
        var newShipLocations = []; //blank array that stores final locations of ships
        for (var i = 0; i < this.numLocations; ++i) { //extends the ship to its final size of 3
            if (direction === 1) {
                newShipLocations.push(row + "" + (column + i)); //adds locations to array
            } else {
                newShipLocations.push((row + i) + "" + column);
            }
        }
        return newShipLocations;
    },
    isGridSpaceTaken: function(locations) { //ensure ships are not intersecting
        for (var i = 0; i < this.totalShips; i++) {
            var ship = this.battleship[i];
            for (var j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        }
        return false;
    }
};
//////////////////////////////////////////////
var missileLauncher = {

    sendAndReceiveGuess: function(guess) { //checks if the game has been won
        var location = guessChecker(guess); //receives screened input from guessCheck function
        if (location) {
            var hit = board.fire(location) //returns true if fire = hits; calls fire method in board object
            if (hit && board.numSunkenShips === board.totalShips) { //if hit is true & (ships sunk = total ships)
                display.printMessage("Congrats! You sank all the battleships!");
            }
        }
    }
};

function guessChecker(guess) {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G"]; //translating letter guess into a number

    if (guess === null || guess.length !==2){ //checks input validity
        alert("Invalid guess. Enter a letter and number from the board.");
    } else {
        var firstChar = guess.charAt(0);
        var row = alphabet.indexOf(firstChar);//translation from letter to number
        var column = guess.charAt(1);

        //if row or column input is invalid
        if ((isNaN(row)) || (isNaN(column))) {
            alert("uh oh gamer. Guess isn't on board.");
        } else if (row<0 || row >=board.gridLength || column<0 || column >= board.gridLength){
            alert("Guess is not on the board!");
        } else { //once assured input is good, returns row and column
            return row + column;
        }
    }
    return null;
}


function buttonClick(){ //links html text box with javascript functions
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value; //assigns user input to variable guess
    missileLauncher.sendAndReceiveGuess(guess); //calls function within LAUNCHER object

    guessInput.value = ""; //resets box after each guess
}

function init () { //starts game
    var fireButton = document.getElementById("fireButton"); //links html button with javascript functions
    fireButton.onclick = buttonClick;

    board.assignBattleShipLocations(); //calling a function within the object - board
}
window.onload = init(); //once the window is fully loaded, it will run this function