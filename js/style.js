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
    sendFuncion()
}

function sendFuncion() {
    const infoProducto = document.createElement("div")
    infoProducto.innerHTML = ` <div class="dv-img-producto">
    <img src="./assets/conjuntobasico.jpeg" alt="">
    </div>
    <div class="product-item-details">
      <h5>Conjunto Basico</h5>
      <h6>$8000</h6>
      <button class="btn-cart">ADD TO CART</button>
    </div>`
    carrito.appendChild(infoProducto)
}






