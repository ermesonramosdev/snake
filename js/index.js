const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const size = 30
const snake = [
    { x: 300, y: 300 },
    { x: 300, y: 330 },
    { x: 300, y: 360 },
    { x: 300, y: 390 },
    { x: 300, y: 420 }, 
    { x: 300, y: 450 },
    
]

const drawSnake = () => {
    snake.forEach((element, index) => {
        if(index === snake.length - 1) {
            ctx.fillStyle = "gray";
        } else {
            ctx.fillStyle = "white";
        }
        ctx.fillRect(element.x, element.y, size, size);
    });
}

drawSnake();
