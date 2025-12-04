function resetGame() {
    snake = [{ x: 200, y: 200 }];  // cobra volta ao tamanho inicial
    direction = "right";           // direção inicial
    score = 0;                     // zera pontuação
    document.getElementById("score").innerText = "Pontuação: 0";

    food = gerarComida();          // gera nova comida

    // reinicia velocidade escolhida
    clearInterval(intervalo);
    intervalo = setInterval(gameLoop, parseInt(document.getElementById("velocidade").value));
}
function gameOver() {
    alert("💀 Fim de jogo!\nPontuação final: " + score);
    resetGame();
}
<button onclick="resetGame()">🔁 Reiniciar</button>
