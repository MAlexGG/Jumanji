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
let score = 0;
let lives = 3;

let bricks = [];
for(c=0; c<brickColumnCount; c++){
    bricks[c] =  [];
    for(r=0; r<brickRowCount; r++) {
        bricks [c][r] = {x: 0, y: 0, status: 1};
    }
}

document.addEventListener("keydown", KeyDownHandler, false);
document.addEventListener("keyup" , KeyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        PalaX = relativeX - PalaWidth/2;
    }
}

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
            if(bricks[c][r].status == 1) {
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
}

function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++){
            let b= bricks[c][r];
            if(b.status == 1){
                if (x>b.x && x<b.x+brickWidth && y>b.y && y<b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount*brickColumnCount){
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
                }
            }

        }
    }
}

function drawScore() {
    ctx.font = "14px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: "+score, 8, 20);
}

function drawLives(){
    ctx.font = "14px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawBall();
    drawPala();
    drawScore();
    drawLives();
    drawBricks();
    collisionDetection();
    

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
           lives--;
           if(!lives){
               alert("GAME OVER");
               document.location.reload();
           }
           else{
               x = canvas.width/2;
               y = canvas.height-40;
               dx = 2;
               dy = -2;
               PalaX = (canvas.width-PalaWidth)/2
           }
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
    requestAnimationFrame(draw);

}

draw();




