document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("scoreTable")?.getElementsByTagName('tbody')[0];
    const playerNameInput = document.getElementById("playerName");
    let playerName = "";

    // Prompt for player name
    function getUserName() {
        playerName = prompt("Enter your name:", "Player1");
        if (!playerName || playerName.trim() === "") {
            playerName = "Guest";
        }
        if (playerNameInput) {
            playerNameInput.value = playerName;
        }
    }
    getUserName();

    // Send score to PHP/MySQL backend
    function sendScore(player, game, score) {
        fetch('submit-score.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `player=${encodeURIComponent(player)}&game=${encodeURIComponent(game)}&score=${score}`
        })
        .then(res => res.text())
        .then(data => console.log("Server response:", data))
        .catch(err => console.error("Error sending score:", err));
    }

    // Add score to the HTML table and send to DB
    function addScore(game, score) {
        if (!table) return;
        const newRow = table.insertRow();
        newRow.insertCell(0).textContent = playerName;
        newRow.insertCell(1).textContent = game;
        newRow.insertCell(2).textContent = score;

        sendScore(playerName, game, score);
    }

    // Rock Paper Scissors logic
    window.playRPS = (choice) => {
        const choices = ["rock", "paper", "scissors"];
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];
        let result = "";

        if (choice === computerChoice) {
            result = "It's a tie!";
        } else if (
            (choice === "rock" && computerChoice === "scissors") ||
            (choice === "paper" && computerChoice === "rock") ||
            (choice === "scissors" && computerChoice === "paper")
        ) {
            result = "You win!";
            addScore("Rock Paper Scissors", 10);
        } else {
            result = "You lose!";
            addScore("Rock Paper Scissors", 5);
        }
        document.getElementById("rps-result").textContent = result;
    };

    // Number Guessing logic
    const guessButton = document.getElementById("guessButton");
    const guessInput = document.getElementById("guessInput");
    const guessResultDisplay = document.getElementById("guess-result");

    function checkGuess() {
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        const guess = parseInt(guessInput.value, 10);

        if (isNaN(guess) || guess < 1 || guess > 100) {
            guessResultDisplay.textContent = "Please enter a valid number between 1 and 100!";
            return;
        }

        if (guess === randomNumber) {
            guessResultDisplay.textContent = "Correct! You win 20 points!";
            addScore("Number Guessing", 20);
        } else {
            guessResultDisplay.textContent = `Wrong! The number was ${randomNumber}. You get 5 points.`;
            addScore("Number Guessing", 5);
        }
    }

    if (guessButton) {
        guessButton.addEventListener("click", checkGuess);
    }

    // Dice Roll logic
    window.playDiceRoll = () => {
        const playerRoll = Math.floor(Math.random() * 6) + 1;
        const computerRoll = Math.floor(Math.random() * 6) + 1;
        let result = "";

        if (playerRoll > computerRoll) {
            result = `You rolled ${playerRoll}, computer rolled ${computerRoll}. You win 15 points!`;
            addScore("Dice Roll", 15);
        } else if (playerRoll < computerRoll) {
            result = `You rolled ${playerRoll}, computer rolled ${computerRoll}. You lose, 5 points awarded.`;
            addScore("Dice Roll", 5);
        } else {
            result = `Both rolled ${playerRoll}. It's a tie! 10 points.`;
            addScore("Dice Roll", 10);
        }
        document.getElementById("dice-result").textContent = result;
    };
});
