// components/SpotifyPlayer.js
export class SpotifyPlayer {
    constructor() {
        this.tracks = [
            '5vL0yvddknhGj7IrBc6UTj',
            '3eMBTrxgvfJvH0bDDthisI',
            '20CozgjF6bshBw8cLhN23B'
        ];
        this.isOpen = false;
        this.currentTrack = 0;
        this.createFloatingButton();
    }

    createFloatingButton() {
        // Botón flotante de música
        const button = document.createElement('button');
        button.className = 'btn btn-success rounded-circle position-fixed bottom-0 end-0 m-3 btn-music';
        button.style.zIndex = '1000';
        button.innerHTML = '<i class="fas fa-music"></i>';
        button.addEventListener('click', () => this.togglePlayer());
        
        // Contenedor del reproductor
        this.playerContainer = document.createElement('div');
        this.playerContainer.className = 'spotify-mini-container position-fixed bottom-0 end-0 mb-5 me-3';
        this.playerContainer.style.display = 'none';
        this.playerContainer.style.zIndex = '999';
        
        // Reproductor de Spotify
        const iframe = document.createElement('iframe');
        this.updatePlayer(iframe);
        
        this.playerContainer.appendChild(iframe);
        document.body.appendChild(button);
        document.body.appendChild(this.playerContainer);
    }

    updatePlayer(iframe) {
        iframe.src = `https://open.spotify.com/embed/track/${this.tracks[this.currentTrack]}?theme=0`;
        iframe.width = '250';
        iframe.height = '80';
        iframe.frameBorder = '0';
        iframe.allow = 'encrypted-media';
        iframe.style.borderRadius = '10px';
    }

    togglePlayer() {
        this.isOpen = !this.isOpen;
        this.playerContainer.style.display = this.isOpen ? 'block' : 'none';
    }
}