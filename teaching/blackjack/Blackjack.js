/*
@file Blackjack.js
@brief This file implements javascript functions, javascript DOM events, arrays, and objects to
create a functioning 2 player blackjack game
@author Joe McCalmon, Matthew Sparacio, Liz Murphy, Rachel Mount
@date 12/6/19
 */


var Cards = new Array(52);

//Below are all the card objects. They are manually coded out for ease of reference
//val refers to their card value, and img to the link to the image in the cardImages folder
var card1 = {val: 2, suit: 1, name: "2 of clubs", img: 'cardImages/2C.jpg'};
var card2 = {val: 2, suit: 2, name: "2 of spades", img: 'cardImages/2S.jpg'};
var card3 = {val: 2, suit: 3, name: "2 of diamonds", img: 'cardImages/2D.jpg'};
var card4 = {val: 2, suit: 4, name: "2 of hearts", img: 'cardImages/2H.jpg'};
var card5 = {val: 3, suit: 1, name: "3 of clubs", img: 'cardImages/3C.jpg'};
var card6 = {val: 3, suit: 2, name: "3 of spades", img: 'cardImages/3S.jpg'};
var card7 = {val: 3, suit: 3, name: "3 of diamonds", img: 'cardImages/3D.jpg'};
var card8 = {val: 3, suit: 4, name: "3 of hearts", img: 'cardImages/3H.jpg'};
var card9 = {val: 4, suit: 1, name: "4 of clubs", img: 'cardImages/4C.jpg'};
var card10 = {val: 4, suit: 2, name: "4 of spades", img: 'cardImages/4S.jpg'};
var card11 = {val: 4, suit: 3, name: "4 of diamonds", img: 'cardImages/4D.jpg'};
var card12 = {val: 4, suit: 4, name: "4 of hearts", img: 'cardImages/4H.jpg'};
var card13 = {val: 5, suit: 1, name: "5 of clubs", img: 'cardImages/5C.jpg'};
var card14 = {val: 5, suit: 2, name: "5 of spades", img: 'cardImages/5S.jpg'};
var card15 = {val: 5, suit: 3, name: "5 of diamonds", img: 'cardImages/5D.jpg'};
var card16 = {val: 5, suit: 4, name: "5 of hearts", img: 'cardImages/5H.jpg'};
var card17 = {val: 6, suit: 1, name: "6 of clubs", img: 'cardImages/6C.jpg'};
var card18 = {val: 6, suit: 2, name: "6 of spades", img: 'cardImages/6S.jpg'};
var card19 = {val: 6, suit: 3, name: "6 of diamonds", img: 'cardImages/6D.jpg'};
var card20 = {val: 6, suit: 4, name: "6 of hearts", img: 'cardImages/6H.jpg'};
var card21 = {val: 7, suit: 1, name: "7 of clubs", img: 'cardImages/7C.jpg'};
var card22 = {val: 7, suit: 2, name: "7 of spades", img: 'cardImages/7S.jpg'};
var card23 = {val: 7, suit: 3, name: "7 of diamonds", img: 'cardImages/7D.jpg'};
var card24 = {val: 7, suit: 4, name: "7 of hearts", img: 'cardImages/7H.jpg'};
var card25 = {val: 8, suit: 1, name: "8 of clubs", img: 'cardImages/8C.jpg'};
var card26 = {val: 8, suit: 2, name: "8 of spades", img: 'cardImages/8S.jpg'};
var card27 = {val: 8, suit: 3, name: "8 of diamonds", img: 'cardImages/8D.jpg'};
var card28 = {val: 8, suit: 4, name: "8 of hearts", img: 'cardImages/8H.jpg'};
var card29 = {val: 9, suit: 1, name: "9 of clubs", img: 'cardImages/9C.jpg'};
var card30 = {val: 9, suit: 2, name: "9 of spades", img: 'cardImages/9S.jpg'};
var card31 = {val: 9, suit: 3, name: "9 of diamonds", img: 'cardImages/9D.jpg'};
var card32 = {val: 9, suit: 4, name: "9 of hearts", img: 'cardImages/9H.jpg'};
var card33 = {val: 10, suit: 1, name: "10 of clubs", img: 'cardImages/10C.jpg'};
var card34 = {val: 10, suit: 2, name: "10 of spades", img: 'cardImages/10S.jpg'};
var card35 = {val: 10, suit: 3, name: "10 of diamonds", img: 'cardImages/10D.jpg'};
var card36 = {val: 10, suit: 4, name: "10 of hearts", img: 'cardImages/10H.jpg'};
var card37 = {val: 10, suit: 1, name: "Jack of clubs", img: 'cardImages/JC.jpg'};
var card38 = {val: 10, suit: 2, name: "Jack of spades", img: 'cardImages/JS.jpg'};
var card39 = {val: 10, suit: 3, name: "Jack of diamonds", img: 'cardImages/JD.jpg'};
var card40 = {val: 10, suit: 4, name: "Jack of hearts", img: 'cardImages/JH.jpg'};
var card41 = {val: 10, suit: 1, name: "Queen of clubs", img: 'cardImages/QC.jpg'};
var card42 = {val: 10, suit: 2, name: "Queen of spades", img: 'cardImages/QS.jpg'};
var card43 = {val: 10, suit: 3, name: "Queen of diamonds", img: 'cardImages/QD.jpg'};
var card44 = {val: 10, suit: 4, name: "Queen of hearts", img: 'cardImages/QH.jpg'};
var card45 = {val: 10, suit: 1, name: "King of clubs", img: 'cardImages/KC.jpg'};
var card46 = {val: 10, suit: 2, name: "King of spades", img: 'cardImages/KS.jpg'};
var card47 = {val: 10, suit: 3, name: "King of diamonds", img: 'cardImages/KD.jpg'};
var card48 = {val: 10, suit: 4, name: "King of hearts", img: 'cardImages/KH.jpg'};
var card49 = {val: 11, suit: 1, name: "Ace of clubs", img: 'cardImages/AC.jpg'};
var card50 = {val: 11, suit: 2, name: "Ace of spades", img: 'cardImages/AS.jpg'}; //Figure out ace values - can't the same
var card51 = {val: 11, suit: 3, name: "Ace of diamonds", img: 'cardImages/AD.jpg'};
var card52 = {val: 11, suit: 4, name: "Ace of hearts", img: 'cardImages/AH.jpg'};

