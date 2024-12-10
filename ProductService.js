// services/ProductService.js
export class ProductService {
    constructor() {
        this.productos = [
            {
                id: 1,
                nombre: "Torta de Frutos Rojos",
                precio: 169.99,
                imagen: "./assets/images/Dulces/Tarta de Chocolate con frutos rojos.jpg",
                categoria: "tortas",
                descripcion: "Deliciosa torta de 12 porciones con frutos rojos frescos",
                stock: 10
            },
            {
                id: 2,
                nombre: "Pastel de Limón & Frutos Rojos",
                precio: 139.99,
                imagen: "./assets/images/Dulces/Limón.jpg",
                categoria: "tortas",
                descripcion: "Torta desnuda de 10 porciones.",
                stock: 10
            },
            {
                id: 3,
                nombre: "Pastel Red Velvet",
                precio: 159.99,
                imagen: "./assets/images/Dulces/redvelvet.jpg",
                descripcion: "Pastel Red Velvet 10 pociones.",
                stock: 10
            },
            {
                id: 4,
                nombre: "Tarta de Queso",
                precio: 149.99,
                imagen: "./assets/images/Dulces/TartaQueso.jpg",
                categoria: "tortas",
                descripcion: "Tarta de queso 10 pociones.",
                stock: 10
            },
            {
                id: 5,
                nombre: "Torta Selva Negra",
                precio: 179.99,
                imagen: "./assets/images/Dulces/selvanegra.jpeg",
                categoria: "tortas",
                descripcion: "Torta Selva Negra, rellena de crema de leche y cherrys.",
                stock: 10
            },
            {
                id: 6,
                nombre: "Torta Cuatro Cuartos de Pistacho",
                precio: 149.99,
                imagen: "./assets/images/Dulces/pistachos.png",
                categoria: "tortas",
                descripcion: "Torta Cuatro Cuartos de Pistacho con Chantilly de Pistacho y Cubierta de Ganache Blanco.",
                stock: 10
            },
            {
                id: 7,
                nombre: "Cinnamon Rolls",
                precio: 19.99,
                imagen: "./assets/images/Dulces/rollo de canel.jpg",
                categoria: "tortas",
                descripcion: "Rollos de Canela, rellenos de canela, cubierto de dulce de Leche, se vende por porciones.",
                stock: 10
            },
            {
                id: 8,
                nombre: "Torta Tres Leches",
                precio: 149.99,
                imagen: "./assets/images/Dulces/tresleches.jpg",
                categoria: "tortas",
                descripcion: "Deliciosa Torta 3 leches, 10 porciones.",
                stock: 10
            },
            {
                id: 9,
                nombre: "Torta Mil hojas",
                precio: 149.99,
                imagen: "./assets/images/Dulces/milhojas.jpg",
                categoria: "tortas",
                descripcion: "Deliciosa torta de mil hojas rellena de dulce de leche.",
                stock: 10
            },

            {
                id: 13,
                nombre: "Croissant",
                precio: 11.99,
                imagen: "./assets/images/Saladas/Butter Croissant.jpg",
                categoria: "salados",
                descripcion: "Croissant de mantequilla, relleno de jamón y queso.",
                stock: 10
            },
            {
                id: 14,
                nombre: "Coxinha Brasilera",
                precio: 6.99,
                imagen: "./assets/images/Saladas/Coxinha.jpg",
                categoria: "salados",
                descripcion: "Coxinha Brasileña rellena de pollo.",
                stock: 10
            },
            {
                id: 15,
                nombre: "Cuñapé",
                precio: 2.99,
                imagen: "./assets/images/Saladas/cuñape.jpeg",
                categoria: "salados",
                descripcion: "Mini pan de queso y harina de yuca.",
                stock: 10
            },
            {
                id: 16,
                nombre: "Empanadas de Pollo",
                precio: 7.99,
                imagen: "./assets/images/Saladas/Empanadas de pollo fritas.jpg",
                categoria: "salados",
                descripcion: "Empanadas fritas rellenas de pollo y verduras.",
                stock: 10
            },
            {
                id: 17,
                nombre: "Mini Pizza",
                precio: 5.99,
                imagen: "./assets/images/Saladas/minipizza.jpg",
                categoria: "salados",
                descripcion: "Mini Pizza personal, 3 sabores disponibles.",
                stock: 10
            },
            {
                id: 18,
                nombre: "Pucacapas",
                precio: 5.99,
                imagen: "./assets/images/Saladas/pucacapas.jpeg",
                categoria: "salados",
                descripcion: "Empanadas horneadas, rellenas de queso, cebolla y ají.",
                stock: 10
            },
            {
                id: 19,
                nombre: "Salteñas",
                precio: 6.99,
                imagen: "./assets/images/Saladas/salteña.jpg",
                categoria: "salados",
                descripcion: "Salteñas rellenas de pollo, carne y mixtas.",
                stock: 10
            },
            {
                id: 20,
                nombre: "Banderillas",
                precio: 5.99,
                imagen: "./assets/images/Saladas/Banderillas.jpg",
                categoria: "salados",
                descripcion: "Banderillas rellenas de queso y salchicha, cubierta de masa frita.",
                stock: 10
            },
            {
                id: 21,
                nombre: "Frappé Caramelo",
                precio: 24.99,
                imagen: "./assets/images/Driks/caramelofrapé.png",
                categoria: "bebidas",
                descripcion: "Frappé de Caramelo con crema batida.",
                stock: 10
            },
            {
                id: 22,
                nombre: "Frappé de Oreo",
                precio: 23.99,
                imagen: "./assets/images/Driks/Frapé de oreo.jpeg",
                categoria: "bebidas",
                descripcion: "Frappé de Oreo con crema batida.",
                stock: 10
            },
            {
                id: 23,
                nombre: "Smoothie de Fresas",
                precio: 24.99,
                imagen: "./assets/images/Driks/Smoothie de fresa.png",
                categoria: "bebidas",
                descripcion: "Smoothie de fresas ",
                stock: 10
            },
            {
                id: 24,
                nombre: "Limonada",
                precio: 19.99,
                imagen: "./assets/images/Driks/limonada.jpg",
                categoria: "bebidas",
                descripcion: "Limonada Frozzen.",
                stock: 10
            },
            {
                id: 25,
                nombre: "Galletas de Mantequilla",
                precio: 3.99,
                precioOriginal: 5.99, // Precio antes del descuento
                descuento: "15%",       // Porcentaje de descuento
                esOferta: true,         // Indica que es una oferta
                imagen: "./assets/images/Dulces/galletasdemantequilla.jpg",
                categoria: "tortas",
                descripcion: "Galletas de Matequilla, cubiertas de glaseado temático.",
                stock: 10
            },


            // ... resto de productos
        ];
        this.ofertas = [
            {
                id: 30,
                nombre: "Galletas de Mantequilla",
                precio: 3.99,
                precioOriginal: 4.99,
                descuento: "15%",
                imagen: "./assets/images/Dulces/galletasdemantequilla.jpg",
                categoria: "tortas",
                descripcion: "Galleta de Mantequilla, con glaseado temático.",
                stock: 10
            },
            // Agrega más ofertas aquí
        ];
        
    }
    async getOffers() {
        try {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(this.ofertas);
                }, 500);
            });
        } catch (error) {
            console.error('Error al cargar ofertas:', error);
            throw error;
        }
    }
    async getProducts() {
        try {
            // Simulamos una llamada API
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(this.productos);
                }, 500);
            });
        } catch (error) {
            console.error('Error al cargar productos:', error);
            throw error;
        }
    }
    
    async getProductsByCategory(categoria) {
        const productos = await this.getProducts();
        return categoria === 'todos' 
            ? productos 
            : productos.filter(p => p.categoria === categoria);
    }

    async getProductById(id) {
        const productos = await this.getProducts();
        return productos.find(p => p.id === parseInt(id));
    }
    
}
