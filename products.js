// data/products.js
export const categorias = [
    { id: "todos", nombre: "Todos" },
    { id: "tortas", nombre: "Dulces" },
    { id: "salados", nombre: "Salados" },
    { id: "bebidas", nombre: "Bebidas" }
];

export const productos = [
    {
        id: 1,
        nombre: "Torta de Frutos Rojos",
        precio: 149.99,
        imagen: "./assets/images/torta-frutos-rojos.jpg",
        categoria: "tortas",
        descripcion: "Deliciosa torta de 12 porciones con frutos rojos frescos",
        stock: 15
    },
    {
        id: 2,
        nombre: "Torta de Pistachos",
        precio: 159.99,
        imagen: "./assets/images/pistachos.png",
        categoria: "tortas",
        descripcion: "Torta cuatro cuartos de pistacho con chantilly",
        stock: 8
    },
    {
        id: 3,
        nombre: "Tarta de Chocolate y Frutos Rojos",
        precio: 179.99,
        imagen: "./assets/images/tarta-chocolate-frutos.jpg",
        categoria: "tortas",
        descripcion: "Tarta de chocolate con crema y frutos rojos frescos",
        stock: 10
    },
    {
        id: 4,
        nombre: "Empanadas de Carne",
        precio: 49.99,
        imagen: "./assets/images/empanadas.jpg",
        categoria: "salados",
        descripcion: "Docena de empanadas horneadas de carne",
        stock: 20
    },
    {
        id: 5,
        nombre: "Café Latte",
        precio: 29.99,
        imagen: "./assets/images/cafe-latte.jpg",
        categoria: "bebidas",
        descripcion: "Café con leche espumada",
        stock: 50
    }
];
