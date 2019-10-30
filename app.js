let userScore = 0;
let computerScore = 0;
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
const cannibal_modifer = document.getElementById("clone");
const timetravel_modifer = document.getElementById("clone");

function timeTravel() {

}
function modifier() {

}
function getComputerChoice() {
    const choices = ['r', 'p', 's', 'spock', 'lizard'];
    const randomNumber = Math.floor(Math.random() * 5);
    return "lizard";
}

function convertToWord(letter) {
    if (letter === "r") return "Rock";
    if (letter === "p") return "Paper";
    if (letter === "spock") return "Spock";
    if (letter === "lizard") return "Lizard"
    return "Scissors";
}

function win(userChoice, computerChoice, ) {
    const smallUserWord = "user".fontsize(3).sup();
    const smallCompWord = "comp".fontsize(3).sup();
    const userChoice_div = document.getElementById(userChoice);
    userScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} beats ${convertToWord(computerChoice)}${smallCompWord}.  You win!`
    userChoice_div.classList.add('green-glow');
    setTimeout(() => userChoice_div.classList.remove('green-glow'), 400);
}

function lose(userChoice, computerChoice) {
    const smallUserWord = "user".fontsize(3).sup();
    const smallCompWord = "comp".fontsize(3).sup();
    const userChoice_div = document.getElementById(userChoice);
    computerScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} loses to ${convertToWord(computerChoice)}${smallCompWord}.  You lost...`
    userChoice_div.classList.add('red-glow');
    setTimeout(() => userChoice_div.classList.remove('red-glow'), 400);
}

function draw(userChoice, computerChoice) {
    const smallUserWord = "user".fontsize(3).sup();
    const smallCompWord = "comp".fontsize(3).sup();
    const userChoice_div = document.getElementById(userChoice);
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} equals ${convertToWord(computerChoice)}${smallCompWord}.  It's a draw.`
    userChoice_div.classList.add('gray-glow');
    setTimeout(() => userChoice_div.classList.remove('gray-glow'), 400);
}

function game(userChoice) {
    //  debugger;
    const computerChoice = getComputerChoice();
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
            break;
        case "rp":
        case "ps":
        case "sr":
        case "lizardr":
        case "lizards":
        case "plizard":
        case "spocklizard":
        case "spockp":
        case "rspock":
        case "sspock":
            lose(userChoice, computerChoice);
            break;
        case "rr":
        case "pp":
        case "ss":
        case "spockspock":
        case "lizardlizard":
            draw(userChoice, computerChoice);
            break;

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
