const pacman_open = new Image();
pacman_open.src = 'assets/svg/pacman_open.svg';
const pacman_closed = new Image();
pacman_closed.src = 'assets/svg/pacman_closed.svg';

export const pacman = {
    posicionX: 2,
    posicionY: 1,
    direccion: '',

    dibujar: function (ctx, blink, tamañoCelda) {
        if (blink) {
            ctx.drawImage(pacman_open, this.posicionX * tamañoCelda, this.posicionY * tamañoCelda, tamañoCelda, tamañoCelda);
        } else {
            ctx.drawImage(pacman_closed, this.posicionX * tamañoCelda, this.posicionY * tamañoCelda, tamañoCelda, tamañoCelda);
        }
    }
}