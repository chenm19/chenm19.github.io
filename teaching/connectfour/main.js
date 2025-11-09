/*
main.js
This program calls upon the script.js file and adds in the code to inform the players whose turn it is along with a restart button for when there is a winner
Sydney Morick and Emma Martin
April 25, 2020
 */
$(document).ready(function(){
    // Calls upon the script.js file to create the grid and the placement of tokens
    const connect4 = new Script('#connect4')
    connect4.onPlayerMove = function(){
        $('#player').text(connect4.player);
    }
    // calls unpon script.js to set up the restart button to play the game again once a winner is found
    $('#restart').click(function(){
        connect4.restart();
    })
});





