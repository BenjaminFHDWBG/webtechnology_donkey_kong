// script.js

window.onload = function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const GAME_WIDTH = 800;
    const GAME_HEIGHT = 600;

    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;

    let player = {
        x: 50,
        y: GAME_HEIGHT - 50, // Start Y-Position direkt auf dem "Boden"
        width: 30,
        height: 50,
        color: 'blue',
        speed: 5,
        velocityY: 0,         // Vertikale Geschwindigkeit
        isJumping: false,
        jumpStrength: 15,     // Wie hoch der Spieler springt (negativer Wert für nach oben)
        gravity: 0.8          // Stärke der Gravitation
    };

    // Definiere ein "Bodenlevel". Für den Anfang ist das der untere Rand des Canvas.
    const groundLevel = GAME_HEIGHT - player.height;

    function draw() {
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        ctx.fillStyle = '#2a2a2a';
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    function update() {
        // Horizontale Bewegung und Randüberprüfung (wie zuvor)
        if (player.x < 0) {
            player.x = 0;
        }
        if (player.x + player.width > GAME_WIDTH) {
            player.x = GAME_WIDTH - player.width;
        }

        // Sprung- und Gravitationslogik
        if (player.isJumping || player.y < groundLevel) { // Solange der Spieler springt ODER in der Luft ist
            player.velocityY += player.gravity; // Gravitation auf vertikale Geschwindigkeit anwenden
            player.y += player.velocityY;       // Y-Position basierend auf vertikaler Geschwindigkeit ändern
        }

        // Auf dem Boden gelandet?
        if (player.y >= groundLevel) {
            player.y = groundLevel;         // Spieler exakt auf den Boden setzen
            player.velocityY = 0;           // Vertikale Geschwindigkeit stoppen
            player.isJumping = false;       // Sprung beenden (erlaubt neuen Sprung)
        }

        // Oberer Rand (verhindert, dass der Spieler oben aus dem Bild springt)
        if (player.y < 0) {
            player.y = 0;
            // Optional: Vertikale Geschwindigkeit umkehren für einen "Abprall" oder stoppen
            // player.velocityY = 0; // oder player.velocityY *= -0.5; (für einen leichten Abprall)
        }
    }

    function gameLoop() {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight') {
            player.x += player.speed;
        } else if (event.key === 'ArrowLeft') {
            player.x -= player.speed;
        } else if (event.key === 'ArrowUp') {
            // Springen nur, wenn der Spieler nicht bereits springt (also auf dem Boden ist)
            if (!player.isJumping && player.y === groundLevel) { // Überprüfe auch, ob er wirklich am Boden ist
                player.isJumping = true;
                player.velocityY = -player.jumpStrength; // Nach oben bewegen
            }
        }
    });

    gameLoop();
    console.log("Spiel initialisiert mit Sprungfunktion!");
};