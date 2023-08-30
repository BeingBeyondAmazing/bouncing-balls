let counter = -1;
let hasShot = false;

let ballArea = document.querySelector(".ball-area");
ballArea.addEventListener("mousedown", createball);
ballArea.addEventListener("mouseup", shootball)

let bs = []
for(let i = 0; i<10; i++){
    bs[i] = {x:0, y:0, w:40, h:40, velX: 0, velY: 0};
}


const balls = [];
for(let i = 0; i<10; i++){
    const ball = document.createElement("div")
    ball.className = "ball";
    balls[i] = ball;
    ballArea.appendChild(balls[i]);
}



function createball(event){
    counter++;
    hasShot = false;
    bs[counter].x = event.clientX;
    bs[counter].y = event.clientY;
    bs[counter].velX = 0;
    bs[counter].velY = 0;
    balls[counter].style.width = `${bs[counter].w}px`;
    balls[counter].style.height =`${bs[counter].h}px`;
    balls[counter].style.left = `${bs[counter].x-(bs[counter].w/2)}px`;
    balls[counter].style.top = `${bs[counter].y-(bs[counter].h/2)}px`;
}

function shootball(event){
    hasShot = true;
    bs[counter].velX = ((bs[counter].x - event.clientX)/50);
    bs[counter].velY = ((bs[counter].y - event.clientY)/50); 
}

let interval = setInterval(function(){
    for(let i = 0; i<counter; i++){
        if(hasShot){
            bs[i].velY += .05;
        }
        if(bs[i].x - bs[i].w/2 <= 0 || bs[i].x + bs[i].w/2 >= window.innerWidth){
            bs[i].velX *= -1;
        }
        if(bs[i].y - bs[i].h/2 <= window.innerHeight - ballArea.offsetHeight
        || bs[i].y + bs[i].h/2 >= window.innerHeight){
            bs[i].velY *= -1;
        }
        bs[i].x = bs[i].x + bs[i].velX;
        bs[i].y = bs[i].y + bs[i].velY;
        balls[i].style.left = `${Math.round(bs[i].x-(bs[i].w/2))}px`;
        balls[i].style.top = `${Math.round(bs[i].y-(bs[i].h/2))}px`;
}
}, 5);