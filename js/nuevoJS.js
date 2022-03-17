//DOM 
let divCarrito = document.querySelector(".dvProductoCarrito") //DIV PRODUCTOS CARRITO
let containerGrid = document.querySelector(".grid-container") //DIV CONTENEDOR DE JSON
let carrito = {} 
let price = document.getElementById("divTotalProducto") //DIV TOTAL PRODUCTOS
let searchProduct = document.querySelector(".form-control")
let filtro = document.querySelector(".filtro")
let contadorCarrito = document.querySelector('.badge')
let filterName = document.querySelector('#filterName')


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
.then(resultado => {
  let arreglo = resultado
  if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'))
    updateCarrito()
  }

  //PINTANDO PRODUCTOS DEL JSON
  const pintar = () => {
  arreglo.forEach(product => {
    const row = document.createElement("div");
    row.classList.add('producto')
    row.innerHTML = `
            <img class="imagenProducto" src="${product.imagen}" alt="">
            <strong class="nombreProducto">${product.nombre}</strong>
            <strong class="precioProducto">Precio: $${product.precio}</strong>
            <button class="btn btn-dark"">
            <a class="btnProducto" href="">Agregar al carrito</a>
            </button>`
            //DECLARANDO BOTON Y ASIGNANDOLE EVENTO PARA ENVIAR INFO AL CARRITO
            let btnAgregar = row.querySelector(".btn")
            btnAgregar.setAttribute('data-id' , product.id)
            btnAgregar.addEventListener('click', buscarObjeto)
            containerGrid.appendChild(row)
  })
}
  pintar()
  
  //FUNCION BUSQUEDA
  const filtrar = () => {
    const texto = searchProduct.value.toLowerCase()
    arreglo.forEach(product => {
      let nombre = product.nombre.toLowerCase()
      if (nombre.indexOf(texto) !== -1) {
        filtro.innerHTML =  `
        <div class= "producto">
        <img class="imagenProducto" src="${product.imagen}" alt="">
        <strong class="nombreProducto">${product.nombre}</strong>
        <strong class="precioProducto">Precio: $${product.precio}</strong>
        <button class="btn btn-dark"">
        <a class="btnProducto" href="">Agregar al carrito</a>
        </button></div>`
        //DECLARANDO BOTON Y ASIGNANDOLE EVENTO PARA ENVIAR INFO AL CARRITO
        let btnAgregar = filtro.querySelector(".btn")
        btnAgregar.setAttribute('data-id' , product.id)
        btnAgregar.addEventListener('click', buscarObjeto)
        containerGrid.innerHTML = ''
      }
    })
    if (texto == '') {
    filtro.innerHTML = ''
    pintar()
    }
}

    //EVENTO BUSQUEDA
    searchProduct.addEventListener('keyup', filtrar)


    //EVENTO FILTRADO POR NOMBRE
    filterName.addEventListener('click' , (e) => {
      e.preventDefault()
      arreglo.sort((a,b) => {
      
        if (a.nombre < b.nombre) {
          return -1
        }

        if (a.nombre > b.nombre) {
          return 1
        }

        return 0
      })
      containerGrid.innerHTML = ''
      pintar()
    })
})


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


  Toastify({

    text: "Producto añadido al carrito",
    style: {
      background: "black",
    },
    gravity: 'bottom',
    duration: 3000
    
    }).showToast();

  updateCarrito() 
}


const updateCarrito = () => {
  divCarrito.innerHTML = '' //LIMPIANDO HTML

  //ITERANDO SOBRE EL OBJETO PARA PINTAR EN EL CARRITO
  Object.values(carrito).forEach(product => {
    const rowCarrito = document.createElement("div");
    rowCarrito.classList.add('productoCarrito');
    rowCarrito.innerHTML = `
    <img class="imagenProductoCarrito" src="${product.imagen}" alt="">
    <strong class="nombreProductoCarrito">${product.nombre}</strong>
    <strong class="precioProducto">$${product.precio}</strong>
    <button class="btn btn-primary btnAumentar" data-id="${product.id}">+</button>
    <strong> ${product.cantidad}</strong>
    <button class="btn btn-danger btnRestar" data-id= "${product.id}">-</button>
    <button class="btn btn-dark btnDelete" data-id= "${product.id}">X</button>
    `
    divCarrito.prepend(rowCarrito);

  })

  

  contadorCarrito.innerHTML = ''

  //LOCALSTORAGE
  localStorage.setItem('carrito', JSON.stringify(carrito))
  sumarCarrito()
}


// SUMANDO CANTIDAD Y PRECIO
function sumarCarrito() {
  price.innerHTML = ''

  if (Object.keys(carrito).length === 0) {
    price.innerHTML = `<div>
    <strong class="price">Carrito Vacio</strong>
    </div>`
    return
  }

  const cantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad ,0)
  const precio = Object.values(carrito).reduce((acc , {cantidad , precio}) => acc + cantidad * precio , 0)
  price.innerHTML = `<div class="footerCarrito">
  <strong class="subtotalProductos">Subtotal: $${precio}</strong>
  <strong class="price">Cantidad de productos: ${cantidad}</strong>
  <button class="btn btn-danger" id="vaciarCarrito">Vaciar carrito</button>
  <button class="btn btn-success" id="successCompra">Comprar</button>
</div>
  `

  contadorCarrito.innerHTML = `${cantidad}`
  
  // VACIANDO CARRITO
  let vaciarCarrito = document.getElementById('vaciarCarrito')
  vaciarCarrito.addEventListener('click' , () => {
    Swal.fire({
      title: 'Estas seguro de eliminar los productos',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Productos eliminados'
        )
        carrito = {}
        updateCarrito()
      }
    })

  })

}

// FUNCION AUMENTAR , REDUCIR y ELIMINAR PRODUCTOS 
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

  if (e.target.classList.contains('btnDelete')) {
    delete carrito[e.target.dataset.id]
    
  }
  updateCarrito()
}




