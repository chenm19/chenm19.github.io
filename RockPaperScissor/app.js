const game = ()=> {
    let pScore = 0;
    let cScore = 0;




    //start the game
    const startGame = () => {
        const playBtn = document.querySelector(".intro button");
        const introScreen = document.querySelector(".intro");
        const match = document.querySelector(".match");

        playBtn.addEventListener("click", ()=> {
            introScreen.classList.add("fadeOut");
            match.classList.add("fadeIn");

        });

    };

    //play match
    const playMatch = () => {
        console.log("PlayMatch");
        const options = document.querySelectorAll(".options button");
        const playerHand = document.querySelector(".player-hand");
        const computerHand = document.querySelector(".computer-hand");
        const hands = document.querySelectorAll(".hands img");
        hands.forEach(hand =>{
            hand.addEventListener("animationend", function () {
                this.style.animation = "";

            });
        });
        console.log(options);


        //computer options randomly generated
        const computerOptions = ["rock", "paper","scissors"];

        options.forEach(option => {
            option.addEventListener("click", function() {
                //computer choice
                const computerNumber = Math.floor(Math.random()*3);//round up numbers to 0, 1, 2
                const computerChoice = computerOptions[computerNumber];
                console.log(computerNumber);
                console.log(computerChoice);
                setTimeout(()=> {
                    //here is where we call compare hands
                    compareHands(this.textContent, computerChoice);

                    //update images
                    playerHand.src = `./assets/${this.textContent}.png`;
                    computerHand.src = `./assets/${computerChoice}.png`;

                }, 2000);


                //animation
                playerHand.style.animation = "shakePlayer 2s ease";
                computerHand.style.animation = "shakeComputer 2s ease";

            });
        });
    };

    const updateScore = () => {
        const playerScore = document.querySelector(".player-score p");
        const computerScore = document.querySelector(".computer-score p");
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
    }





    const compareHands = (playerChoice, computerChoice) =>{
        //update text
        const winner = document.querySelector(".winner");

        //checking for a tie
        if(playerChoice === computerChoice) {
            winner.textContent = "It is a tie 🤨";
            return;
        }
        //check for rock
        if(playerChoice === "rock"){
            if(computerChoice === "scissors") {
                winner.textContent = "You Win! 🥳";
                pScore++;
                updateScore();
                return;
            }
            else{
                winner.textContent = "Computer Wins 😭";
                cScore++;
                updateScore();
                return;
            }
        }
        //check for paper
        if(playerChoice === "paper"){
            if(computerChoice === "scissors") {
                winner.textContent = "Computer Wins 😭";
                cScore++;
                updateScore();
                return;
            }
            else{
                winner.textContent = "Nice! 😉";
                pScore++;
                updateScore();
                return;
            }
        }
        //check for scissors
        if(playerChoice === "scissors"){
            console.log("here");

            if(computerChoice === "rock") {
                winner.textContent = "Computer Wins 😭";
                cScore++;
                updateScore();
                return;
            }
            else{
                winner.textContent = "Good Job! 🙌";
                pScore++;
                updateScore();
                return;
            }
        }
    }


//is call all the inner function
    startGame();
    playMatch();

 };

//start the game function
game();
