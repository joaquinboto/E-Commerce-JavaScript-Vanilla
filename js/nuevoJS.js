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
    row.className = "producto2"
    row.innerHTML = 
    `
    <!--DIV IMAGEN Y NOMBRE -->
    <div class="mockup1">
          <strong>PRODUCTO:</strong>
          <img class="imagen-producto" src="${imagen}" alt="">
          <h5 class="producto-title">${nombre}</h5>
    </div>

          <!--DIV PRECIO-->
          <div class="mockup2">
            <strong class="precio-producto">${precio}</strong>
          </div>

          <!--DIV INPUT Y BOTON-->
                <div class="mockup3">
                    <input class="inputControl mx-3" style="width:40px" type="number" value="1" >
                    <a href="#" class="btn btn-danger" name="delete"> Delete <a/>
                </div>
  `
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


