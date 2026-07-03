const pacman_open = new Image();
pacman_open.src = 'assets/svg/pacman_open.svg';
const pacman_closed = new Image();
pacman_closed.src = 'assets/svg/pacman_closed.svg';

export const pacman = {
    posicionX: 2,
    posicionY: 1,
    direccionActual: '',
    direccionSiguiente: '',
    velocidad: 0.05,

    dibujar: function (ctx, blink, tamañoCelda) {
        if (blink) {
            ctx.drawImage(pacman_open, this.posicionX * tamañoCelda, this.posicionY * tamañoCelda, tamañoCelda, tamañoCelda);
        } else {
            ctx.drawImage(pacman_closed, this.posicionX * tamañoCelda, this.posicionY * tamañoCelda, tamañoCelda, tamañoCelda);
        }
    },

    mover: function (mapa) {

        const diferenciaX = Math.abs(this.posicionX - Math.round(this.posicionX));
        const diferenciaY = Math.abs(this.posicionY - Math.round(this.posicionY));
        if (diferenciaX < 0.01) {
            this.posicionX = Math.round(this.posicionX);
        }
        if (diferenciaY < 0.01) {
            this.posicionY = Math.round(this.posicionY);
        }

        switch (this.direccionSiguiente) {
            case 'arriba':
                const filaEntranteArriba = Math.floor(this.posicionY - this.velocidad)
                const columnaEntranteArriba = Math.round(this.posicionX)
                if ((mapa[filaEntranteArriba][columnaEntranteArriba] != 1) && (this.posicionX % 1 == 0)) {
                    this.direccionActual = 'arriba';
                }
                break;
            case 'abajo':
                const filaEntranteAbajo = Math.ceil(this.posicionY + this.velocidad)
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
                    console.log('cambia a izquierda');
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
                const filaEntranteArriba = Math.floor(this.posicionY - this.velocidad)
                const columnaEntranteArriba = Math.round(this.posicionX)
                if (mapa[filaEntranteArriba][columnaEntranteArriba] != 1) {
                    this.posicionY -= this.velocidad;
                }
                break;
            case 'abajo':
                const filaEntranteAbajo = Math.ceil(this.posicionY + this.velocidad)
                const columnaEntranteAbajo = Math.round(this.posicionX)
                if (mapa[filaEntranteAbajo][columnaEntranteAbajo] != 1) {
                    this.posicionY += this.velocidad;
                }
                break;
            case 'izquierda':
                const filaEntranteIzquierda = Math.round(this.posicionY)
                const columnaEntranteIzquierda = Math.floor((this.posicionX - this.velocidad) + 0.001);
                if (mapa[filaEntranteIzquierda][columnaEntranteIzquierda] != 1) {
                    this.posicionX -= this.velocidad;
                }
                break;
            case 'derecha':
                const filaEntranteDerecha = Math.round(this.posicionY)
                const columnaEntranteDerecha = Math.ceil((this.posicionX + this.velocidad) - 0.001);
                if (mapa[filaEntranteDerecha][columnaEntranteDerecha] != 1) {
                    this.posicionX += this.velocidad;
                }
                break;
        }
    }
}