Cards = [card1, card2, card3, card4, card5, card6, card7, card8, card9, card10, card11, card12, card13,
         card14, card15, card16, card17, card18, card19, card20, card21, card22, card23, card24, card25,
         card26, card27, card28, card29, card30, card31, card32, card33, card34, card35, card36, card37,
         card38, card39, card40, card41, card42, card43, card44, card45, card46, card47, card48, card49,
         card50, card51, card52];

for (var i = 0; i < Cards.length; i++) {
    Cards[i].cardBack = 'cardImages/cardBack.jpg'; //Assigns the cardBack property of each card to a singular card back image
}

var playingCards = new Array();





var chosenCard;
var handPlayer = new Array();
var handDealer = new Array();
var player = {name: 'player', id: 0, hand: handPlayer, money: 5000, bet: 0, value: 0}; //properties for player and dealer
var dealer = {name: 'dealer', id: 1, hand: handDealer, money: 5000, bet: 0, value: 0};
var currPlayer = player;
var numCards = 52;
var winner;
var isStood = false;
var gameOver = false;
var gameWinner;
var roundOver = true;




function createCards() { //This function creates a separate deck of cards, identical to the above one, which we will alter and reset after each round

    for (var i = 0; i < Cards.length; i++) {
        playingCards[i] = Cards[i];
    }
}

function playGame() { //This is the function that runs whenever the user presses playGame or newRound. For explanation of the child functions within, refer to them further down
    updateMoney();
    roundOver = false; //Effectively starting the round for the purpose of being able to place bets
    document.getElementById("placeBets").style.visibility = "hidden"; //hides the place bets text
    removeWinner();
    removeCards();
    updateValueBoxes();
    document.getElementById("valuePlayer").style.visibility = "visible";
    document.getElementById("valueDealer").style.visibility = "visible";
    createCards();
    deal();
    buttonDisappear("playgame");
    buttonAppear("hit");
    buttonAppear("stand");
}

function randNum() { //This is just a way of calculating a random number 0 - (number of cards in deck - 1)
    var randNum;
    randNum = Math.random() * numCards;
    randNum = Math.floor(randNum);
    return randNum;
}

function setCard() {  //sets the drawn card based on the random number generated
    chosenCard = playingCards[randNum()];
}

