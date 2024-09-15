import * as utils from './utils.js';
export const global = (scripts) => {
    scripts.forEach(script => {
        document.body.appendChild(script);
    });
}

window.onload = function () {
    console.log("The script importer has loaded.");
}

export function renderJankenGame() {
    // const jankenGame = document.createElement('script');
    // jankenGame.src = 'https://cdn.jsdelivr.net/npm/janken-game@latest/dist/janken-game.min.js';
    // jankenGame.onload = () => {
    //     const jankenGameInstance = new JankenGame();
    //     jankenGameInstance.startGame();
    // };
    // document.body.appendChild(jankenGame);
    // return `
    //     <section class="janken__section">
    //         <p class="green__text">Let's play janken!</p>
    //         <div class="janken__btn_holder">
    //         <button class="janken__buttons" id="rock">rock</button>
    //         <button class="janken__buttons" id="paper">paper</button>
    //         <button class="janken__buttons" id="scissors">scissors</button>
    //         </div>
    //     </section>
    // `
    return [
        "<section class=\"janken__section\">",
        "<h2>E•M's Janken</h2>",
        "<p class=\"green__text\">Just pick \"rock\", \"paper\", or \"scissors\" below to get started. Let's play!</p>",
        "<div class=\"janken__btn_holder\">",
        "<button class=\"janken__buttons\" id=\"rock\">rock</button>",
        "<button class=\"janken__buttons\" id=\"paper\">paper</button>",
        "<button class=\"janken__buttons\" id=\"scissors\">scissors</button>",
        "</div>",
        "</section>"
    ];
};

export function setupJankenGame() {
    const possibleChoices = document.querySelectorAll('button.janken__buttons');
  
    possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
        const userChoice = e.target.id;
        const computerChoice = generateComputerChoice();
        const result = getResult(computerChoice, userChoice);
        const msg = `You picked ${userChoice}, CJ picked ${computerChoice}.<br>${result}`
        utils.callTip(msg)
    }))
};

function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * 3);
    return randomNumber === 0 ? 'rock' : randomNumber === 1 ? 'scissors' : 'paper';
};

function getResult(computer, player) {
    let result
    if (computer === player) {
        result = "It's a draw..."
    }
    if (computer === 'rock' && player === 'paper') {
        result = "You win!"
    }
    if (computer === 'rock' && player === 'scissors') {
        result = "Sorry, you lost :("
    }
    if (computer === 'paper' && player === 'scissors') {
        result = "You win!"
    }
    if (computer === 'paper' && player === 'rock') {
        result = "Sorry, you lost :("
    }
    if (computer === 'scissors' && player === 'paper') {
        result = "Sorry, you lost :("
    }
    if (computer === 'scissors' && player === 'rock') {
        result = "You win!"
    }
    return result
};