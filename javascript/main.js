const buttons = document.querySelectorAll('button');
let container = document.querySelector(".container");
let text = document.createElement('p');

let score = {
    userScore : 0,
    computerScore : 0
}

/* Main Game loop */
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        // Have the computer select a random option
        let dealer = getComputerChoice(3);
        // Game results + Winner declaration
        let check = compareChoices(button.id, dealer);
        // If gameText does not exist, add it to the webpage
        if(!document.getElementById("gameText")) {
            text.setAttribute("id", "gameText");
            container.appendChild(text);
        }
        // Update game score
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
            // Provide final game message (within loop as buttons are removed after so multiple appends are not created)
            container.appendChild(winnerText);
            // Remove buttons once complete
            hide();
        }
    });
});

// Hide buttons once game is complete
function hide() {
    buttons.forEach((button) => {
        button.style.display = 'none';
    });
}

// Retrieve the computer's random choice
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

// Compare user and computer hands to determine the round's winner
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