function deal() {   //This function deals two cards to the player and the dealer, and updates their hands and values
    for (var i = 0; i < 4; i++) {
        if (i % 2 === 0) { //for player
            setCard();
            handPlayer.push(chosenCard); //adds the chosen card to the player's hand
            playingCards.splice(playingCards.indexOf(chosenCard), 1); //Removes the chosen card from the deck
            numCards = numCards - 1;
            showCard(chosenCard, 75, 100, player);
        }
        else { //for dealer
            setCard();
            handDealer.push(chosenCard);
            playingCards.splice(playingCards.indexOf(chosenCard), 1);
            numCards = numCards - 1;
            showCard(chosenCard, 75, 100, dealer);
        }

    }

    updatePoints();
}

function hitPlayer() { //This function is activated if the player hits the "hit" button
    drawCard(player); //Draws a card and adds it to the player's hand

    showCard(chosenCard, 75, 100, player); //Shows the card on the table

    if (checkBust(player)) { //This function checks if the player as busted
        winner = dealer;
        buttonDisappear("hit");
        buttonDisappear("stand");
        displayWinner(winner);
        payOutBet();
        if (checkIfGameOver()) { //Checks if the game is over (if either player's money is less than 0)
            buttonAppear("newgame");
        }
        else {
            buttonAppear("newround");
            movePlaceBets(); //This function moves the place bets text from left to middle of screen
        }
    }

    if (checkFive()) { //This function checks if the player has 5 cards and also has not busted
        winner = player;
        buttonDisappear("hit");
        buttonDisappear("stand");
        displayWinner(player);
        payOutBet();
        if (checkIfGameOver()) {
            buttonAppear("newgame");
        }
        else {
            buttonAppear("newround");
            movePlaceBets();
        }
    }



}

function drawCard(inPlayer) { //Draws the card and adds it to the player's hand, also updating the player's value
    setCard();
    inPlayer.hand.push(chosenCard);
    playingCards.splice(playingCards.indexOf(chosenCard), 1);
    numCards = numCards - 1;
    //render the image
    updatePointsPlayer(inPlayer);
}

function checkAces(hand, inPlayer) { //This function checks for aces in a hand and updates its value accordingly
    var card;
    for (var i = 0; i < hand.length; i++) { //Iterates through inPlayer's hand
        card = hand[i];

        if (hand[0].val === 11 && hand[1].val === 11) { //If the player drew double aces
            hand[0].val = 1;
            hand[1].val = 11;
        }



        if (card !== hand[hand.length - 1] && card.val === 11 && (!isStood || inPlayer === dealer)) { //If it's not the most recent card
            //Checking aces needs to be different for the most recent card, than the previous cards. Since previous cards are included in the count for total value
            if (inPlayer.value + hand[hand.length - 1].val > 21) {
                card.val = 1;
            }
        }
        else if (card === hand[hand.length - 1] && card.val === 11 && (!isStood || inPlayer === dealer)) { //If it's the most recent card
            if (inPlayer.value + 11 > 21) {
                card.val = 1;
            }
        }
    }
}

function updatePoints() {
    var card;
    var totalVal1 = 0;
    var totalVal2 = 0;
    checkAces(handPlayer, player); //check for aces
    for (var i = 0; i < handPlayer.length; i++) { //update player value to the sum of the values of the hand
        card = handPlayer[i];
        totalVal1 = totalVal1 + card.val;
    }

    player.value = totalVal1;

    checkAces(handDealer, dealer); //check for aces
    for (var j = 0; j < handDealer.length; j++) {
        card = handDealer[j];
        totalVal2 = totalVal2 + card.val;
    }
    dealer.value = totalVal2;
    updateValueBoxes(); //updates the html texts with the values in it
}

function updatePointsPlayer(inPlayer) { //This is a separate function to update points for only either player or dealer

    //I needed a separate function because the acevals can get messed up if we update the values for both players when it is not needed
    var card;
    var totalVal = 0;

    if (inPlayer === player) {
        checkAces(handPlayer, player);
        for (var i = 0; i < handPlayer.length; i++) {
            card = handPlayer[i];
            totalVal = totalVal + card.val;
        }

        player.value = totalVal;
    }
    else {
        checkAces(handDealer, dealer);
        for (var j = 0; j < handDealer.length; j++) {
            card = handDealer[j];
            totalVal = totalVal + card.val;
        }
        dealer.value = totalVal;
    }
    updateValueBoxes();
}

