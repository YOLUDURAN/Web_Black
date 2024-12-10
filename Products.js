// components/Products.js
export class Products {
    constructor(productService, cart) {
        this.productService = productService;
        this.cart = cart;
        this.currentCategory = 'todos';
        this.setupEventListeners();
    }

    setupEventListeners() {
        const filterButtons = document.querySelectorAll('.category-filters button');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.category;
                this.filterByCategory(category);
                
                // Actualizar estado activo de los botones
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    async loadProducts() {
        try {
            const loadingEl = document.getElementById('loading');
            loadingEl.style.display = 'flex';

            this.products = await this.productService.getProducts();
            this.render(this.products);
        } catch (error) {
            this.showError('Error al cargar los productos');
            console.error('Error:', error);
        } finally {
            document.getElementById('loading').style.display = 'none';
        }
    }

    async filterByCategory(category) {
        try {
            const grid = document.getElementById('productGrid');
            grid.classList.add('fade-out');
            
            const products = await this.productService.getProductsByCategory(category);
            this.currentCategory = category;
            
            setTimeout(() => {
                this.render(products);
                grid.classList.remove('fade-out');
                grid.classList.add('fade-in');
            }, 300);
        } catch (error) {
            this.showError('Error al filtrar productos');
            console.error('Error:', error);
        }
    }

    render(products) {
        const grid = document.getElementById('productGrid');
        
        if (products.length === 0) {
            grid.innerHTML = `
                <div class="col-12 text-center">
                    <p>No hay productos disponibles en esta categoría</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = products.map(product => this.productTemplate(product)).join('');
        
        // Configurar eventos para los botones de agregar al carrito
        grid.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const id = parseInt(btn.dataset.id);
                const product = products.find(p => p.id === id);
                if (product) {
                    this.cart.addItem(product);
                    btn.classList.add('added');
                    setTimeout(() => btn.classList.remove('added'), 1000);
                }
            });
        });
    }

    productTemplate(product) {
        return `
            <div class="col-md-4 col-lg-3 mb-4">
                <div class="product-card">
                    <div class="product-image-container">
                        <img src="${product.imagen}" 
                             class="product-image" 
                             alt="${product.nombre}"
                             loading="lazy"
                             onerror="this.src='assets/images/placeholder.jpg'">
                        ${product.stock <= 5 ? `
                            <span class="badge bg-warning stock-badge">
                                ¡Últimas ${product.stock} unidades!
                            </span>
                        ` : ''}
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${product.nombre}</h3>
                        <p class="product-description">${product.descripcion}</p>
                        <div class="price-container">
                            <span class="price">$${product.precio.toFixed(2)}</span>
                            <button class="btn btn-success add-to-cart" 
                                    data-id="${product.id}">
                                <i class="fas fa-cart-plus"></i>
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    showError(message) {
        const toast = document.createElement('div');
        toast.className = 'toast position-fixed bottom-0 end-0 m-3';
        toast.innerHTML = `
            <div class="toast-header text-danger">
                <i class="fas fa-exclamation-circle me-2"></i>
                <strong class="me-auto">Error</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">${message}</div>
        `;
        document.body.appendChild(toast);
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        toast.addEventListener('hidden.bs.toast', () => toast.remove());
    }
}