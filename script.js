let ballArea = document.querySelector(".ball-area");
ballArea.addEventListener("mousedown", createBall);
ballArea.addEventListener("mouseup", shootBall)

const ball = document.querySelector(".ball");
const b = {x:0, y:0, w:40, h:40, velX: 0, velY: 0}
ball.style.width = `${b.w}px`;
ball.style.height =`${b.h}px`;
ball.style.left = `${b.x}px`;
ball.style.top = `${b.y}px`;


function createBall(event){
    b.x = event.clientX;
    b.y = event.clientY;
    b.velX = 0;
    b.velY = 0;
    ball.style.left = `${b.x-(b.w/2)}px`;
    ball.style.top = `${b.y-(b.h/2)}px`;
}

function shootBall(event){
    b.velX = ((b.x - event.clientX)/100);
    b.velY = ((b.y - event.clientY)/100); 
    console.log("X Velocity: " + b.velX);
    console.log("Y Velocity: " + b.velY);
    let interval = setInterval(function(){
        if(b.x - b.w/2 <= 0 || b.x + b.w/2 >= window.innerWidth){
            b.velX *= -1;
        }
        if(b.y - b.h/2 <= window.innerHeight - ballArea.offsetHeight
         || b.y + b.h/2 >= window.innerHeight){
            b.velY *= -1;
        }
        b.x = b.x + b.velX;
        b.y = b.y + b.velY;
        ball.style.left = `${Math.round(b.x-(b.w/2))}px`;
        ball.style.top = `${Math.round(b.y-(b.h/2))}px`;
    }, 10);
}