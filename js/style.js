
const carrito = document.querySelector(".add-tocart")
let contenedor = document.querySelector(".div-contenedor")

function load() {
    contenedor.addEventListener('click', presionar)
}
load()

function presionar(e) {
    e.preventDefault()
    if (e.target.classList.contains('btn-cart')) {
        console.log(e.target);
    }
}