function checkBust(inPlayer) { //simple function to check if a player's value is over 21
    if (inPlayer.value > 21) {
        console.log("bust!");
        return true;
    }
    else {
        return false;
    }
}

function checkFive() { //Simple function to test if the player's hand is 5 and hasn't busted
    if (player.hand.length === 5 && !checkBust(player)) {
        return true;
    }
    else {
        return false;
    }
}

function checkFiveDealer() {//same as above but for dealer
    if (dealer.hand.length === 5 && !checkBust(dealer)) {
        return true;
    }
    else {
        return false;
    }
}

function stand() { //stand function. activated when player hits stand button.
    isStood = true;
    flipCard(); //flips the dealer's unflipped card
    buttonDisappear("hit");
    buttonDisappear("stand");
    playDealer(); //Plays out the dealer's turn
    displayWinner(winner);
    payOutBet();
    if (checkIfGameOver()) {
        buttonAppear("newgame");
    }
    else {
        buttonAppear("newround");
        movePlaceBets();
    }

}

function displayWinner(winner) {
    if (winner === player) {
        document.getElementById('playerWin').style.display = "block"; //This was hidden, now it is visible
    }
    else {
        document.getElementById('dealerWin').style.display = "block";
    }
    roundOver = true;


}

function movePlaceBets() { //moves bets to the middle of the screen
    document.getElementById("placeBets").style.top = "410px";
    document.getElementById("placeBets").style.left = "735px";
}

function removeWinner() { //removes the winner text
    if (winner === player) {
        document.getElementById('playerWin').style.display = "none";
    }
    else {
        document.getElementById('dealerWin').style.display = "none";
    }
}

function playDealer() { //This function plays out the dealer's hand, after the player has pressed stand
    while (dealer.value < 17 || dealer.value < player.value) { //draw until 17 and until dealer >= player value
        drawCard(dealer); //draws a card for the dealer until the while loop condition is not satisfied
        console.log("Dealer drawn card: ");
        console.log(chosenCard);
        showCard(chosenCard, 75, 100, dealer);
        if (checkFiveDealer()) {
            winner = dealer; //if the dealer has 5 cards without busting
            break; //stop drawing cards
        }
    }



    if (dealer.value < 22) {//Since the dealer has to draw until = or more than player, if the dealer has not busted, then he must have won
        winner = dealer;
        console.log("Dealer wins");

    }
    else { //dealer busts
        winner = player;
        console.log("Player wins, dealer busts");
    }


}

var bet = 0;

function incBetBlack() { //Increase bet by 500 when they press the black chip
    if (roundOver) { //Only happens if you are in between rounds
        bet = bet + 500;
        player.bet = bet;
        dealer.bet = bet;
        updateBet();
    }
}

function incBetBlue() { //increase bet by 100 when pressing the blue chip
    if (roundOver) {
        bet = bet + 100;
        player.bet = bet;
        dealer.bet = bet;
        updateBet();
    }
}

function incBetWhite() { //Increase bet by 50 when they press the white button
    if (roundOver) {
        bet = bet + 50;
        player.bet = bet;
        dealer.bet = bet;
        updateBet();
    }
}

function updateBet() { //updates the bet text
    document.getElementById("bet").innerHTML = "Round Bet: $" + bet;
}

function updateMoney() { //used to change player moneyy after bet
    player.money = player.money - bet;
    dealer.money = dealer.money - bet;
}

function payOutBet() { //pays out the bet *2 to the winner
    if (winner === player) {
        player.money = player.money + player.bet + dealer.bet;
    }
    else {
        dealer.money = dealer.money + player.bet + dealer.bet;
    }

    updateValueBoxes();
    bet = 0;
    player.bet = 0;
    dealer.bet = 0;
    updateBet();
    document.getElementById("placeBets").style.visibility = "visible"; //shows the place bet text again
}

function newRound() { //triggered when the user presses the newround button. resets most variables for the beginning of the round
    player.value = 0;
    dealer.value = 0;
    handPlayer.splice(0, handPlayer.length); //splices the whole hand
    handDealer.splice(0, handDealer.length);
    card49.val = 11;
    card50.val = 11;
    card51.val = 11;
    card52.val = 11;
    playingCards.splice(0, playingCards.length);
    currPlayer = player;
    numCards = 52;
    isStood = false;

    buttonDisappear("newround");
    playGame(); //restarts with the playgame function
}

