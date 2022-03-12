//DOM 
let divCarrito = document.querySelector(".offcanvas-body") //DIV PRODUCTOS CARRITO
let containerGrid = document.querySelector(".grid-container") //DIV CONTENEDOR DE JSON
let carrito = {} 
let price = document.getElementById("divTotalProducto") //DIV TOTAL PRODUCTOS
let btnPrueba = document.querySelector(".btnPrueba")

//EVENTOS

divCarrito.addEventListener('click', e => {
  btnAumentarRestar(e)
})



//------------------JSON------------------

const insertarProductos = () => {
  return fetch('productos.json')
}
insertarProductos()
.then(busqueda => busqueda.json())
.then(resultado => resultado.forEach(product => {
  if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
    updateCarrito()
  }
  let row = document.createElement('div')
  row.classList.add('producto')
  row.innerHTML = `
  <img class="imagenProducto" src="${product.imagen}" alt="">
  <strong class="nombreProducto">${product.nombre}</strong>
  <strong class="precioProducto">Precio: $${product.precio}</strong>
  <button class="btn btn-dark"">
  <a class="btnProducto" href="">Agregar al carrito</a>
  </button>`
  containerGrid.appendChild(row) //PINTANDO PRODUCTOS DESDE EL JSON



  //DECLARANDO BOTON Y ASIGNANDOLE EVENTO PARA ENVIAR INFO AL CARRITO
  let btnAgregar = row.querySelector(".btn")
  btnAgregar.setAttribute('data-id' , product.id)
  btnAgregar.addEventListener('click', buscarObjeto)
  })
)


//FUNCIONES//
function buscarObjeto (e) {
  e.preventDefault()
  let boton = e.target.parentElement.parentElement
  let infoProduct = {
      nombre: boton.querySelector(".nombreProducto").textContent,
      imagen: boton.querySelector(".imagenProducto").src,
      precio: Number(boton.querySelector(".precioProducto").textContent.replace('Precio: $' , '')),
      id: Number(boton.querySelector(".btn").dataset.id),
      cantidad: 1
  }
  //Comprobando si tiene las mismas propiedades
  if (carrito.hasOwnProperty(infoProduct.id)) {
    infoProduct.cantidad = carrito[infoProduct.id].cantidad + 1  //SI EL VALOR ES TRUE, SUMA LA CANTIDAD AL OBJETO
  }

  carrito[infoProduct.id] = {...infoProduct} //INDEXANDO OBJETO

  updateCarrito() //BUSCANDO OBJETO CARRITO
}


const updateCarrito = () => {
  divCarrito.innerHTML = '' //LIMPIANDO HTML
  //ITERANDO SOBRE EL OBJETO PARA PINTAR EN EL CARRITO
  Object.values(carrito).forEach(product => {
    const rowCarrito = document.createElement("div");
    rowCarrito.classList.add('productoCarrito')
    rowCarrito.innerHTML = `
    <strong>PRODUCTOS:</strong>
    <img class="imagenProductoCarrito" src="${product.imagen}" alt="">
    <strong class="nombreProductoCarrito">${product.nombre}</strong>
    <strong class="precioProducto">$${product.precio}</strong>
    <button class="btn btn-primary btnAumentar" data-id="${product.id}">+</button>
    <button class="btn btn-danger btnRestar" data-id= "${product.id}">-</button>
    `
    divCarrito.prepend(rowCarrito)
  })
  localStorage.setItem('carrito', JSON.stringify(carrito))
  sumarCarrito()
}


// SUMANDO CANTIDAD Y PRECIO
function sumarCarrito() {
  price.innerHTML = ''
  if (Object.keys(carrito).length === 0) {
    price.innerHTML = `<div class="row" id="divTotalProducto">
    <p class="price">Carrito Vacio</p>
    </div>`
    return
  }

  const cantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad ,0)
  const precio = Object.values(carrito).reduce((acc , {cantidad , precio}) => acc + cantidad * precio , 0)
  price.innerHTML = `<p class="price">Total $${precio}</p>
  <p class="price">Cantidad de productos $${cantidad}</p>
  <button class="btn btn-danger" id="vaciarCarrito">VACIAR CARRITO</button>
  `


  // VACIANDO CARRITO
  let vaciarCarrito = document.getElementById('vaciarCarrito')
  vaciarCarrito.addEventListener('click' , () => {
    carrito = {}
    updateCarrito()
  })

}

// FUNCION AUMENTAR Y REDUCIR 
const btnAumentarRestar = e => {
  if (e.target.classList.contains('btnAumentar')) {
    const producto = carrito[e.target.dataset.id]
    producto.cantidad++
    carrito[e.target.dataset.id] = {...producto}
  }

  if (e.target.classList.contains('btnRestar')) {
    const producto = carrito[e.target.dataset.id]
    producto.cantidad--
    if (producto.cantidad == 0) {
      delete carrito[e.target.dataset.id]
    }
  }


  updateCarrito()
}




