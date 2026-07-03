import { pacman } from "./pacman.js";

const mapa = [
    [1, 1, 1, 1, 1],
    [1, 2, 0, 2, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1]
];

const canvas = document.getElementById('canvas-juego');
const ctx = canvas.getContext('2d');
const tamañoCelda = 24;
const numeroFilas = mapa.length;
const numeroColumnas = mapa[0].length;

canvas.width = numeroColumnas * tamañoCelda;
canvas.height = numeroFilas * tamañoCelda;

let blink = true;
let contadorFotogramas = 0;


function dibujarMapa() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let fila = 0; fila < numeroFilas; fila++) {
        for (let columna = 0; columna < numeroColumnas; columna++) {
            const tipo = mapa[fila][columna];
            let x = columna * tamañoCelda;
            let y = fila * tamañoCelda;
            const centroX = x + tamañoCelda / 2;
            const centroY = y + tamañoCelda / 2;
            const anguloInicio = 0;
            const anguloFin = Math.PI * 2;

            if (tipo == 1) {
                ctx.beginPath();
                ctx.fillStyle = '#0e0e96';
                ctx.fillRect(x, y, tamañoCelda, tamañoCelda);
                ctx.closePath();
            } else if (tipo == 0) {
                ctx.beginPath();
                const radio = 2.5;
                ctx.arc(centroX, centroY, radio, anguloInicio, anguloFin);
                ctx.fillStyle = '#ffff00';
                ctx.fill();
                ctx.closePath();
            } else if (tipo == 2) {
                if (blink) {
                    ctx.beginPath();
                    const radio = 4;
                    ctx.arc(centroX, centroY, radio, anguloInicio, anguloFin);
                    ctx.fillStyle = '#ffff00';
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
}

function animar() {
    contadorFotogramas += 1;
    if (contadorFotogramas == 20) {
        blink = !blink;
        contadorFotogramas = 0;
    }
    dibujarMapa();
    pacman.mover(mapa);
    pacman.dibujar(ctx, blink, tamañoCelda);
    requestAnimationFrame(animar);
}

animar();

window.addEventListener('keydown', (evento) => {
    if (evento.key === 'ArrowUp' || evento.key === 'W' || evento.key === 'w') {
        pacman.direccionSiguiente = 'arriba';
    }
    if (evento.key === 'ArrowDown' || evento.key === 'S' || evento.key === 's') {
        pacman.direccionSiguiente = 'abajo';
    }
    if (evento.key === 'ArrowLeft' || evento.key === 'A' || evento.key === 'a') {
        pacman.direccionSiguiente = 'izquierda';
    }
    if (evento.key === 'ArrowRight' || evento.key === 'D' || evento.key === 'd') {
        pacman.direccionSiguiente = 'derecha';
    }
})


