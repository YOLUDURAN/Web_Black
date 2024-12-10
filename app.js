import { ProductService } from './services/ProductService.js';
import { Cart } from './components/Cart.js';
import { Products } from './components/Products.js';
import { Clock } from './components/Clock.js';
import { Auth } from './components/Auth.js';
import { Search } from './components/Search.js';
import { Contact } from './components/Contact.js';
import { SpotifyPlayer } from './components/SpotifyPlayer.js';
import { Carousel } from './components/Carousel.js';


class App {
    constructor() {

        this.spotifyPlayer = new SpotifyPlayer();
        this.initializeServices();
        this.initializeComponents();
        this.offers = new Offers(this.productService, this.cart);
        this.init();
        this.setupLoadingSafety();
    }

    initializeServices() {
        this.productService = new ProductService();
    }

    initializeComponents() {
        try {
            this.cart = new Cart();
            this.products = new Products(this.productService, this.cart);
            this.clock = new Clock();
            this.auth = new Auth();
            this.search = new Search(this.productService, 
                (products) => this.products.render(products));
            this.contact = new Contact();
            this.carousel = new Carousel();
            this.spotifyPlayer = new SpotifyPlayer();
            this.offers = new Offers(this.productService, this.cart);
            
        } catch (error) {
            console.error('Error initializing components:', error);
            this.showError('Error al inicializar componentes');
            this.hideLoading();
        }
        
    }

    async init() {
        try {
            await this.products.loadProducts();
        } catch (error) {
            console.error('Error initializing app:', error);
            this.showError('Error al cargar la aplicación');
        } finally {
            // Asegurar que el loading se oculte en cualquier caso
            this.hideLoading();
        }
    }

    setupLoadingSafety() {
        // Timeout de seguridad para ocultar el loading después de 5 segundos
        setTimeout(() => {
            this.hideLoading();
        }, 5000);
    }

    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading && loading.style.display !== 'none') {
            loading.style.display = 'none';
        }
    }

    showError(message) {
        const toast = document.createElement('div');
        toast.className = 'toast position-fixed bottom-0 end-0 m-3';
        toast.innerHTML = `
            <div class="toast-header bg-danger text-white">
                <i class="fas fa-exclamation-circle me-2"></i>
                <strong class="me-auto">Error</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">${message}</div>
        `;
        document.body.appendChild(toast);
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        toast.addEventListener('hidden.bs.toast', () => toast.remove());
    }
}

// Inicializar la app cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new App();
});