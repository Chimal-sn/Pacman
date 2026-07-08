const pacman_open = new Image();
pacman_open.src = 'assets/svg/pacman_open.svg';
const pacman_closed = new Image();
pacman_closed.src = 'assets/svg/pacman_closed.svg';

export const pacman = {
    posicionX: 9,
    posicionY: 16,
    direccionActual: '',
    direccionSiguiente: '',
    velocidad: 0.1,
    puntaje: 0,
    anguloBoca: 0,
    pastillaGrande: false,
    vidas: 3,

    dibujar: function (ctx, blink, tamañoCelda) {
        if (blink) {
            ctx.save();
            ctx.translate(this.posicionX * tamañoCelda + tamañoCelda / 2, this.posicionY * tamañoCelda + tamañoCelda / 2);
            ctx.rotate(this.anguloBoca);
            ctx.drawImage(pacman_open, -tamañoCelda / 2, -tamañoCelda / 2, tamañoCelda, tamañoCelda);
            ctx.restore();
        } else {
            ctx.save();
            ctx.translate(this.posicionX * tamañoCelda + tamañoCelda / 2, this.posicionY * tamañoCelda + tamañoCelda / 2);
            ctx.rotate(this.anguloBoca);
            ctx.drawImage(pacman_closed, -tamañoCelda / 2, -tamañoCelda / 2, tamañoCelda, tamañoCelda);
            ctx.restore();
        }
    },

    mover: function (mapa, marcador) {

        //Detectar si pacman sale de los limites del mapa
        if (this.posicionX < 0) this.posicionX = mapa[0].length - 1;
        if (this.posicionX > mapa[0].length - 1) this.posicionX = 0;

        const diferenciaX = Math.abs(this.posicionX - Math.round(this.posicionX));
        const diferenciaY = Math.abs(this.posicionY - Math.round(this.posicionY));
        if (diferenciaX < 0.01) {
            this.posicionX = Math.round(this.posicionX);
        }
        if (diferenciaY < 0.01) {
            this.posicionY = Math.round(this.posicionY);
        }

        this.comer(mapa, marcador);

        switch (this.direccionSiguiente) {
            case 'arriba':
                const filaEntranteArriba = Math.floor((this.posicionY - this.velocidad) + 0.001)
                const columnaEntranteArriba = Math.round(this.posicionX)
                if ((mapa[filaEntranteArriba][columnaEntranteArriba] != 1) && (this.posicionX % 1 == 0)) {
                    this.direccionActual = 'arriba';
                }
                break;
            case 'abajo':
                const filaEntranteAbajo = Math.ceil((this.posicionY + this.velocidad) - 0.001)
                const columnaEntranteAbajo = Math.round(this.posicionX)
                if ((mapa[filaEntranteAbajo][columnaEntranteAbajo] != 1) && (this.posicionX % 1 == 0)) {
                    this.direccionActual = 'abajo';
                }
                break;
            case 'izquierda':
                const filaEntranteIzquierda = Math.round(this.posicionY)
                const columnaEntranteIzquierda = Math.floor((this.posicionX - this.velocidad) + 0.001);
                if (mapa[filaEntranteIzquierda][columnaEntranteIzquierda] != 1 && (this.posicionY % 1 == 0)) {
                    this.direccionActual = 'izquierda';
                }
                break;
            case 'derecha':
                const filaEntranteDerecha = Math.round(this.posicionY)
                const columnaEntranteDerecha = Math.ceil((this.posicionX + this.velocidad) - 0.001);
                if (mapa[filaEntranteDerecha][columnaEntranteDerecha] != 1 && (this.posicionY % 1 == 0)) {
                    this.direccionActual = 'derecha';
                }
                break;
        }

        switch (this.direccionActual) {
            case 'arriba':
                const filaEntranteArriba = Math.floor((this.posicionY - this.velocidad) + 0.001)
                const columnaEntranteArriba = Math.round(this.posicionX)
                if (mapa[filaEntranteArriba][columnaEntranteArriba] != 1) {
                    this.posicionY -= this.velocidad;
                    this.anguloBoca = -Math.PI / 2;
                }
                break;
            case 'abajo':
                const filaEntranteAbajo = Math.ceil((this.posicionY + this.velocidad) - 0.001)
                const columnaEntranteAbajo = Math.round(this.posicionX)
                if (mapa[filaEntranteAbajo][columnaEntranteAbajo] != 1) {
                    this.posicionY += this.velocidad;
                    this.anguloBoca = Math.PI / 2;
                }
                break;
            case 'izquierda':
                const filaEntranteIzquierda = Math.round(this.posicionY)
                const columnaEntranteIzquierda = Math.floor((this.posicionX - this.velocidad) + 0.001);
                if (mapa[filaEntranteIzquierda][columnaEntranteIzquierda] != 1) {
                    this.posicionX -= this.velocidad;
                    this.anguloBoca = Math.PI;
                }
                break;
            case 'derecha':
                const filaEntranteDerecha = Math.round(this.posicionY)
                const columnaEntranteDerecha = Math.ceil((this.posicionX + this.velocidad) - 0.001);
                if (mapa[filaEntranteDerecha][columnaEntranteDerecha] != 1) {
                    this.posicionX += this.velocidad;
                    this.anguloBoca = 0;
                }
                break;
        }
    },

    comer: function (mapa, marcador) {
        const columna = Math.round(this.posicionX);
        const fila = Math.round(this.posicionY);
        switch (mapa[fila][columna]) {
            case 0:
                mapa[fila][columna] = 3;
                this.puntaje += 10;
                marcador.textContent = "Puntaje: " + this.puntaje;
                break;
            case 2:
                mapa[fila][columna] = 3;
                this.puntaje += 50;
                marcador.textContent = "Puntaje: " + this.puntaje;
                this.pastillaGrande = true;
                break;
        }
    }
}
