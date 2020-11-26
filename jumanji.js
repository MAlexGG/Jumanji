let canvas= document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let x = canvas.width/2;
let y = canvas.height-40;
let dx = 2;
let dy = -2;
let ballRadius = 10;
let PalaHeight= 10;
let PalaWidth= 75;
let PalaX= (canvas.width-PalaWidth)/2;
let PalaY= (canvas.height-PalaHeight)-30;
let rightPressed = false;
let leftPressed = false;
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickTop = 30;
let brickLeft = 30; 

let bricks = [];
for(c=0; c<brickColumnCount; c++){
    bricks[c] =  [];
    for(r=0; r<brickRowCount; r++) {
        bricks [c][r] = {x: 0, y: 0};
    }
}

document.addEventListener("keydown", KeyDownHandler, false);
document.addEventListener("keyup" , KeyUpHandler, false);

function KeyDownHandler (e) {


    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function KeyUpHandler (e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
}


function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "greenyellow";
    ctx.fill();
    ctx.closePath();
}

function drawPala() {
    ctx.beginPath();
    ctx.rect(PalaX, PalaY , PalaWidth, PalaHeight);
    ctx.fillStyle= "white";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            let brickX = (c*(brickWidth+brickPadding))+brickLeft;
            let brickY = (r*(brickHeight+brickPadding))+brickTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "orange";
            ctx.fill();
            ctx.closePath();
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawBall();
    drawPala();
    drawBricks();

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius){
        dx = -dx;
    }

    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height-40) {
        if(x > PalaX && x < PalaX + PalaWidth) {
            dy = -dy;
        }
        else {
            alert("GAME OVER");
            document.location.reload();
        }
    }
    

    if (rightPressed && PalaX < canvas.width-PalaWidth) {
        PalaX += 7;
    }

    else if (leftPressed && PalaX > 0) {
        PalaX -= 7;
    }


    x += dx;
    y += dy; 

}



setInterval(draw, 10);

