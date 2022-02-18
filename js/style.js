let allContainerCart = document.querySelector('.div-contenedor');
let containerBuyCart = document.querySelector('.carrito');


//Array
const arrayProductos = []
const arrayProductosCopia = Object.assign([] , arrayProductos )
//Funciones
loadEventos()
function loadEventos() {
    allContainerCart.addEventListener("click",addProducto)
}

function addProducto(e) {
    e.preventDefault()
    if (e.target.classList.contains("btn-add-cart")) {
        const selectProduct = e.target.parentElement
        readTheContent(selectProduct)
    }
}

function readTheContent(producto) {
    const arrayProductos = {
        image: producto.querySelector("div img").src,
        title: producto.querySelector("div h5").textContent,
        price: producto.querySelector("div h6").textContent,
        id: producto.querySelector("div a").getAttribute("data-id"),
        cantidad: 1,
    }
    const arrayProductosCopia = Object.assign([] , arrayProductos )
    console.log(arrayProductosCopia);
    loadHTML()
}

function loadHTML() {
    arrayProductosCopia.forEach(producto => {
        console.log(producto);
        const row = document.createElement("div");
        row.innerHTML = `
        <img class="imagen-producto" ${image.product} alt="">
                    <h5>${title.producto}</h5>
                    <h6 class="precio-producto">${price.producto}</h6>
                    <a href="" data-id="${id.producto}" class="btn-add-cart">ADD TO CART</a>
                    <p>${cantidad}</p>`
        containerBuyCart.appendChild(row);
    });
}