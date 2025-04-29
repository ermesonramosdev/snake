const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const size = 30;
const snake = [
    { x: 300, y: 300 },
    { x: 300, y: 330 },
    { x: 300, y: 360 },
    { x: 300, y: 390 },
    { x: 300, y: 420 }, 
    { x: 300, y: 450 },
    
];

let direction, loopId;


const drawSnake = () => {
    ctx.fillStyle = "#ddd"
    snake.forEach((element, index) => {
        if(index == snake.length - 1) {
            ctx.fillStyle = "white";
        } 
        ctx.fillRect(element.x, element.y, size, size);
    });
}

const moveSnake = () => {
    if(!direction) return;
    const head = snake[snake.length - 1];
    snake.shift();
    if(direction == "right") {
        snake.push({ x: head.x + size, y: head.y });
    }
    if(direction == "left") {
        snake.push({ x: head.x - size, y: head.y });
    }
    if(direction == "up") {
        snake.push({ x: head.x, y: head.y - size });
    }
    if(direction == "down") {
        snake.push({ x: head.x, y: head.y + size });
    }
}


document.addEventListener("keydown", ({key}) => {
    if(key === "ArrowRight" && direction !== "left") {
        direction = "right";
    }
    if(key === "ArrowLeft" && direction !== "right") {
        direction = "left";
    }
    if(key === "ArrowUp" && direction !== "down") {
        direction = "up"
    }
    if(key === "ArrowDown" && direction !== "up") {
        direction = "down"
    }
});

const gameLoop = () => {
    clearInterval(loopId)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    moveSnake();
    drawSnake();
    

    loopId = setTimeout(() => {
        gameLoop();
    }, 300);
}

gameLoop();
