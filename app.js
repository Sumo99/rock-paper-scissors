let userScore = 0;
let computerScore = 0;
let first_turn = true; //the markov chain has to choose randomly
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const modifiers = ["Clone", "Cannibal", "Time Travel"]
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");
const spock_div = document.getElementById("spock");
const lizard_div = document.getElementById("lizard");
const clone_modifer = document.getElementById("clone");
const cannibal_modifer = document.getElementById("cannibal");
const timetravel_modifer = document.getElementById("timetravel");
const smallUserWord = "user".fontsize(3).sup();
const smallCompWord = "comp".fontsize(3).sup();
let lastUserChoice = "";
let currentChoice = "";
let markovArray = Array(5).fill().map(() => Array(5).fill(0));
const rpsEnum = {
    "r": 0,
    "p": 1,
    "s": 2,
    "spock": 3,
    "lizard": 4
}
function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function calculatemarkovProbability(choice) {
    let markovArraySlice = markovArray[rpsEnum[choice]] //get the row of the matrix corresponding with the choich
    let maxIndex = markovArraySlice.indexOf(Math.max(...markovArraySlice)); //spread array and get maxindex

    // bot chooses paper
    if (maxIndex === 0) {
        let rockWin = ["p", "spock"] //if the user picks rock then we can pick either paper or spock
        return randomChoice(rockWin);
    }
    else if (maxIndex === 1) {
        let paperWin = ["s", "lizard"] //paper is defeated by scissors or lizard
        return randomChoice(paperWin);
    }
    else if (maxIndex === 2) {
        let scissorsWin = ["r", "spock"]
        return randomChoice(scissorsWin);
    }
    else if (maxIndex === 3) {
        let spockWin = ["p", "lizard"] //win over spock
        return randomChoice(spockWin);
    }
    else if (maxIndex === 4) {
        let lizardWin = ["r", "s"]
        return randomChoice(lizardWin);
    }
}
function timetravel() {

}
function clone() {

}
function cannibal() {
    if (game(lastmoveplayer1) === 0) {
        //user wins
    }
    lose()
}

function getComputerChoice() {
    const choices = ['r', 'p', 's', 'spock', 'lizard'];
    const randomNumber = Math.floor(Math.random() * 5);
    lastmoveplayer2 = choices[randomNumber];
    return choices[randomNumber];
}

function convertToWord(letter) {
    if (letter === "r") return "Rock";
    if (letter === "p") return "Paper";
    if (letter === "spock") return "Spock";
    if (letter === "lizard") return "Lizard"
    return "Scissors";
}

function win(userChoice, computerChoice, score = 1) {
    const userChoice_div = document.getElementById(userChoice);
    userScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} beats ${convertToWord(computerChoice)}${smallCompWord}.  You win!`
    userChoice_div.classList.add('green-glow');
    setTimeout(() => userChoice_div.classList.remove('green-glow'), 400);
}

function lose(userChoice, computerChoice, score = -1) {
    const userChoice_div = document.getElementById(userChoice);
    computerScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} loses to ${convertToWord(computerChoice)}${smallCompWord}.  You lost...`
    userChoice_div.classList.add('red-glow');
    setTimeout(() => userChoice_div.classList.remove('red-glow'), 400);
}

function draw(userChoice, computerChoice, score = 0) {
    const userChoice_div = document.getElementById(userChoice);
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} equals ${convertToWord(computerChoice)}${smallCompWord}.  It's a draw.`
    userChoice_div.classList.add('gray-glow');
    setTimeout(() => userChoice_div.classList.remove('gray-glow'), 400);
}

function choose_winner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        draw(userChoice, computerChoice);
        return 0;
    }
    switch (userChoice + computerChoice) {
        case "rs":
        case "pr":
        case "sp":
        case "lizardspock":
        case "rlizard":
        case "slizard":
        case "lizardp":
        case "pspock":
        case "spockr":
        case "spocks":
            win(userChoice, computerChoice);
            return 1; //user won
        default:
            lose(userChoice, computerChoice);
            return -1;
    }
}
function game(userChoice, modifiers = "") {
    if (first_turn) {
        const computerChoice = getComputerChoice();
        first_turn = false;
        lastUserChoice = userChoice;
        currentChoice = userChoice;
        choose_winner(currentChoice, computerChoice);
    }
    else {
        lastUserChoice = currentChoice;
        choose_winner(userChoice, calculatemarkovProbability(lastUserChoice));
        currentChoice = userChoice;
        markovArray[rpsEnum[lastUserChoice]][rpsEnum[currentChoice]]++;
    }

}

function main() {

    rock_div.addEventListener('click', function () {
        game("r");
    })

    paper_div.addEventListener('click', function () {
        game("p");
    })

    scissors_div.addEventListener('click', function () {
        game("s");
    })
    spock_div.addEventListener('click', function () {
        game("spock");
    })
    lizard_div.addEventListener('click', function () {
        game("lizard");
    })

}

main();

// Tutorial https://www.youtube.com/watch?v=jaVNP3nIAv0
