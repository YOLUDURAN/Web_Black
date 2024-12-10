// components/Search.js
export class Search {
    constructor(productService, renderCallback) {
        this.productService = productService;
        this.renderCallback = renderCallback;
        this.setupSearchBar();
    }

    setupSearchBar() {
        const searchContainer = document.querySelector('.category-filters');
        const searchHTML = `
            <div class="search-container ms-3">
                <input type="text" 
                       class="form-control" 
                       placeholder="Buscar productos..."
                       id="searchInput">
            </div>
        `;
        searchContainer.insertAdjacentHTML('beforeend', searchHTML);

        this.setupEventListeners();
    }

    setupEventListeners() {
        const searchInput = document.getElementById('searchInput');
        let debounceTimer;

        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                this.searchProducts(e.target.value);
            }, 300);
        });
    }

    async searchProducts(query) {
        if (!query.trim()) {
            this.renderCallback(await this.productService.getProducts());
            return;
        }

        try {
            const products = await this.productService.getProducts();
            const filtered = products.filter(product => 
                product.nombre.toLowerCase().includes(query.toLowerCase()) ||
                product.descripcion.toLowerCase().includes(query.toLowerCase())
            );
            this.renderCallback(filtered);
        } catch (error) {
            console.error('Error en la búsqueda:', error);
        }
    }
}