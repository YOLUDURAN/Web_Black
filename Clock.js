// js/components/Clock.js
export class Clock {
    constructor() {
        this.element = document.getElementById('clock');
        this.intervalId = null;
        this.setupStyles();
        this.init();
    }

    init() {
        // Inicialización inmediata
        this.update();
        // Actualización cada segundo
        this.intervalId = setInterval(() => this.update(), 1000);

        // Agregar event listeners para visibilidad de página
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stop();
            } else {
                this.start();
            }
        });
    }

    start() {
        if (!this.intervalId) {
            this.update();
            this.intervalId = setInterval(() => this.update(), 1000);
        }
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    setupStyles() {
        // Aplicar estilos base al reloj
        this.element.classList.add('digital-clock');
        this.applyStyles();
    }

    applyStyles() {
        // Estilos inline para asegurar consistencia
        Object.assign(this.element.style, {
            display: 'inline-block',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            fontFamily: 'monospace',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        });
    }

    formatNumber(number) {
        return number.toString().padStart(2, '0');
    }

    getTimeComponents() {
        const now = new Date();
        return {
            hours: this.formatNumber(now.getHours()),
            minutes: this.formatNumber(now.getMinutes()),
            seconds: this.formatNumber(now.getSeconds())
        };
    }

    update() {
        if (!this.element) {
            console.warn('Elemento del reloj no encontrado');
            this.stop();
            return;
        }

        try {
            const { hours, minutes, seconds } = this.getTimeComponents();
            
            // Usar template string para el HTML
            this.element.innerHTML = `
                <span class="hours">${hours}</span>
                <span class="separator">:</span>
                <span class="minutes">${minutes}</span>
                <span class="separator">:</span>
                <span class="seconds">${seconds}</span>
            `;

            // Agregar efecto de parpadeo a los separadores
            const separators = this.element.querySelectorAll('.separator');
            separators.forEach(sep => {
                sep.style.opacity = sep.style.opacity === '0' ? '1' : '0';
            });

        } catch (error) {
            console.error('Error actualizando el reloj:', error);
            this.stop();
        }
    }

    // Método para limpiar recursos cuando el componente se destruye
    destroy() {
        this.stop();
        // Remover event listeners si es necesario
        document.removeEventListener('visibilitychange', this.visibilityChangeHandler);
    }

    // Método para cambiar el formato de 12/24 horas (opcional)
    toggleFormat() {
        this.is24Hour = !this.is24Hour;
        this.update();
    }

    // Método para obtener la hora actual como string (útil para logging o debugging)
    getCurrentTime() {
        const { hours, minutes, seconds } = this.getTimeComponents();
        return `${hours}:${minutes}:${seconds}`;
    }
}