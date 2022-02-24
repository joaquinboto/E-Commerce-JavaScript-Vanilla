//DOM
let nombreProducto = document.querySelector(".producto-title")
let precioProducto = document.querySelector(".precio-producto")
let btnProducto = document.querySelectorAll(".btnProducto")
let imagenProducto = document.querySelector(".imagen-producto")
let divCarrito = document.querySelector(".carrito")
let arrayPrecio = []

//FUNCION EVENTO ENVIAR AL CARRITO
const tomarInfo = (e) => {
    e.preventDefault();
    const boton = e.target
    const productos = boton.closest(".producto1")
    let precioProducto = productos.querySelector(".precio-producto").textContent
    let imagenProducto = productos.querySelector(".imagen-producto").src
    let nombreProducto = productos.querySelector(".producto-title").textContent

    function remplazar (precioProducto) {
        let precioTotal = Number(precioProducto.replace('Precio $' , ''));
        arrayPrecio.push(precioTotal)
        console.log(arrayPrecio);
    }

    remplazar(precioProducto)

    //objetos y metodos en el evento
    const productosVarios = new Product ({imagen: imagenProducto , nombre: nombreProducto , precio: precioProducto, value: 1})
    const ui = new UI ()
    ui.addProduct(productosVarios) //LLAMANDO METODO Y ENVIANDO OBJETO
    ui.sumarProducto(precioProducto) //LLAMANDO METODO Y SUMANDO PRODUCTO 
}

//EVENTOS
btnProducto.forEach(element => {
    element.addEventListener("click", tomarInfo)
});

divCarrito.addEventListener('click' , function (e) {
    const ui = new UI ()
    ui.deleteProduct(e.target)
    ui.restarProducto()
})

//CLASE DE PRODUCTO
class Product {
    
    constructor(productos) {
        this.image= productos.imagen
        this.nombre= productos.nombre
        this.precio= productos.precio
        this.value = productos.value
    }

}

//CLASE DE INTERFAZ
class UI {

    //AGREGAR PRODUCTO
    addProduct(productosVarios) {
    //   this.clearHTML ();
      const row = document.createElement("div")
      row.innerHTML = `<div class="producto2 row d-flex flex-row">
      <div class="col-3 d-flex flex-column">
      <strong>Producto:</strong>
      <div class="d-flex align-items-center justify-content-between">
      <img class="imagen-producto w-25" src=${productosVarios.image} alt="">
      <h5 class="producto-title">${productosVarios.nombre}</h5>
      </div>
      </div>
      <div class="col-3 d-flex justify-content-center align-items-center">
      <h6 class="precio-producto">${productosVarios.precio}</h6>
      </div>
      <div class="col-3">
      <div class="d-flex justify-content-center">
      <input style="width:40px" class="mx-3" type="number" value="1" class="inputControl">
      <a href="#" class="btn btn-danger my-3" name="delete"> Delete <a/>
      </div>
      </div>
      </div>`
      divCarrito.appendChild(row)
      
    }

    //BORRAR PRODUCTO
    deleteProduct(element) {
        if (element.name === 'delete' ) {
            element.parentElement.parentElement.parentElement.remove();
            console.log(element);
        }
    }
    
    //SUMA DEL TOTAL
    sumarProducto() {
        let total = arrayPrecio.reduce((acum , item) => 
            acum = acum + item , 0
        )
        let rowCarrito = document.querySelector(".price")
        rowCarrito.innerHTML = `<p>Total: <strong>${total}</strong></p>`
    }

    restarProducto () {
      
    }

    //LIMPIAR HTML PARA QUE NO SE DUPLIQUE
    // clearHTML () {
    //   divCarrito.innerHTML = ''
    // }
}

//OBJETOS
const ui = new UI ()
const producto1 = new Product ({imagen: imagenProducto , nombre: nombreProducto , precio: precioProducto, id: 1})







