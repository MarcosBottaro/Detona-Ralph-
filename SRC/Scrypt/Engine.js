const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
    },

    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        maxLives: 3, 
        currentLives: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    },
};


function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime === 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);

        if (state.values.currentLives > 1) {
            state.values.currentLives--;
            state.view.lives.textContent = state.values.currentLives;
            resetGame();
          } else {
            alert("Game Over!" + "\r\n" + "Your Score: " + state.values.result);
          }

    } else if (state.values.currentTime === 50) {
        clearInterval(state.actions.timerId);
        state.actions.timerId = setInterval(randomSquare, 900);

    } else if (state.values.currentTime === 45) {
        clearInterval(state.actions.timerId);
        state.actions.timerId = setInterval(randomSquare, 650);

    } else if (state.values.currentTime === 35) {
        clearInterval(state.actions.timerId);
        state.actions.timerId = setInterval(randomSquare, 450);

    } else if (state.values.currentTime === 10) {
        clearInterval(state.actions.timerId);
        state.actions.timerId = setInterval(randomSquare, 300);
    }
}


function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;

}


function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                hitSound();
            }
        })
    });
}

function hitSound() {
    let audio = new Audio("./SRC/Sound/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function resetGame() {
    clearInterval(state.actions.timerId);
    clearInterval(state.actions.countDownTimerId);

    state.values.currentTime = 60;
    state.view.timeLeft.textContent = state.values.currentTime;
    randomSquare();

    state.actions.countDownTimerId = setInterval(countDown, 1000);
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);

}

function initialize() {
    addListenerHitBox();
    resetGame();
}



initialize();