export class Carousel {
    constructor() {
        this.images = [
            '/assets/images/fondo1.jpg',
            './assets/images/fondo2.jpg',
            './assets/images/fondo3.jpg',
            './assets/images/fondo4.jfif'
        ];
        this.currentSlide = 0;
        this.init();

    }

    init() {
        // Crear el contenedor del carrusel
        const heroSection = document.querySelector('.hero');
        const carouselContainer = document.createElement('div');
        carouselContainer.className = 'hero-carousel';
        
        // Crear slides
        this.images.forEach((img, index) => {
            const slide = document.createElement('div');
            slide.className = `slide ${index === 0 ? 'active' : ''}`;
            slide.style.backgroundImage = `url(${img})`;
            carouselContainer.appendChild(slide);
        });
        
        // Insertar el carrusel al inicio del hero
        heroSection.insertBefore(carouselContainer, heroSection.firstChild);
        
        // Obtener todas las slides
        this.slides = carouselContainer.querySelectorAll('.slide');
        
        // Iniciar el carrusel automático
        this.startAutoSlide();
    }

    nextSlide() {
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.slides[this.currentSlide].classList.add('active');
    }

    startAutoSlide() {
        setInterval(() => this.nextSlide(), 5000);
    }
}
window.addEventListener('DOMContentLoaded', () => {
    new Carousel();
});
