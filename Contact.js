export class Contact {
    constructor() {
        this.form = document.getElementById('contactForm');
        if (!this.form) {
            console.error('Formulario de contacto no encontrado');
            return;
        }
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleSubmit();
        });

        this.form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', () => this.validateField(input));
        });
    }

    validateField(input) {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';

        if (value === '') {
            isValid = false;
            errorMessage = 'Este campo es requerido';
        } else if (input.type === 'email' && !this.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Email inválido';
        }

        // Mostrar/ocultar error
        const feedbackElement = input.nextElementSibling;
        input.classList.toggle('is-invalid', !isValid);
        input.classList.toggle('is-valid', isValid);
        if (feedbackElement) {
            feedbackElement.textContent = errorMessage;
        }

        return isValid;
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    async handleSubmit() {
        const formData = {
            name: this.form.querySelector('#name').value,
            email: this.form.querySelector('#contactEmail').value,
            message: this.form.querySelector('#message').value
        };

        // Validar todos los campos
        let isValid = true;
        this.form.querySelectorAll('input, textarea').forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) return;

        try {
            const submitButton = this.form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Enviando...';

            await this.simulateApiCall(formData);
            
            this.showSuccess('Mensaje enviado correctamente');
            this.form.reset();
            this.form.querySelectorAll('.is-valid').forEach(input => {
                input.classList.remove('is-valid');
            });
        } catch (error) {
            this.showError('Error al enviar el mensaje');
        } finally {
            const submitButton = this.form.querySelector('button[type="submit"]');
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Enviar Mensaje';
        }
    }

    simulateApiCall(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Mensaje enviado:', data);
                resolve({ success: true });
            }, 1000);
        });
    }

    showSuccess(message) {
        const toast = document.createElement('div');
        toast.className = 'toast position-fixed bottom-0 end-0 m-3';
        toast.innerHTML = `
            <div class="toast-header bg-success text-white">
                <i class="fas fa-check-circle me-2"></i>
                <strong class="me-auto">¡Éxito!</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">${message}</div>
        `;
        document.body.appendChild(toast);
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        toast.addEventListener('hidden.bs.toast', () => toast.remove());
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