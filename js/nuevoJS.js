//DOM 
let btnProducto = document.querySelectorAll(".btnProducto")
let imagenProducto = document.querySelector(".imagen-producto")
let divCarrito = document.querySelector(".offcanvas-body")
let containerGrid = document.querySelector(".grid-container")
let carrito = {}
let price = document.getElementById("divTotalProducto")

//------------------JSON------------------

const insertarProductos = () => {
  return fetch('productos.json')
}
insertarProductos()
.then(busqueda => busqueda.json())
.then(resultado => resultado.forEach(product => {
  let row = document.createElement('div')
  row.classList.add('producto')
  row.innerHTML = `
  <img class="imagenProducto" src="${product.imagen}" alt="">
  <strong class="nombreProducto">${product.nombre}</strong>
  <strong class="precioProducto">Precio: $${product.precio}</strong>
  <button class="btn btn-dark"">
  <a class="btnProducto" href="">Agregar al carrito</a>
  </button>`
  containerGrid.appendChild(row)

  //DECLARANDO BOTON Y ASIGNANDOLE EVENTO PARA ENVIAR INFO AL CARRITO
  let btnAgregar = row.querySelector(".btn")
  btnAgregar.setAttribute('value' , product.id)
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
      id: boton.querySelector(".btn").value,
      cantidad: 1
  }

  if (carrito.hasOwnProperty(infoProduct.id)) {
    infoProduct.cantidad = carrito[infoProduct.id].cantidad + 1
  }
  carrito[infoProduct.id] = {...infoProduct}
  updateCarrito(carrito)
}

function updateCarrito (carrito) {
  clear()
  Object.values(carrito).forEach(product => {
    const rowCarrito = document.createElement("div");
    rowCarrito.classList.add('productoCarrito')
    rowCarrito.innerHTML = `
            <img class="imagenProductoCarrito" src="${product.imagen}" alt="">
            <strong class="nombreProductoCarrito">${product.nombre}</strong>
            <strong class="precioProducto">$${product.precio}</strong>
            
            <button class="btn btn-dark"">
                <a class="btnCarrito" name="delete" href="">X</a>
            </button>
    `
    divCarrito.prepend(rowCarrito)

  })
  
  sumarCarrito()
}

function clear() {
  divCarrito.innerHTML = ''
}

function sumarCarrito() {
  
  const cantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad ,0)
  const precio = Object.values(carrito).reduce((acc , {cantidad , precio}) => acc + cantidad * precio , 0)
  price.innerHTML = `<p class="price">Total $${precio}</p>
  <p class="price">Cantidad de productos $${cantidad}</p>`
}