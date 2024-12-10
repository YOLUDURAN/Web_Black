export class Auth {
    constructor() {
        this.user = null;
        this.loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        this.registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
        this.loginForm = document.getElementById('loginForm');
        this.registerForm = document.getElementById('registerForm');
        this.TOKEN_KEY = 'auth_token';
        this.USER_KEY = 'user_data';
        this.setupEventListeners();
        this.loadUserFromStorage();
    }

    setupEventListeners() {
        const loginBtn = document.getElementById('loginBtn');
        loginBtn.addEventListener('click', () => {
            if (this.user) {
                this.showConfirmDialog('¿Deseas cerrar sesión?', () => this.logout());
            } else {
                this.loginModal.show();
            }
        });

        // Login form
        this.loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Register form
        this.registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });

        // Cambio entre modales
        document.getElementById('switchToRegister').addEventListener('click', (e) => {
            e.preventDefault();
            this.loginModal.hide();
            this.registerModal.show();
        });

        document.getElementById('switchToLogin').addEventListener('click', (e) => {
            e.preventDefault();
            this.registerModal.hide();
            this.loginModal.show();
        });

        // Toggle password visibility
        this.setupPasswordToggle('loginPassword', 'toggleLoginPassword');
        this.setupPasswordToggle('regPassword', 'toggleRegPassword');

        // Validación en tiempo real
        this.setupRealtimeValidation(this.loginForm);
        this.setupRealtimeValidation(this.registerForm);
    }

    setupPasswordToggle(inputId, toggleId) {
        const passwordInput = document.getElementById(inputId);
        const toggleButton = document.getElementById(toggleId);
        
        if (toggleButton && passwordInput) {
            toggleButton.addEventListener('click', () => {
                const type = passwordInput.type === 'password' ? 'text' : 'password';
                passwordInput.type = type;
                const icon = toggleButton.querySelector('i');
                icon.className = `fas fa-eye${type === 'password' ? '' : '-slash'}`;
            });
        }
    }

    setupRealtimeValidation(form) {
        if (!form) return;
        
        form.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => {
                this.validateField(input);
                this.updateSubmitButton(form);
            });
        });
    }

    async handleLogin() {
        if (!this.validateForm(this.loginForm)) return;

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            this.showLoading(true, this.loginForm);
            
            // Obtener usuarios del localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                this.user = {
                    name: user.name,
                    email: user.email
                };
                localStorage.setItem(this.USER_KEY, JSON.stringify(this.user));
                this.loginModal.hide();
                this.updateLoginButton();
                this.showNotification('¡Bienvenido ' + user.name + '!', 'success');
                this.loginForm.reset();
            } else {
                this.showNotification('Email o contraseña incorrectos', 'error');
            }
        } catch (error) {
            this.showNotification('Error al iniciar sesión', 'error');
            console.error('Error en login:', error);
        } finally {
            this.showLoading(false, this.loginForm);
        }
    }

    async handleRegister() {
        if (!this.validateForm(this.registerForm)) return;

        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;

        if (password !== confirmPassword) {
            this.showNotification('Las contraseñas no coinciden', 'error');
            return;
        }

        try {
            this.showLoading(true, this.registerForm);
            
            // Obtener usuarios existentes
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            
            // Verificar si el email ya está registrado
            if (users.some(u => u.email === email)) {
                this.showNotification('Este email ya está registrado', 'error');
                return;
            }

            // Agregar nuevo usuario
            users.push({
                name,
                email,
                password
            });

            // Guardar en localStorage
            localStorage.setItem('users', JSON.stringify(users));
            
            this.registerModal.hide();
            this.registerForm.reset();
            this.showNotification('Registro exitoso. Por favor, inicia sesión.', 'success');
            this.loginModal.show();

        } catch (error) {
            this.showNotification('Error al registrar usuario', 'error');
            console.error('Error en registro:', error);
        } finally {
            this.showLoading(false, this.registerForm);
        }
    }

    validateForm(form) {
        if (!form) return false;
        
        let isValid = true;
        form.querySelectorAll('input').forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        return isValid;
    }

    validateField(input) {
        if (!input) return false;

        input.classList.remove('is-invalid', 'is-valid');
        const errorElement = input.nextElementSibling?.classList.contains('invalid-feedback') 
            ? input.nextElementSibling 
            : input.parentElement.querySelector('.invalid-feedback');

        let isValid = true;
        let errorMessage = '';

        switch (input.id) {
            case 'regName':
                isValid = input.value.trim().length >= 3;
                errorMessage = 'El nombre debe tener al menos 3 caracteres';
                break;
            case 'loginEmail':
            case 'regEmail':
                isValid = this.isValidEmail(input.value);
                errorMessage = 'Por favor ingrese un email válido';
                break;
            case 'loginPassword':
            case 'regPassword':
                isValid = input.value.length >= 6;
                errorMessage = 'La contraseña debe tener al menos 6 caracteres';
                break;
            case 'regConfirmPassword':
                const password = document.getElementById('regPassword')?.value;
                isValid = input.value === password;
                errorMessage = 'Las contraseñas no coinciden';
                break;
            default:
                isValid = input.value.trim() !== '';
                errorMessage = 'Este campo es requerido';
        }

        if (!isValid && errorElement) {
            input.classList.add('is-invalid');
            errorElement.textContent = errorMessage;
        } else {
            input.classList.add('is-valid');
        }

        return isValid;
    }

    updateSubmitButton(form) {
        if (!form) return;
        
        const submitButton = form.querySelector('button[type="submit"]');
        if (!submitButton) return;

        const isValid = Array.from(form.querySelectorAll('input'))
            .every(input => this.validateField(input));
        
        submitButton.disabled = !isValid;
    }

    showLoading(show, form) {
        if (!form) return;
        
        const submitBtn = form.querySelector('button[type="submit"]');
        if (!submitBtn) return;

        if (show) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span class="spinner-border spinner-border-sm me-2"></span>
                ${form.id === 'loginForm' ? 'Iniciando sesión...' : 'Registrando...'}
            `;
        } else {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <i class="fas ${form.id === 'loginForm' ? 'fa-sign-in-alt' : 'fa-user-plus'} me-2"></i>
                ${form.id === 'loginForm' ? 'Ingresar' : 'Registrarse'}
            `;
        }
    }

    logout() {
        localStorage.removeItem(this.USER_KEY);
        this.user = null;
        this.updateLoginButton();
        this.showNotification('Sesión cerrada correctamente', 'success');
    }

    loadUserFromStorage() {
        const userData = localStorage.getItem(this.USER_KEY);
        if (userData) {
            this.user = JSON.parse(userData);
            this.updateLoginButton();
        }
    }

    updateLoginButton() {
        const loginBtn = document.getElementById('loginBtn');
        if (!loginBtn) return;

        if (this.user) {
            loginBtn.innerHTML = `
                <i class="fas fa-user-check"></i>
                <span class="ms-1 d-none d-md-inline">${this.user.name}</span>
            `;
            loginBtn.title = 'Cerrar sesión';
        } else {
            loginBtn.innerHTML = '<i class="fas fa-user"></i>';
            loginBtn.title = 'Iniciar sesión';
        }
    }

    showNotification(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = 'toast position-fixed bottom-0 end-0 m-3';
        toast.innerHTML = `
            <div class="toast-header bg-${type} text-white">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
                <strong class="me-auto">${type === 'success' ? 'Éxito' : 'Error'}</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">${message}</div>
        `;
        document.body.appendChild(toast);
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        toast.addEventListener('hidden.bs.toast', () => toast.remove());
    }

    showConfirmDialog(message, callback) {
        const confirmed = window.confirm(message);
        if (confirmed) {
            callback();
        }
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}