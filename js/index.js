const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const size = 30;
const snake = [ { x: 270, y: 270 } ];
const food = {
    x: 90,
    y: 90,
    color: "yellow"
}

let direction, loopId;



const drawFood = () => {
    const { x, y, color } = food;

    ctx.shadowColor = color;
    ctx.shadowBlur = 2;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
    ctx.stroke();
    
}



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

const drawGrid = () => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#191919";

    for(let i = size; i <= canvas.width; i += size) {
        ctx.beginPath();
        ctx.lineTo(i, 0);
        ctx.lineTo(i, 600);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineTo(0, i);
        ctx.lineTo(600, i);
        ctx.stroke();
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
        direction = "up";
    }
    if(key === "ArrowDown" && direction !== "up") {
        direction = "down";
    }
});

const gameLoop = () => {
    clearInterval(loopId)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawFood();
    drawGrid();
    moveSnake();
    drawSnake();
    

    loopId = setTimeout(() => {
        gameLoop();
    }, 300);
}
gameLoop();




