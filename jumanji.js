let canvas= document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = 4;
let ballRadius = 10;
let PalaHeight= 10;
let PalaWidth= 75;
let PalaX= (canvas.width-PalaWidth)/2;
let rightPressed = false;
let leftPressed = false;

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
    ctx.rect(PalaX, canvas.height-PalaHeight-30 , PalaWidth, PalaHeight);
    ctx.fillStyle= "white";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawBall();
    drawPala();
   

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius){
        dx = -dx;
    }
    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius){
        dy= -dy;
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

