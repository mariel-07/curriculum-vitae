const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letras = "アァイィウヴエカキクケコサシスセソ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 16;
const columnas = canvas.width / fontSize;

const gotas = [];

for (let i = 0; i < columnas; i++) {
    gotas[i] = 1;
}

function dibujar() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff00";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < gotas.length; i++) {
        const texto = letras.charAt(Math.floor(Math.random() * letras.length));

        ctx.fillText(texto, i * fontSize, gotas[i] * fontSize);

        if (gotas[i] * fontSize > canvas.height && Math.random() > 0.975) {
            gotas[i] = 0;
        }

        gotas[i]++;
    }
}

setInterval(dibujar, 35);

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
