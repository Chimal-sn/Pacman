export class Fantasma {
    constructor(x, y, velocidad, rutaImagen) {
        this.posicionX = x;
        this.posicionY = y;
        this.velocidad = velocidad;
        this.direccionActual = 'izquierda';
        this.direccionSiguiente = 'izquierda';

        // Cargamos la imagen correspondiente
        this.imagen = new Image();
        this.imagen.src = rutaImagen;
    }

    dibujar(ctx, tamañoCelda) {
        console.log("Dibujando fantasma en:", this.posicionX, this.posicionY);
        ctx.drawImage(this.imagen, this.posicionX * tamañoCelda, this.posicionY * tamañoCelda, tamañoCelda, tamañoCelda);
    }

    mover(mapa) {

        //Detectar si un fantasma sale de los limites del mapa
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
                }
                break;
            case 'abajo':
                const filaEntranteAbajo = Math.ceil((this.posicionY + this.velocidad) - 0.001)
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

export class Blinky extends Fantasma {
    constructor(x, y, velocidad) {
        super(x, y, velocidad, 'assets/svg/blinky.svg');
    }
}
