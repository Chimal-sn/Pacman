import { pacman } from "./pacman.js";
import { Blinky, Pinky, Clyde, Inky } from "./fantasma.js";

const mapaOriginal = [
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

let mapa = mapaOriginal.map(fila => [...fila]);

//0 = pastilla chica
//1 = muro
//2 = pastilal grande
//3 = Espacio libre
//4 = Entrada a la casa

const canvas = document.getElementById('canvas-juego');
const ctx = canvas.getContext('2d');
const tamañoCelda = 24;
const numeroFilas = mapa.length;
const numeroColumnas = mapa[0].length;
const tamañoPared = 22;
let colorPared = '#0e0e96';
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
                ctx.fillStyle = colorPared;

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
let estadoJuego = 'jugando';
let contadorMuerte = 0;
let contadorVictoria = 0;

setInterval(() => {
    if (modoFantasmas == 'asustado') {
        asustadoTime++;
        if (asustadoTime == 5) {
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

function verificarVictoria() {
    for (let fila = 0; fila < numeroFilas; fila++) {
        for (let columna = 0; columna < numeroColumnas; columna++) {
            if (mapa[fila][columna] == 2 || mapa[fila][columna] == 0) {
                return false;
            }
        }
    }
    return true;
}

function reiniciarPosiciones() {
    pacman.posicionX = 9;
    pacman.posicionY = 16;
    pacman.direccionActual = '';
    pacman.direccionSiguiente = '';

    const fantasmas = [blinky, pinky, clyde, inky];

    fantasmas.forEach(fantasma => {
        fantasma.posicionX = 8;
        fantasma.posicionY = 10;
        fantasma.direccionActual = 'izquierda';
        fantasma.direccionProhibida = '';
        fantasma.muerto = false;
        fantasma.velocidad = fantasma.velocidadOriginal;
    });

    blinky.retrasoSalida = 0;
    pinky.retrasoSalida = 180;
    clyde.retrasoSalida = 360;
    inky.retrasoSalida = 540;

    modoFantasmas = 'dispersar';
    modoFantasmaAnterior = '';
    asustadoTime = 0;
    contadorModo = 0;
    contadorMuerte = 0;
    contadorFotogramas = 0;
}

function reiniciarJuego() {
    mapa = mapaOriginal.map(fila => [...fila]);
    reiniciarPosiciones();
    estadoJuego = 'jugando';
    pacman.puntaje = 0;
    pacman.vidas = 3;
    marcador.textContent = 'Puntaje 0';
}

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
                estadoJuego = 'muriendo';
            }
        }
    }
}

function animar(timestamp) {
    requestAnimationFrame(animar);
    if (!timestamp) timestamp = performance.now();
    const tiempoTranscurrido = timestamp - ultimoTiempo;
    if (tiempoTranscurrido >= intervaloFps) {
        ultimoTiempo = timestamp - (tiempoTranscurrido % intervaloFps);
        contadorFotogramas += 1;

        if (estadoJuego == 'jugando') {
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

            verificarColisiones();

            if (verificarVictoria()) {
                estadoJuego = 'victoria';
                contadorVictoria = 0;
                pacman.direccionActual = '';
                pacman.direccionSiguiente = '';
            }

        } else if (estadoJuego == 'muriendo') {
            contadorMuerte++;
            dibujarMapa();

            if (contadorMuerte < 40) {
                pacman.dibujar(ctx, blink, tamañoCelda);
                blinky.dibujar(ctx, tamañoCelda, modoFantasmas);
                pinky.dibujar(ctx, tamañoCelda, modoFantasmas);
                clyde.dibujar(ctx, tamañoCelda, modoFantasmas);
                inky.dibujar(ctx, tamañoCelda, modoFantasmas);

            } else if (contadorMuerte >= 40 && contadorMuerte < 130) {
                let frameMuerte = Math.floor((contadorMuerte - 40) / 10);
                pacman.dibujarMuerte(ctx, frameMuerte, tamañoCelda);
            } else if (contadorMuerte >= 130) {
                if (pacman.vidas > 0) {
                    pacman.vidas--;
                    console.log(pacman.vidas)
                    reiniciarPosiciones();
                    estadoJuego = 'jugando';
                } else {
                    estadoJuego = 'gameOver';
                }
            }
        } else if (estadoJuego == 'gameOver') {
            dibujarMapa();
            ctx.font = '24px "prstar2p"';
            ctx.fillStyle = 'red';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
        } else if (estadoJuego == 'victoria') {

            if (Math.floor(contadorVictoria / 15) % 2 == 0) {
                colorPared = '#fff';
            } else {
                colorPared = '#0e0e96';
            }

            dibujarMapa();
            pacman.dibujar(ctx, blink, tamañoCelda);

            pinky.dibujar(ctx, tamañoCelda, modoFantasmas);
            clyde.dibujar(ctx, tamañoCelda, modoFantasmas);
            inky.dibujar(ctx, tamañoCelda, modoFantasmas);
            blinky.dibujar(ctx, tamañoCelda, modoFantasmas);

            contadorVictoria++;

            if (contadorVictoria >= 50 && contadorVictoria < 200) {
                ctx.font = '24px "prstar2p"';
                ctx.fillStyle = 'yellow';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('YOU WIN!', canvas.width / 2, canvas.height / 2);
            } else if (contadorVictoria == 200) {
                reiniciarJuego();
            }
        }
    }
}

animar();

//Detectar movimiento del teclado
window.addEventListener('keydown', (evento) => {

    if (estadoJuego == 'gameOver') {
        reiniciarJuego();
        return;
    }
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

    if (estadoJuego == 'gameOver') {
        reiniciarJuego();
        return;
    }

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

