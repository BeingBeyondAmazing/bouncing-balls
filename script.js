let m = -1; //counter for which ball
let hasShot = false;
let balls;
let bs;

let ballArea = document.querySelector(".ball-area");
ballArea.addEventListener("mousedown", createball);
ballArea.addEventListener("mouseup", shootball)
balls = createBalls(balls);
bs = createBs(balls);

function createBs(bs){
    bs = [];
    for(let i = 0; i<10; i++){
        bs[i] = {x:0, y:0, w:40, h:40, velX: 0, velY: 0};
    }
    return bs;
}

function createBalls(balls){
    balls = [];
    while(ballArea.firstChild){
        ballArea.removeChild(ballArea.firstChild)
    }
    for(let i = 0; i<10; i++){
        const ball = document.createElement("div")
        ball.className = "ball";
        balls[i] = ball;
        balls[i].style.left = "0px";
        balls[i].style.top = "0px";

        ballArea.appendChild(balls[i]);
    }
    return balls;
}

function createball(event){
    if(m === 9){
        createBalls(balls);
        createBs(bs);
        ballArea.textContent = "TOO MANY BALLS"
        m= -1;
        return;
    }
    m++;
    hasShot = false;
        bs[m].x = event.clientX;
        bs[m].y = event.clientY;
        bs[m].velX = 0;
        bs[m].velY = 0;
        balls[m].style.width = `${bs[m].w}px`;
        balls[m].style.height =`${bs[m].h}px`;
        balls[m].style.left = `${bs[m].x-(bs[m].w/2)}px`;
        balls[m].style.top = `${bs[m].y-(bs[m].h/2)}px`;
}

function shootball(event){
    if(m === -1){
        return;
    }
    hasShot = true;
    bs[m].velX = ((bs[m].x - event.clientX)/50);
    bs[m].velY = ((bs[m].y - event.clientY)/50); 
}

let interval = setInterval(function(){
    for(let i = 0; i<=m; i++){
        if(hasShot){
            bs[i].velY += .05;
        }
        if(bs[i].x - bs[i].w/2 <= 0 || bs[i].x + bs[i].w/2 >= window.innerWidth){
            bs[i].velX *= -.9;
        }
        if(bs[i].y - bs[i].h/2 <= window.innerHeight - ballArea.offsetHeight
        || bs[i].y + bs[i].h/2 >= window.innerHeight){
            bs[i].velY *= -.9;
            if(bs[i].y - bs[i].h/2<= window.innerHeight - ballArea.offsetHeight){
                bs[i].y = window.innerHeight - ballArea.offsetHeight + bs[i].h/2;
            }
            if(bs[i].y + bs[i].h/2 >= window.innerHeight){
                bs[i].y = window.innerHeight - bs[i].h/2;
            }
        }
        bs[i].x = bs[i].x + bs[i].velX;
        bs[i].y = bs[i].y + bs[i].velY;
        balls[i].style.left = `${Math.round(bs[i].x-(bs[i].w/2))}px`;
        balls[i].style.top = `${Math.round(bs[i].y-(bs[i].h/2))}px`;
}
}, 5);