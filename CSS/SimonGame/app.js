let gameSeq = [];
let userSeq = [];
let highScore = 0;
let level = 0;
let started = false;
let buttonColors = ["red", "purple", "green", "yellow"];
let h2 = document.querySelector("h2");
let highScoreText = document.createElement("h3");
highScoreText.innerText = "High Score: 0";
document.body.prepend(highScoreText);
 
document.addEventListener("keypress", function() {
    if (started ==false) {
       console.log("Game Started");
       started = true;
    }
    levelUp();
   
});

function gameFlash(btn) {
btn.classList.add("flash");
setTimeout(function() {
    btn.classList.remove("flash");
}, 250);
}

function userFlash(btn) {
btn.classList.add("userFlash");
setTimeout(function() {
    btn.classList.remove("userFlash");
}, 250);
}

function levelUp() {

    userSeq = [];
    level++;
    h2.innerText = "Level " + level;
    let randIndex = Math.floor(Math.random() * 4);
    let randColor = buttonColors[randIndex];
    let randBtn = document.querySelector("." + randColor);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);

}
 function checkAnswer(idx) {

   
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(function() {
                levelUp();
            }, 1000);
        }
    } else {
        let h2 = document.querySelector("h2");
        h2.innerHTML = "Game Over! Your score was " + (level) + ". Press Any Key to Restart";
       
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 500);
           updateHighScore();

        reset();
    }
 }
function btnPress() {
    let btn = this;
    userFlash(btn);
    userColor =  btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userSeq);
    checkAnswer(userSeq.length - 1);

console.log(this);
}
let allBtns = document.querySelectorAll(".btn");

for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    gameSeq = [];
    userSeq = [];
    level = 0;
    started = false;
}

function updateHighScore() {
    if (level > highScore) {
        highScore = level;
    }
    highScoreText.innerText = "High Score: " + highScore;
}
