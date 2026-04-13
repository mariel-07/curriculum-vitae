const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

// 🔥 AJUSTAR TAMAÑO
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// CARACTERES
const letras = "アァイィウヴエカキクケコサシスセソ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// CONFIG
const fontSize = 16;
let columnas = Math.floor(width / fontSize);
let gotas = Array(columnas).fill(1);

// 🔥 DIBUJAR
function dibujar() {
    // efecto desvanecido (trail)
    ctx.fillStyle = "rgba(0, 0, 0, 0.07)";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#00ff88"; // verde pro
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < gotas.length; i++) {
        const letra = letras.charAt(Math.floor(Math.random() * letras.length));

        ctx.fillText(letra, i * fontSize, gotas[i] * fontSize);

        // reinicio aleatorio
        if (gotas[i] * fontSize > height && Math.random() > 0.975) {
            gotas[i] = 0;
        }

        gotas[i]++;
    }
}

// 🔥 MEJOR QUE setInterval
function animar() {
    dibujar();
    requestAnimationFrame(animar);
}

animar();

// 🔥 RESPONSIVE REAL
window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    columnas = Math.floor(width / fontSize);
    gotas = Array(columnas).fill(1);
});
