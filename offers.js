
export class Offers {
    constructor(productService, cart) {
        this.productService = productService;
        this.cart = cart;
        this.loadOffers();
    }

    async loadOffers() {
        try {
            const offers = await this.productService.getOffers();
            this.render(offers);
        } catch (error) {
            console.error('Error loading offers:', error);
        }
    }

    render(offers) {
        const offersGrid = document.getElementById('offersGrid');
        if (!offers || offers.length === 0) {
            offersGrid.innerHTML = '<p class="text-center">No hay ofertas disponibles en este momento.</p>';
            return;
        }

        offersGrid.innerHTML = offers.map(offer => `
            <div class="col-md-3 mb-4">
                <div class="card offer-card h-100">
                    <div class="badge bg-danger offer-badge">-${offer.descuento}</div>
                    <img src="${offer.imagen}" 
                         class="card-img-top" 
                         alt="${offer.nombre}"
                         style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${offer.nombre}</h5>
                        <p class="card-text">${offer.descripcion}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <span class="text-muted original-price">$${offer.precioOriginal}</span>
                                <span class="text-success fw-bold">$${offer.precio}</span>
                            </div>
                            <button class="btn btn-success btn-sm add-to-cart" 
                                    data-id="${offer.id}">
                                <i class="fas fa-cart-plus"></i> Agregar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Agregar event listeners para los botones de agregar al carrito
        offersGrid.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                const offer = offers.find(o => o.id === id);
                if (offer) {
                    this.cart.addItem(offer);
                }
            });
        });
    }
}