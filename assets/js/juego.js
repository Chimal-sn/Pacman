import { pacman } from "./pacman.js";
import { Blinky, Pinky, Clyde, Inky } from "./fantasma.js";

const mapa = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 3, 1, 3, 1, 1, 1, 0, 1, 1, 1, 1],
    [3, 3, 3, 1, 0, 1, 3, 3, 3, 3, 3, 3, 3, 1, 0, 1, 3, 3, 3],
    [1, 1, 1, 1, 0, 1, 3, 1, 1, 4, 1, 1, 3, 1, 0, 1, 1, 1, 1],
    [3, 3, 3, 3, 0, 3, 3, 1, 3, 3, 3, 1, 3, 3, 0, 3, 3, 3, 3],
    [1, 1, 1, 1, 0, 1, 3, 1, 1, 1, 1, 1, 3, 1, 0, 1, 1, 1, 1],
    [3, 3, 3, 1, 0, 1, 3, 3, 3, 3, 3, 3, 3, 1, 0, 1, 3, 3, 3],
    [1, 1, 1, 1, 0, 1, 3, 1, 1, 1, 1, 1, 3, 1, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 2, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 2, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];



//1 = muro
//0 = pastilla chica
//2 = pastilal grande
//3 = Espacio libre
//4 = Entrada a la casa

const canvas = document.getElementById('canvas-juego');
const ctx = canvas.getContext('2d');
const tamañoCelda = 24;
const numeroFilas = mapa.length;
const numeroColumnas = mapa[0].length;
const tamañoPared = 22;

canvas.width = numeroColumnas * tamañoCelda;
canvas.height = numeroFilas * tamañoCelda;

let blink = true;
let contadorFotogramas = 0;

const marcador = document.getElementById('marcador');

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
                const grosor = 10;
                ctx.beginPath();
                ctx.fillStyle = '#0e0e96';

                // Dibujar el bloque del centro de la celda
                ctx.fillRect(centroX - grosor / 2, centroY - grosor / 2, grosor, grosor);

                // Si hay pared arriba, estirar brazo hacia arriba
                if (fila > 0 && mapa[fila - 1][columna] == 1) {
                    ctx.fillRect(centroX - grosor / 2, y, grosor, tamañoCelda / 2);
                }
                // Si hay pared abajo, estirar brazo hacia abajo
                if (fila < numeroFilas - 1 && mapa[fila + 1][columna] == 1) {
                    ctx.fillRect(centroX - grosor / 2, centroY, grosor, tamañoCelda / 2);
                }
                // Si hay pared a la izquierda, estirar brazo a la izquierda
                if (columna > 0 && mapa[fila][columna - 1] == 1) {
                    ctx.fillRect(x, centroY - grosor / 2, tamañoCelda / 2, grosor);
                }
                // Si hay pared a la derecha, estirar brazo a la derecha
                if (columna < numeroColumnas - 1 && mapa[fila][columna + 1] == 1) {
                    ctx.fillRect(centroX, centroY - grosor / 2, tamañoCelda / 2, grosor);
                }
                ctx.closePath();
            } else if (tipo == 0) {
                ctx.beginPath();
                const radio = 2.5;
                ctx.arc(centroX, centroY, radio, anguloInicio, anguloFin);
                ctx.fillStyle = '#FFB7AE';
                ctx.fill();
                ctx.closePath();
            } else if (tipo == 2) {
                if (blink) {
                    ctx.beginPath();
                    const radio = 4;
                    ctx.arc(centroX, centroY, radio, anguloInicio, anguloFin);
                    ctx.fillStyle = '#FFB7AE';
                    ctx.fill();
                    ctx.closePath();
                }
            } else if (tipo == 4) {
                const grosor = 10;
                ctx.beginPath();
                ctx.fillStyle = '#b2bbbeff';

                // Dibujar el bloque del centro de la celda
                ctx.fillRect(centroX - grosor / 2, centroY - grosor / 2, grosor, grosor);

                if (columna > 0 && mapa[fila][columna - 1] == 1) {
                    ctx.fillRect(x, centroY - grosor / 2, tamañoCelda / 2, grosor);
                }
                // Si hay pared a la derecha, estirar brazo a la derecha
                if (columna < numeroColumnas - 1 && mapa[fila][columna + 1] == 1) {
                    ctx.fillRect(centroX, centroY - grosor / 2, tamañoCelda / 2, grosor);
                }
                ctx.closePath();
            }
        }
    }
}

let ultimoTiempo = 0;
const fpsObjetivo = 60;
const intervaloFps = 1000 / fpsObjetivo;


let modoFantasmas = 'dispersar';
let modoFantasmaAnterior = '';
let asustadoTime = 0;
let contadorModo = 0;

