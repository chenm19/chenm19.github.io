var grid = document.getElementById("grid");
var testMode = false; //Turn this variable to true to see where the mines are
generateGrid();
var FlagState = false;
var numFlag = 60;

function generateGrid() {
    //generate 10 by 10 grid
    grid.innerHTML = "";
    for (var i = 0; i < 20; i++) {
        row = grid.insertRow(i);
        for (var j = 0; j < 20; j++) {
            cell = row.insertCell(j);
            cell.onclick = function() {
                switchFlag(this);
            }
            cell.ondblclick = function () {
                clickCell(this);
                }

            document.oncontextmenu = function () {
                return false;
            }

            var mine = document.createAttribute("mine");
            mine.value = "false";
            cell.setAttributeNode(mine);
            var flag = document.createAttribute("flag");
            flag.value = "false";
            cell.setAttributeNode(flag);

        }
    }
    addMines();
}

function addMines() {
    //Add mines randomly
    for (var i=0; i<60; i++) {
        var row = Math.floor(Math.random() * 20);
        var col = Math.floor(Math.random() * 20);
        var cell = grid.rows[row].cells[col];
        cell.setAttribute("mine","true");
        if (testMode) cell.innerHTML="X";
    }
}

function switchFlag(cell) {
    if (numFlag > 0) {
        cell.setAttribute("flag", "true");
        cell.className = "flag";
        numFlag = numFlag - 1;
    }
    }


function revealMines() {
    //Highlight all mines in red
    for (var i=0; i<20; i++) {
        for(var j=0; j<20; j++) {
            var cell = grid.rows[i].cells[j];
            if (cell.getAttribute("mine")=="true") cell.className="mine";
        }
    }
}

function checkLevelCompletion() {
    var levelComplete = true;
    for (var i=0; i<20; i++) {
        for(var j=0; j<20; j++) {
            if ((grid.rows[i].cells[j].getAttribute("mine")=="false") && (grid.rows[i].cells[j].innerHTML=="")) levelComplete=false;
        }
    }
    if (levelComplete) {
        alert("You Win!");
        revealMines();
    }
}


function clickCell(cell) {
    //Check if the end-user clicked on a mine

      if (cell.getAttribute("mine") == "true") {

            var num = Math.floor(Math.random() * 6);

            if (num == 1) {
                var question = window.prompt("When was Wake Forest University founded?")

                if (question == 1834) {
                    alert("Good job! Keep playing");
                    cell.className="mine";
                } else {
                    alert("Sorry, wrong answer-_-\nGame Over");
                    revealMines();
                }
            }

            if (num == 2) {
                var question = window.prompt("How do demon deacons call The Fresh Food Company?")
                if (question == "PIT" || question =="pit" ||question == "Pit"||question =="the pit"||question =="the Pit") {
                    alert("Good job! Keep playing");
                    cell.className="mine";
                } else {
                    alert("Sorry, wrong answer-_-\nGame Over");
                    revealMines();
                }
            }

            if (num == 3) {
                var question = window.prompt("which day does Chick-Fil-A close?")
                if (question == "Sunday" || question =="sunday" ||question == "SUNDAY") {
                    alert("Good job! Keep playing");
                    cell.className="mine";
                } else {
                    alert("Sorry, wrong answer-_-\nGame Over");
                    revealMines();
                }
            }

            if (num == 4) {
                var question = window.prompt("what time does our class start?")
                if (question == "11 am" || question =="11am" || question ==11 ||question == "11:00") {
                    alert("Good job! Keep playing");
                    cell.className = "mine";
                } else {
                    alert("Sorry, wrong answer-_-\nGame Over");
                    revealMines();
                }
            }

            if (num == 5) {
                var question = window.prompt("Complete a slogan of Wake Forest University: \nRolling the")
                if (question == "quad" ||question == "Quad" ) {
                    alert("Good job! Keep playing");
                    cell.className="mine";
                } else {
                    alert("Sorry, wrong answer-_-\nGame Over");
                    revealMines();
                }
            }
            else if (num == 6) {
                var question = window.prompt("what is our course name?")
                if (question == "CS111" || question =="CS 111" || question ==111 ||question == "cs111" ||question =="Cs111"|| question =="Computer Science 111") {
                    alert("Good job! Keep playing");
                    cell.className="mine";
                } else {
                    alert("Sorry, wrong answer-_-\nGame Over");
                    revealMines();
                }
            }


    } else {
        cell.className = "clicked";
        //Count and display the number of adjacent mines
        var mineCount = 0;
        var cellRow = cell.parentNode.rowIndex;
        var cellCol = cell.cellIndex;
        //alert(cellRow + " " + cellCol);
        for (var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 19); i++) {
            for (var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 19); j++) {
                if (grid.rows[i].cells[j].getAttribute("mine") == "true") mineCount++;
            }
        }
        cell.innerHTML = mineCount;
        if (mineCount == 0) {
            //Reveal all adjacent cells as they do not have a mine
            for (var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 19); i++) {
                for (var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 19); j++) {
                    //Recursive Call
                    if (grid.rows[i].cells[j].innerHTML == "") clickCell(grid.rows[i].cells[j]);
                }
            }
        }
        checkLevelCompletion();
    }
}



