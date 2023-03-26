// environment
let canvas;
let canvasWidth = 360;
let canvasHeight = 640;
let context;

// bird
let birdWidth = 34;          // bird image ratio -> w:h = 408:228 = 17:12
let birdHeight = 24;
let birdX = canvasWidth/8;   // bird's x position
let birdY = canvasHeight/2;  // bird's y position
let birdImg;
                             // point of reference -> top-left
let bird = {                 // bird object
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
}

// pipes
let pipeArray = [];
let pipeWidth = 64;          // pipe image ratio -> 384/3072 = 1/8
let pipeHeight = 512;
let pipeX = canvasWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

// game physics
let velocityX = -2;        // pipes moving left speed
let velocityY = 0;         // bird jump speed
let valueG = 0.4;

let gameOver = false;
let score = 0;

window.onload = function() {
    canvas = document.getElementById('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    context = canvas.getContext("2d");          //used for drawing on the canvas

    // draw flappy bird
    birdImg = new Image();
    birdImg.src = "./images/flappybird.png";
    birdImg.onload = function(){
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }

    topPipeImg = new Image();
    topPipeImg.src = "./images/toppipe.png";
    
    bottomPipeImg = new Image();
    bottomPipeImg.src = "./images/bottompipe.png";

    requestAnimationFrame(update);
    setInterval(placePipes, 1500);            // every 1.5 seconds
    document.addEventListener('keydown', jumpBird);
}

function update(){
    requestAnimationFrame(update);
    if (gameOver){
        return;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);

    // bird
    velocityY += valueG;
    // apply gravity to current bird.y, as well as limit the bird in area
    bird.y = Math.max(bird.y + velocityY, 0);
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    if (bird.y > canvas.height){
        gameOver = true;
    }

    // pipes (draw every pipe object in pipeArray)
    for(let i=0; i<pipeArray.length; i++){
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if(!pipe.passed && bird.x > pipe.x + pipeWidth){
            score += 0.5;
            pipe.passed = true;
        }

        if (detectCollision(bird, pipe)) {
            gameOver = true;
        }
    }

    // clear pipes
    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
        pipeArray.shift();      // removes first pipe of the array
    }

    // score
    context.fillStyle = "white";
    context.font = "45px sans-serif";
    context.fillText(score, 5, 45);

    if (gameOver) {
        context.fillText("GAME OVER", 5, 90);
    }
}

function placePipes(){
    if (gameOver){
        return;
    }

    // Math.random -> (0 to 1) * 256
    // height -> -1/4 to -3/4
    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openingSpace = canvas.height/4;

    let topPipe = {
        img: topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }

    pipeArray.push(topPipe);

    let bottomPipe = {
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY + pipeHeight + openingSpace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }

    pipeArray.push(bottomPipe);
}

function jumpBird(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") {
        velocityY = -6;
    }

    // reset game
    if (gameOver){
        bird.y = birdY;
        pipeArray = [];
        score = 0;
        gameOver = false;
    }
}

function detectCollision(bird, pipe) {
    return bird.x < pipe.x + pipe.width &&
            bird.x + bird.width > pipe.x &&
            bird.y < pipe.y + pipe.height &&
            bird.y + bird.height > pipe.y;
}