const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const score = document.querySelector(".score--value");
const finalScore = document.querySelector(".final-score > span");
const menu = document.querySelector(".menu-screen");
const buttonPlay = document.querySelector(".btn-play");
const size = 30;
const initialPosition = { x: 270, y: 270 };
let snake = [initialPosition];
const audio = new Audio("../assets/audio.mp3");
let direction, loopId;

const incrementScore = () => {
    score.innerText = +score.innerText + 10;
}
const randomNumber = (max, min) => {
    return Math.floor(Math.random() * (max - min)) + min;
}
const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size);
    return Math.round(number / 30) * 30;
}
const randomColor = () => {
    const red = randomNumber(0, 255);
    const green = randomNumber(0, 255);
    const blue = randomNumber(0, 255);
    return `rgb(${red}, ${green}, ${blue})`;
}
const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: randomColor()
}
const drawFood = () => {
    const { x, y, color } = food;

    ctx.shadowColor = color;
    ctx.shadowBlur = 6;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
    ctx.stroke();
    ctx.shadowBlur = 0;
    
}
const drawSnake = () => {
    ctx.fillStyle = "#ddd";
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
const checkEat = () => {
    const head = snake[snake.length - 1];
    if(head.x === food.x && head.y === food.y) {
        snake.push({...head});
        audio.play();
        incrementScore();
        let x = randomPosition();
        let y = randomPosition();
        while(snake.find((position) => position.x == x && position.y == y )) {
            x = randomPosition();
            y = randomPosition();
        }
        food.x = x;
        food.y = y;
        food.color = randomColor();
    }
}
const checkCollision = () => {
    const head = snake[snake.length - 1];
    const canvasLimit = canvas.width - size;
    const wallCollision = head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit;
    const selfCollision = snake.length > 4 && snake.slice(0, -1).some(position => {
        return position.x === head.x && position.y === head.y;
    })

    if(wallCollision || selfCollision) { 
        gameOver(); 
    }
}
const gameOver = () => {
    direction = undefined;
    menu.style.display = "flex";
    finalScore.innerText = score.textContent;
    canvas.style.filter = "blur(2px)"
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    moveSnake();
    checkCollision();
    checkEat();
    drawGrid();
    drawFood();
    drawSnake();
    
    loopId = setTimeout(() => {
        gameLoop();
    }, 300);
}
gameLoop();
buttonPlay.addEventListener("click", () => {
    score.innerText = "00";
    menu.style.display = "none";
    canvas.style.filter = "none";
    snake = [initialPosition];
});



