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
}