setInterval(() => {
    if (modoFantasmas == 'asustado') {
        asustadoTime++;
        if (asustadoTime == 7) {
            modoFantasmas = modoFantasmaAnterior;
            asustadoTime = 0;
        }
    } else {
        contadorModo++;
        if (modoFantasmas == 'dispersar' && contadorModo == 7) {
            modoFantasmas = 'caza';
            contadorModo = 0;
        }
        if (modoFantasmas == 'caza' && contadorModo == 15) {
            modoFantasmas = 'dispersar';
            contadorModo = 0;
        }
    }

}, 1000);


//Fantasma blinky
const blinky = new Blinky(8, 10, 0.08, 0);
//Fantasma pinky
const pinky = new Pinky(8, 10, 0.08, 180);
//Fantasma clyde
const clyde = new Clyde(8, 10, 0.08, 360);
//Fantasma inky
const inky = new Inky(8, 10, 0.08, 540);

function verificarColisiones() {
    const fantasmas = [blinky, pinky, clyde, inky];

    for (let fantasma of fantasmas) {
        if (fantasma.muerto) continue;
        const distanciaX = Math.abs(fantasma.posicionX - pacman.posicionX);
        const distanciaY = Math.abs(fantasma.posicionY - pacman.posicionY);
        const distanciaMinima = 0.5;
        if (distanciaX <= distanciaMinima && distanciaY <= distanciaMinima) {

            if (modoFantasmas == 'asustado') {
                fantasma.muerto = true;
            } else {
                if (pacman.vidas > 0) {
                    pacman.vidas--;
                }
            }
        }
    }
}

function animar(timestamp) {
    requestAnimationFrame(animar);
    verificarColisiones();
    if (!timestamp) timestamp = performance.now();
    const tiempoTranscurrido = timestamp - ultimoTiempo;
    if (tiempoTranscurrido >= intervaloFps) {
        ultimoTiempo = timestamp - (tiempoTranscurrido % intervaloFps);
        contadorFotogramas += 1;
        if (contadorFotogramas == 20) {
            blink = !blink;
            contadorFotogramas = 0;
        }

        if (pacman.pastillaGrande) {
            asustadoTime = 0;
            if (modoFantasmas != 'asustado') {
                modoFantasmaAnterior = modoFantasmas;
            }
            modoFantasmas = 'asustado';
            pacman.pastillaGrande = false;

        }
        dibujarMapa();

        //Pacman
        pacman.mover(mapa, marcador);
        pacman.dibujar(ctx, blink, tamañoCelda);

        //Fantasma blinky
        blinky.mover(mapa, pacman, null, modoFantasmas);
        blinky.dibujar(ctx, tamañoCelda, modoFantasmas);

        //Fantasma pinky
        pinky.mover(mapa, pacman, null, modoFantasmas);
        pinky.dibujar(ctx, tamañoCelda, modoFantasmas);

        //Fantasma clyde
        clyde.mover(mapa, pacman, null, modoFantasmas);
        clyde.dibujar(ctx, tamañoCelda, modoFantasmas);

        //Fantasma inky
        inky.mover(mapa, pacman, blinky, modoFantasmas);
        inky.dibujar(ctx, tamañoCelda, modoFantasmas);

    }

}

animar();

//Detectar movimiento del teclado
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

//Detectar touch en los celulares

let touchStartX = 0;
let touchStartY = 0;

window.addEventListener('touchstart', (evento) => {
    evento.preventDefault();
    touchStartX = evento.touches[0].clientX;
    touchStartY = evento.touches[0].clientY;
}, { passive: false });

window.addEventListener('touchend', (evento) => {
    evento.preventDefault();

    const touchEndX = evento.changedTouches[0].clientX;
    const touchEndY = evento.changedTouches[0].clientY;

    const diferenciaX = touchEndX - touchStartX;
    const diferenciaY = touchEndY - touchStartY;

    const limiteDeslizamiento = 30;

    if (Math.abs(diferenciaX) > Math.abs(diferenciaY) && Math.abs(diferenciaX) > limiteDeslizamiento) {
        if (diferenciaX > 0) {
            pacman.direccionSiguiente = 'derecha';
        } else {
            pacman.direccionSiguiente = 'izquierda';
        }
    } else if (Math.abs(diferenciaY) > Math.abs(diferenciaX) && Math.abs(diferenciaY) > limiteDeslizamiento) {
        if (diferenciaY > 0) {
            pacman.direccionSiguiente = 'abajo';
        } else {
            pacman.direccionSiguiente = 'arriba';
        }
    }
}, { passive: false });

window.addEventListener('touchmove', (evento) => {
    evento.preventDefault();
}, { passive: false });