function checkIfGameOver() { //Checks if either player's money is 0 or less. If so, displays the grand winner
    if (player.money <= 0) {
        gameWinner = dealer;
        gameOver = true;
    }
    else if (dealer.money <= 0) {
        gameWinner = player;
        gameOver = true;
    }

    if (gameOver) {
        //HTML end screen. Game completely over. Restart match
        displayGrandWinner(gameWinner);
        //Display the button with the restartMatch function
        return true;
    }
    else {
        return false;
    }
}

function displayGrandWinner(winner) {

    removeWinner(); //to remove the existing player/dealer wins text

    if (winner === player) {
        document.getElementById("playerWinGame").style.visibility = "visible";
    }
    else {
        document.getElementById("dealerWinGame").style.visibility = "visible";
    }


}

function removeGrandWinner() {//hides the winner text
    document.getElementById("playerWinGame").style.visibility = "hidden";
    document.getElementById("dealerWinGame").style.visibility = "hidden";
}

function restartMatch() {
    //Restarts everything, including money. Triggered on "newgame" button press
    removeGrandWinner();
    buttonDisappear("newgame");
    roundOver = true;
    player.value = 0;
    dealer.value = 0;
    handPlayer.splice(0, handPlayer.length);
    handDealer.splice(0, handDealer.length);
    card49.val = 11;
    card50.val = 11;
    card51.val = 11;
    card52.val = 11;
    playingCards.splice(0, playingCards.length);
    currPlayer = player;
    numCards = 52;
    isStood = false;
    player.bet = 0;
    dealer.bet = 0;
    player.money = 5000;
    dealer.money = 5000;
    gameOver = false;
    removeCards();
    updateValueBoxes();
    document.getElementById("valuePlayer").style.visibility = "hidden";
    document.getElementById("valueDealer").style.visibility = "hidden";
    document.getElementById("playGameAppear").style.display = "block";
    document.getElementById("placeBets").style.top = "225px";
    document.getElementById("placeBets").style.left = "125px";

}

function buttonAppear(button){
    var newButton;

    //Below are ways to create the buttons. I now realize that I could just create the button and then toggle visibility,
    //but I learned about that after I had created these methods of creating and then removing. This works fine, so I kept it.


    if (button === "hit") {
        newButton = document.createElement('button');
        newButton.setAttribute("id", "hitB");
        newButton.innerHTML = "Hit";
        document.getElementById("buttons").appendChild(newButton);
        newButton.onclick = hitPlayer;
        newButton.style.position = "absolute";
        newButton.style.top = "400px";
        newButton.style.left = "800px";
        newButton.style.color = "black";
        newButton.style.background = 'white';
        newButton.style.width = "75px";
        newButton.style.height = "30px";
        newButton.style.fontSize = "20px";
        newButton.style.border = '2px solid black';

    }



    if (button === "stand") {
        newButton = document.createElement('button');
        newButton.setAttribute("id", "standB");
        newButton.innerHTML = "Stand";
        document.getElementById("buttons").appendChild(newButton);
        newButton.onclick = stand;
        newButton.style.position = "absolute";
        newButton.style.top = "300px";
        newButton.style.left = "800px";
        newButton.style.color = "black";
        newButton.style.background = 'white';
        newButton.style.width = "75px";
        newButton.style.height = "30px";
        newButton.style.fontSize = "20px";
        newButton.style.border = '2px solid black';

    }

    if (button === "newround") {
        newButton = document.createElement('button');
        newButton.setAttribute("id", "roundB");
        newButton.innerHTML = "New Round";
        document.getElementById("buttons").appendChild(newButton);
        newButton.onclick = newRound;
        newButton.style.position = "absolute";
        newButton.style.top = "350px";
        newButton.style.left = "765px";
        newButton.style.color = "black";
        newButton.style.background = 'white';
        newButton.style.width = "150px";
        newButton.style.height = "30px";
        newButton.style.fontSize = "20px";
        newButton.style.border = '2px solid black';
    }

    if (button === "newgame") {
        newButton = document.createElement('button');
        newButton.setAttribute("id", "newGameB");
        newButton.innerHTML = "New Game";
        document.getElementById("buttons").appendChild(newButton);
        newButton.onclick = restartMatch;
        newButton.style.position = "absolute";
        newButton.style.top = "350px";
        newButton.style.left = "765px";
        newButton.style.color = "black";
        newButton.style.background = 'white';
        newButton.style.width = "150px";
        newButton.style.height = "30px";
        newButton.style.fontSize = "20px";
        newButton.style.border = '2px solid black';
    }


}

