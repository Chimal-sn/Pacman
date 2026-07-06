export class Fantasma {
    constructor(x, y, velocidad, rutaImagen) {
        this.posicionX = x;
        this.posicionY = y;
        this.velocidad = velocidad;
        this.direccionActual = 'izquierda';
        this.direccionProhibida = 'derecha';

        // Cargamos la imagen correspondiente
        this.imagen = new Image();
        this.imagen.src = rutaImagen;
    }

    dibujar(ctx, tamañoCelda) {

        ctx.drawImage(this.imagen, this.posicionX * tamañoCelda, this.posicionY * tamañoCelda, tamañoCelda, tamañoCelda);
    }

    mover(mapa, pacman) {

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

        if (this.posicionX % 1 == 0 && this.posicionY % 1 == 0) {
            const objetivo = this.obtenerObjetivo(pacman)
            this.decidirDireccion(mapa, objetivo)
        }


        switch (this.direccionActual) {
            case 'arriba':
                const filaEntranteArriba = Math.floor((this.posicionY - this.velocidad) + 0.001)
                const columnaEntranteArriba = Math.round(this.posicionX)
                if ((mapa[filaEntranteArriba][columnaEntranteArriba] != 1) && (this.posicionX % 1 == 0)) {
                    this.posicionY -= this.velocidad;
                    this.direccionProhibida = 'abajo';
                }
                break;
            case 'abajo':
                const filaEntranteAbajo = Math.ceil((this.posicionY + this.velocidad) - 0.001)
                const columnaEntranteAbajo = Math.round(this.posicionX)
                if ((mapa[filaEntranteAbajo][columnaEntranteAbajo] != 1) && (this.posicionX % 1 == 0)) {
                    this.posicionY += this.velocidad;
                    this.direccionProhibida = 'arriba';
                }
                break;
            case 'izquierda':
                const filaEntranteIzquierda = Math.round(this.posicionY)
                const columnaEntranteIzquierda = Math.floor((this.posicionX - this.velocidad) + 0.001);
                if ((mapa[filaEntranteIzquierda][columnaEntranteIzquierda] != 1) && (this.posicionY % 1 == 0)) {
                    this.posicionX -= this.velocidad;
                    this.direccionProhibida = 'derecha';
                }
                break;
            case 'derecha':
                const filaEntranteDerecha = Math.round(this.posicionY)
                const columnaEntranteDerecha = Math.ceil((this.posicionX + this.velocidad) - 0.001);
                if ((mapa[filaEntranteDerecha][columnaEntranteDerecha] != 1) && (this.posicionY % 1 == 0)) {
                    this.posicionX += this.velocidad;
                    this.direccionProhibida = 'izquierda';
                }
                break;
        }
    }
    decidirDireccion(mapa, objetivo) {
        const x = this.posicionX;
        const y = this.posicionY;

        const opciones = [
            { direccion: 'arriba', columnaDestino: x, filaDestino: y - 1 },
            { direccion: 'abajo', columnaDestino: x, filaDestino: y + 1 },
            { direccion: 'izquierda', columnaDestino: x - 1, filaDestino: y },
            { direccion: 'derecha', columnaDestino: x + 1, filaDestino: y }
        ];

        let mejorDireccion = this.direccionActual;
        let menorDistancia = Infinity;

        opciones.forEach(opcion => {
            if (opcion.direccion == this.direccionProhibida) return;
            if (mapa[opcion.filaDestino][opcion.columnaDestino] == 1) return;

            const diferenciaX = opcion.columnaDestino - objetivo[1];
            const diferenciaY = opcion.filaDestino - objetivo[0];

            const distancia = diferenciaX * diferenciaX + diferenciaY * diferenciaY;

            if (distancia < menorDistancia) {
                menorDistancia = distancia;
                mejorDireccion = opcion.direccion;
            }

        });

        this.direccionActual = mejorDireccion;

        if (this.direccionActual == 'arriba') {
            this.direccionProhibida = 'abajo';
        }
        if (this.direccionActual == 'abajo') {
            this.direccionProhibida = 'arriba';
        }
        if (this.direccionActual == 'izquierda') {
            this.direccionProhibida = 'derecha';
        }
        if (this.direccionActual == 'derecha') {
            this.direccionProhibida = 'izquierda';
        }
    }

    obtenerObjetivo(pacman) {
        const filaPacman = Math.round(pacman.posicionY);
        const columnaPacman = Math.round(pacman.posicionX);

        return [filaPacman, columnaPacman];
    }
}

export class Blinky extends Fantasma {
    constructor(x, y, velocidad) {
        super(x, y, velocidad, 'assets/svg/blinky.svg');
    }
}
