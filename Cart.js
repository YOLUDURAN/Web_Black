export class Cart {
    constructor() {
        this.items = [];
        this.modal = new bootstrap.Modal(document.getElementById('cartModal'));
        this.setupEventListeners();
        this.loadCart();
    }

    setupEventListeners() {
        document.getElementById('cartBtn').addEventListener('click', () => {
            this.render();
            this.modal.show();
        });

        document.getElementById('checkoutBtn').addEventListener('click', () => {
            this.checkout();
        });

        // Mejorado: Escuchar eventos del carrito usando delegación de eventos
        document.getElementById('cartItems').addEventListener('click', (e) => {
            const button = e.target.closest('button');
            if (!button) return;

            const action = button.dataset.action;
            const id = parseInt(button.dataset.id);

            if (!action || !id) return;

            if (action === 'increase') {
                this.updateQuantity(id, 1);
            } else if (action === 'decrease') {
                this.updateQuantity(id, -1);
            } else if (action === 'remove') {
                this.removeItem(id);
            }

            e.stopPropagation();
        });
    }

    loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            this.items = JSON.parse(savedCart);
            this.updateCartCount();
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateCartCount();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: product.id,
                nombre: product.nombre,
                precio: product.precio,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartCount();
        this.showNotification('Producto agregado al carrito');
    }

    updateQuantity(id, change) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeItem(id);
            } else {
                this.saveCart();
                this.updateCartCount();
                this.render();
            }
        }
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.saveCart();
        this.updateCartCount();
        this.render();
        this.showNotification('Producto eliminado del carrito');
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
    }

    updateCartCount() {
        const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElement = document.getElementById('cartCount');
        if (cartCountElement) {
            cartCountElement.textContent = count;
        }
    }

    showNotification(message) {
        const toast = document.createElement('div');
        toast.className = 'toast position-fixed bottom-0 end-0 m-3';
        toast.innerHTML = `
            <div class="toast-header">
                <i class="fas fa-shopping-cart me-2"></i>
                <strong class="me-auto">Carrito</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">${message}</div>
        `;
        document.body.appendChild(toast);
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        toast.addEventListener('hidden.bs.toast', () => toast.remove());
    }

    generateReceipt() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Encabezado
        doc.setFontSize(20);
        doc.text('Mandy Sweets', 105, 20, { align: 'center' });
        doc.setFontSize(12);
        doc.text('Recibo de Compra', 105, 30, { align: 'center' });
        
        // Fecha y número de orden
        const fecha = new Date().toLocaleDateString();
        const ordenNum = Math.floor(Math.random() * 1000000);
        doc.text(`Fecha: ${fecha}`, 20, 40);
        doc.text(`Orden #: ${ordenNum}`, 20, 50);
        
        // Datos del cliente
        const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
        if (userData.name) {
            doc.text(`Cliente: ${userData.name}`, 20, 60);
            doc.text(`Email: ${userData.email}`, 20, 70);
        }
        
        // Tabla de productos
        const tableData = this.items.map(item => [
            item.nombre,
            item.quantity,
            item.precioOriginal ? `$${item.precioOriginal.toFixed(2)}` : `$${item.precio.toFixed(2)}`,
            item.descuento ? `${item.descuento}` : '-',
            `$${item.precio.toFixed(2)}`,
            `$${(item.precio * item.quantity).toFixed(2)}`
        ]);
        
        doc.autoTable({
            startY: userData.name ? 80 : 60,
            head: [['Producto', 'Cantidad', 'Precio Original', 'Descuento', 'Precio Final', 'Subtotal']],
            body: tableData,
            theme: 'striped',
            headStyles: { fillColor: [134, 208, 41] },
            styles: { fontSize: 8 }, // Texto más pequeño para que quepa todo
            columnStyles: {
                0: { cellWidth: 40 }, // Nombre producto
                1: { cellWidth: 20 }, // Cantidad
                2: { cellWidth: 30 }, // Precio Original
                3: { cellWidth: 25 }, // Descuento
                4: { cellWidth: 30 }, // Precio Final
                5: { cellWidth: 30 }  // Subtotal
            }
        });
        
        // Total y ahorro
        const finalY = doc.lastAutoTable.finalY + 10;
        const totalAhorro = this.items.reduce((sum, item) => {
            if (item.precioOriginal) {
                return sum + ((item.precioOriginal - item.precio) * item.quantity);
            }
            return sum;
        }, 0);
    
        if (totalAhorro > 0) {
            doc.text(`Total Ahorrado: $${totalAhorro.toFixed(2)}`, 20, finalY);
        }
        doc.text(`Total a Pagar: $${this.getTotal().toFixed(2)}`, 150, finalY);
        
        // Pie de página
        doc.setFontSize(10);
        doc.text('¡Gracias por tu compra!', 105, finalY + 20, { align: 'center' });
        doc.text('Mandy Sweets - Masas Dulces & Saladas', 105, finalY + 30, { align: 'center' });
        
        return {
            ordenNum,
            doc
        };
    }

    showReceiptOptions(ordenNum, doc) {
        const receiptModal = document.createElement('div');
        receiptModal.className = 'modal fade';
        receiptModal.id = 'receiptModal';
        receiptModal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Recibo de Compra</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center">
                        <p>¿Qué deseas hacer con tu recibo?</p>
                        <button class="btn btn-success me-2" id="printReceiptBtn">
                            <i class="fas fa-print me-2"></i>Imprimir
                        </button>
                        <button class="btn btn-success" id="downloadReceiptBtn">
                            <i class="fas fa-download me-2"></i>Descargar PDF
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(receiptModal);
        const modal = new bootstrap.Modal(receiptModal);
        modal.show();

        document.getElementById('printReceiptBtn').addEventListener('click', () => {
            doc.autoPrint();
            doc.output('dataurlnewwindow');
        });

        document.getElementById('downloadReceiptBtn').addEventListener('click', () => {
            doc.save(`recibo-mandy-sweets-${ordenNum}.pdf`);
        });

        receiptModal.addEventListener('hidden.bs.modal', () => {
            receiptModal.remove();
        });
    }

    render() {
        const cartItems = document.getElementById('cartItems');
        if (this.items.length === 0) {
            cartItems.innerHTML = '<p class="text-center">El carrito está vacío</p>';
            document.getElementById('cartTotal').textContent = '$0.00';
            return;
        }

        cartItems.innerHTML = this.items.map(item => `
            <div class="cart-item mb-3">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="mb-1">${item.nombre}</h6>
                        <p class="mb-0">$${item.precio.toFixed(2)} x ${item.quantity}</p>
                        <p class="mb-0 text-success fw-bold">Subtotal: $${(item.precio * item.quantity).toFixed(2)}</p>
                    </div>
                    <div class="d-flex align-items-center">
                        <button class="btn btn-sm btn-outline-success me-2" 
                                data-action="decrease"
                                data-id="${item.id}">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="mx-2 fw-bold">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-success me-2" 
                                data-action="increase"
                                data-id="${item.id}">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" 
                                data-action="remove"
                                data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <hr class="my-2">
            </div>
        `).join('');

        document.getElementById('cartTotal').textContent = `$${this.getTotal().toFixed(2)}`;
    }

    async checkout() {
        if (this.items.length === 0) {
            this.showNotification('El carrito está vacío');
            return;
        }

        try {
            this.showNotification('Procesando pago...');
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Generar recibo antes de limpiar el carrito
            const { ordenNum, doc } = this.generateReceipt();

            // Mostrar opciones de recibo
            this.showReceiptOptions(ordenNum, doc);

            this.items = [];
            this.saveCart();
            this.render();
            this.modal.hide();
            this.showNotification('¡Compra realizada con éxito!');
        } catch (error) {
            this.showNotification('Error al procesar el pago');
            console.error('Error en checkout:', error);
        }
    }
}