function buttonDisappear(button){
    var el;
    //The below deletes the created buttons, except for playGame, since playGame exists since the beginning
    //I just toggle the existence of the play game button with the display command
    if (button === "hit") {
        el = document.getElementById('hitB');
        el.remove();
    }
    if (button === "stand") {
        el = document.getElementById('standB');
        el.remove();
    }
    if (button === "playgame") {
        el = document.getElementById("playGameAppear");
        el.style.display = "none";
    }
    if (button === "newround") {
        el = document.getElementById("roundB");
        el.remove();
    }
    if (button === "newgame") {
        el = document.getElementById("newGameB");
        el.remove();
    }
}

function updateValueBoxes() {
    //This just updates the text boxes with the new values
    document.getElementById("valuePlayer").innerHTML = "Player value: " + player.value;
    if (!isStood) {
        document.getElementById("valueDealer").innerHTML = "Dealer value: ?";
    }
    else {
        document.getElementById("valueDealer").innerHTML = "Dealer value: " + dealer.value;
    }
    document.getElementById("playerMoney").innerHTML = "Player money: $" + player.money;
    document.getElementById("dealerMoney").innerHTML = "Dealer money: $" + dealer.money;
}

function showCard(inCard, width, height, inPlayer) {
    /*
    This function creates an image element each time it's called with the inCard img attribute as its src
    It also adjusts the margins of the allotted space for each hand in the css
    It needs to adjust the margins because they are displayed with flex, which spaces each card out equally
    However, if I kept the same margins, the first two cards would have way too much space in between them, so instead I manually increase
    the allotted space via this function so that the space between cards stays roughly the same no matter how many cards are in a hand
     */
    var card;
    card = document.createElement('img');
    card.src = inCard.img;
    card.width = width;
    card.height = height;
    card.alt = inCard.name;

    if (inPlayer === player) {
        document.getElementById("playerCardImages").appendChild(card);

        if (player.hand.length === 2) {
            document.getElementById("playerCardImages").style.marginLeft = "750px";
            document.getElementById("playerCardImages").style.marginRight = "750px";


        }
        else if (player.hand.length === 3) {
            document.getElementById("playerCardImages").style.marginLeft = "700px";
            document.getElementById("playerCardImages").style.marginRight = "700px";

        }
        else if (player.hand.length === 4) {
            document.getElementById("playerCardImages").style.marginLeft = "650px";
            document.getElementById("playerCardImages").style.marginRight = "650px";

        }
        else if (player.hand.length === 5) {
            document.getElementById("playerCardImages").style.marginLeft = "600px";
            document.getElementById("playerCardImages").style.marginRight = "600px";

        }
    }
    else {
        document.getElementById("dealerCardImages").appendChild(card);
        if (dealer.hand.length === 1) {
            card.src = inCard.cardBack;
        }

        if (dealer.hand.length === 2) {
            document.getElementById("dealerCardImages").style.marginLeft = "750px";
            document.getElementById("dealerCardImages").style.marginRight = "750px";


        }
        else if (dealer.hand.length === 3) {
            document.getElementById("dealerCardImages").style.marginLeft = "700px";
            document.getElementById("dealerCardImages").style.marginRight = "700px";

        }
        else if (dealer.hand.length === 4) {
            document.getElementById("dealerCardImages").style.marginLeft = "650px";
            document.getElementById("dealerCardImages").style.marginRight = "650px";

        }
        else if (dealer.hand.length === 5) {
            document.getElementById("dealerCardImages").style.marginLeft = "600px";
            document.getElementById("dealerCardImages").style.marginRight = "600px";

        }
    }
}

function flipCard() { //This is used to change the face down dealer card to face up
    var card;
    card = document.getElementById("dealerCardImages").firstChild;
    card.src = dealer.hand[0].img;
}

function removeCards() { //This clears the table of cards using the removeChild function
    var playerCards;
    playerCards = document.getElementById("playerCardImages");
    while (playerCards.firstChild) {
        playerCards.removeChild(playerCards.firstChild);
    }
    var dealerCards;
    dealerCards = document.getElementById("dealerCardImages");
    while (dealerCards.firstChild) {
        dealerCards.removeChild(dealerCards.firstChild);
    }
}
