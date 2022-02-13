let contenedor = document.querySelector(".div-contenedor")
let producto1 = document.querySelector(".producto1")

let array = []

array.push(producto1)

console.log(array);

function load() {
    contenedor.addEventListener('click', agregar)
}
load()

function agregar(e) {
    e.preventDefault()
    if (e.target.classList.contains('btn-cart')) {
        console.log(e.target);
    }
}

const carrito = document.querySelector(".add-tocart")


carrito.appendChild(array)


