let bat = document.querySelector('#bat')
let ball = document.querySelector('#ball')
let stump = document.querySelector('#stump')
let resetbtn = document.querySelector('#reset')
let msgContaiber = document.querySelector('.msg-container')

let scoreStr = localStorage.getItem('score');
let score;
resetScore(scoreStr);
function resetScore(scoreStr) {
    score = scoreStr ? JSON.parse(scoreStr) : {
        user: 0,
        computer: 0,
        tie: 0,
    };
    score.displayScore = function () {
        return `Won : ${score.user}, Loss : ${score.computer}, Tie : ${score.tie}`
    }
}

const generateComputerChoice = () => {
    let randomChoice = 3 * (Math.random());
    if (randomChoice > 0 && randomChoice <= 1) {
        return 'bat';
    } else if (randomChoice > 1 && randomChoice <= 2) {
        return 'ball';
    } else {
        return 'stump';
    }
}


const generateResult = (userMove, computerMove) => {
    if (computerMove === 'stump' && userMove === 'bat') {
        score.computer++;
        return 'Computer Win!';
    } else if (computerMove === 'ball' && userMove === 'bat') {
        score.user++;
        return 'User Win!';
    } else if (computerMove === 'bat' && userMove === 'stump') {
        score.user++;
        return 'User Win!';
    } else if (computerMove === 'ball' && userMove === 'stump') {
        score.computer++;
        return 'Computer Win!';
    } else if (computerMove === 'bat' && userMove === 'ball') {
        score.computer++;
        return 'Computer Win!';
    } else if (computerMove === 'stump' && userMove === 'ball') {
        score.user++;
        return 'User Win!';
    } else {
        score.tie++;
        return 'Match Tie!';
    }
}

const showResult = (userMove, computerMove, result) => {
    localStorage.setItem('score', JSON.stringify(score));

    // console.log(`You have choosen ${userMove}. Computer choice is ${computerMove}

    // ${result}.

    // ${score.displayScore()}`);

    document.querySelector('#user-move').innerText = `You have choosen : ${userMove}`
    document.querySelector('#computer-move').innerText = `Computer choice is : ${computerMove}`
    document.querySelector('#result').innerText = `Result is : ${result}`

    updateScore();
}

const updateScore = () => {
    document.querySelector('#score').innerText = `Won : ${score.user}, Loss : ${score.computer}, Tie : ${score.tie}`;
};

bat.addEventListener("click", () => {
    let computerChoice = generateComputerChoice();
    let result = generateResult('bat', computerChoice);
    showResult('bat', computerChoice, result)
});

ball.addEventListener("click", () => {
    let computerChoice = generateComputerChoice();
    let result = generateResult('ball', computerChoice);
    showResult('ball', computerChoice, result)
});

stump.addEventListener("click", () => {
    let computerChoice = generateComputerChoice();
    let result = generateResult('stump', computerChoice);
    showResult('stump', computerChoice, result)
});

resetbtn.addEventListener("click", () => {
    localStorage.removeItem('score');
    resetScore();
    updateScore();
    
    document.querySelector('#user-move').innerText = '';
    document.querySelector('#computer-move').innerText = '';
    document.querySelector('#result').innerText = '';
});
