//DOM
let nombreProducto = document.querySelector(".producto-title")
let precioProducto = document.querySelector(".precio-producto")
const btnProducto = document.querySelector(".btnProducto")
let imagenProducto = document.querySelector(".imagen-producto")
let divCarrito = document.querySelector(".carrito")


console.log(btnProducto);
//EVENTOS
btnProducto.addEventListener("click", function(e) {
    e.preventDefault();
    if (e.target.classList.contains("btnProducto")) {
        let precioProducto = document.querySelector(".precio-producto").textContent
        let imagenProducto = document.querySelector(".imagen-producto").src
        let nombreProducto = document.querySelector(".producto-title").textContent
        const producto1 = new Product ({imagen: imagenProducto , nombre: nombreProducto , precio: precioProducto, id: 1})
        const ui = new UI ()
        ui.addProduct(producto1)
    }
})

//CLASE DE PRODUCTO
class Product {
    
    constructor(producto) {
        this.image= producto.imagen
        this.nombre= producto.nombre
        this.precio= producto.precio
        this.id = producto.id
    }
}

class UI {

    addProduct(producto1) {
        const row = document.createElement("div")
        row.innerHTML = ` <div class="producto3">
        <img class="imagen-producto" src=${producto1.imagen} alt="">
        <h5 class="producto-title">${producto1.nombre}</h5>
        <h6 class="precio-producto">${producto1.precio}</h6>
        <button class="btn-add-cart">AGREGAR</button>
    </div>`
        divCarrito.appendChild(row)
    }

}

const producto1 = new Product ({imagen: imagenProducto , nombre: nombreProducto , precio: precioProducto, id: 1})


//FUNCION RECIBIR INFORMACION


//AGREGAR PRODUCTO


//FUNCION ENVIAR AL CARRITO







