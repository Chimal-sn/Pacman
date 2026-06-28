const audio = document.getElementById('musica');

document.addEventListener('click', () => {
    if (audio.muted) {
        audio.muted = false;
    }
    if (audio.paused) {
        audio.play().catch(error => {
            console.log("No se pudo reproducir el audio tras el clic:", error);
        });
    }
}, { once: true });