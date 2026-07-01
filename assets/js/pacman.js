const pacman_open = new Image();
pacman_open.src = 'assets/svg/pacman_open.svg';
const pacman_closed = new Image();
pacman_closed.src = 'assets/svg/pacman_closed.svg';

export const pacman = {
    posicionX: 2,
    posicionY: 1,
    direccion: '',
    velocidad: 0.01,

    dibujar: function (ctx, blink, tamañoCelda) {
        if (blink) {
            ctx.drawImage(pacman_open, this.posicionX * tamañoCelda, this.posicionY * tamañoCelda, tamañoCelda, tamañoCelda);
        } else {
            ctx.drawImage(pacman_closed, this.posicionX * tamañoCelda, this.posicionY * tamañoCelda, tamañoCelda, tamañoCelda);
        }
    },

    mover: function () {
        switch (this.direccion) {
            case 'arriba':
                this.posicionY -= this.velocidad;
                break;
            case 'abajo':
                this.posicionY += this.velocidad;
                break;
            case 'izquierda':
                this.posicionX -= this.velocidad;
                break;
            case 'derecha':
                this.posicionX += this.velocidad;
                break;
        }
    }
}