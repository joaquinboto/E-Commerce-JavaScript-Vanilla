//DOM 
let nombreProducto = document.querySelector(".producto-title")
let precioProducto = document.querySelector(".precio-producto")
let btnProducto = document.querySelectorAll(".btnProducto")
let imagenProducto = document.querySelector(".imagen-producto")
let divCarrito = document.querySelector(".carrito")
//EVENTOS

btnProducto.forEach(element => {
        element.addEventListener("click", eventoBoton);}
        )

function eventoBoton (evento) {
    let boton = evento.target
    const productos = boton.closest(".producto1")
    const nombre = productos.querySelector(".producto-title").textContent
    const imagen = productos.querySelector(".imagen-producto").src
    const precio = productos.querySelector(".precio-producto").textContent
    updateCarrito (nombre, imagen , precio)
}

//PINTAR PRODUCTOS
function updateCarrito (nombre , imagen, precio){
 
    const row = document.createElement("div");
    row.className = "divBien"
    row.innerHTML = 
    `<div class="producto2 row d-flex flex-row">
    <div class="col-3 d-flex flex-column">
    <strong>Producto:</strong>
    <div class="d-flex align-items-center justify-content-between">
    <img class="imagen-producto w-25" src=${imagen} alt="">
    <h5 class="producto-title">${nombre}</h5>
    </div>
    </div>
    <div class="col-3 d-flex justify-content-center align-items-center">
    <h6 class="precio-producto">${precio}</h6>
    </div>
    <div class="col-3">
    <div>
    <input class="inputControl" style="width:40px" class="m-4" type="number" value="1" >
    <a href="#" class="btn btn-danger" name="delete"> Delete <a/>
    </div>
    </div>
    </div>`
    divCarrito.appendChild(row)
    
    
    //EVENTO BORRAR PRODUCTO Y PRECIO
    row.querySelector(".btn").addEventListener("click", (e) => {
        const botonDelete = e.target
        botonDelete.closest(".producto2").remove();
        sumarProducto()
    })
    
      row.querySelector(".inputControl").addEventListener('change' , (e) => {
        const input = e.target
        input.value <= 0 ? (input.value = 1) : null
        sumarProducto()//SUMANDO INPUT
      })

    
    sumarProducto()//SUMAR PRECIO
}

//SUMA DE PRODUCTOS
function sumarProducto() {
    let total = 0 
    let precioTotal = document.querySelector(".price")
    const items = document.querySelectorAll(".producto2")
    items.forEach (items => {
        let elementoPrecio = Number(items.querySelector(".precio-producto").textContent.replace("Precio $" , ""))
        const cantidad = Number(items.querySelector(".inputControl").value)
        total = total + elementoPrecio * cantidad
    })
    precioTotal.innerHTML = `$${total}`
}


