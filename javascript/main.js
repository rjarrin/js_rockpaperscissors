const buttons = document.querySelectorAll('button');
let container = document.querySelector(".container");
let text = document.createElement('p');


buttons.forEach((button) => {
    button.addEventListener('click', () => {
        // Have the computer select a random option
        let dealer = getComputerChoice(3);
        // Game results + Winner declaration
        let check = compareChoices(button.id, dealer);
        if(!document.getElementById("gameText")) {
            text.setAttribute("id", "gameText");
            container.appendChild(text);
        }
        if (check == 0) {
            score.userScore = score.userScore + 1;
        } else if (check == 1) {
            score.computerScore = score.computerScore + 1;
        }
        // Update the UI score
        let userScore = document.querySelector(".container #user");
        userScore.textContent = "Player score: " +score.userScore;
        let computerScore = document.querySelector(".container #computer");
        computerScore.textContent = "Computer score: " +score.computerScore;

        // Announce results once either player reaches 5 points
        if (score.userScore == 5 || score.computerScore == 5) {
            let winnerText = document.createElement('h1');
            if (score.userScore == 5) {
                winnerText.style.cssText = 'color: blue;';
                winnerText.textContent = 'YOU WIN!';
            } else if (score.computerScore == 5) {
                winnerText.style.cssText = 'color: red;';
                winnerText.textContent = 'YOU LOSE!';
            }
            container.appendChild(winnerText);
            // Remove buttons once complete
            hide();
        }
    });
});

function hide() {
    buttons.forEach((button) => {
        button.style.display = 'none';
    });
}

function playGame(score) {
    
    /* Ask player to select their choice */
    let hand = playerSelection();
    console.log("Player selected \"" + hand + "\".");

    /* Have the computer select a random option */
    let dealer = getComputerChoice(3);
    console.log("Computer selected \"" + dealer + "\".");

    /* Winner declaration */
    let check = compareChoices(hand, dealer);

    if (check == 0) {
        score.userScore = score.userScore + 1;
    } else if (check == 1) {
        score.computerScore = score.computerScore + 1;
    }
}

function playerSelection() {
    let choice = prompt("Choose a hand option (rock, paper, scissors): ");
    choice = choice.toLowerCase();

    while (choice != "rock" && choice != "paper" && choice !== "scissors") {
        choice = prompt("Invalid input. Try again: ");
        choice = choice.toLowerCase()
    }
    return choice;
}

function getComputerChoice(choice) {
    let response = Math.floor(Math.random() * choice);
    if (response == 0) {
        return "rock";
    }
    else if (response == 1) {
        return "paper";
    }
    else if (response == 2) {
        return "scissors";
    }
    else {
        return "getComputerChoice: Error";
    }
}

function compareChoices(hand, dealer) {
    if ((hand == "rock" && dealer == "scissors") 
    || (hand == "paper" && dealer == "rock") 
    || (hand == "scissors" && dealer == "paper")) {
        text.textContent = "You Win! " +hand+ " beats " +dealer+ ".";
        console.log("You Win! " +hand+ " beats " +dealer+ ".");
        return 0;
    }
    else if ((dealer == "rock" && hand == "scissors") 
    || (dealer == "paper" && hand == "rock") 
    || (dealer == "scissors" && hand == "paper")) {
        text.textContent = "You Lose! " +dealer+ " beats " +hand+ ".";
        console.log("You Lose! " +dealer+ " beats " +hand+ ".");
        return 1;
    }
    else {
        text.textContent = "Tied Game.";
        console.log("Tied Game.");
        return 2;
    }
}

let score = {
    userScore : 0,
    computerScore : 0
}

let games = 1;

/* Introduce the player to the game */
console.log("Welcome to this Rock-Paper-Scissors Simulator");
for (let i = 0; i < games; i++) {
    //playGame(score);
}

console.log("Final Score (P:C) is "+score.userScore+":"+score.computerScore);