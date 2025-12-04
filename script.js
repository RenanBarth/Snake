// ===============================
// VARIÁVEIS INICIAIS
// ===============================
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const box = 20;

let snake;
let direction;
let score;
let food;
let intervalo;

// ===============================
// FUNÇÃO DE REINÍCIO
// ===============================
function resetGame() {
    snake = [{ x: 200, y: 200 }];
    direction = "right";
    score = 0;
    document.getElementById("score").innerText = "Pontuação: 0";

    food = gerarComida();

    clearInterval(intervalo);
    intervalo = setInterval(gameLoop, parseInt(document.getElementById("velocidade").value));
}

// ===============================
// GERA COMIDA ALEATÓRIA
// ===============================
function gerarComida() {
    return {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };
}

// ===============================
// EVENTOS DE TECLAS
// ===============================
document.addEventListener("keydown", e => {
    if ((e.key === "ArrowUp" || e.key === "w") && direction !== "down") direction = "up";
    if ((e.key === "ArrowDown" || e.key === "s") && direction !== "up") direction = "down";
    if ((e.key === "ArrowLeft" || e.key === "a") && direction !== "right") direction = "left";
    if ((e.key === "ArrowRight" || e.key === "d") && direction !== "left") direction = "right";
});

// Atualizar velocidade automaticamente
document.getElementById("velocidade").addEventListener("change", () => {
    clearInterval(intervalo);
    intervalo = setInterval(gameLoop, parseInt(document.getElementById("velocidade").value));
});

// ===============================
// LOOP PRINCIPAL DO JOGO
// ===============================
function gameLoop() {
    ctx.clearRect(0, 0, 400, 400);

    // desenha comida
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // move a cabeça
    let head = { ...snake[0] };
    if (direction === "right") head.x += box;
    if (direction === "left") head.x -= box;
    if (direction === "up") head.y -= box;
    if (direction === "down") head.y += box;

    // modo infinito
    let modo = document.getElementById("modo").value;
    if (modo === "infinito") {
        if (head.x < 0) head.x = 380;
        if (head.x > 380) head.x = 0;
        if (head.y < 0) head.y = 380;
        if (head.y > 380) head.y = 0;
    } else {
        if (head.x < 0 || head.x > 380 || head.y < 0 || head.y > 380) {
            return gameOver();
        }
    }

    // colisão com corpo
    for (let part of snake) {
        if (head.x === part.x && head.y === part.y) {
            return gameOver();
        }
    }

    snake.unshift(head);

    // comer comida
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById("score").innerText = "Pontuação: " + score;
        food = gerarComida();
    } else {
        snake.pop();
    }

    // desenha a cobra com a skin escolhida
    ctx.fillStyle = document.getElementById("skin").value;
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, box, box);
    });
}

// ===============================
// GAME OVER
// ===============================
function gameOver() {
    alert("💀 Fim de jogo!\nPontuação final: " + score);
    resetGame();
}

// ===============================
// INICIAR O JOGO
// ===============================
resetGame();
