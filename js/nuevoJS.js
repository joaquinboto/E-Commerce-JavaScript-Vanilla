//DOM 
let btnProducto = document.querySelectorAll(".btnProducto")
let imagenProducto = document.querySelector(".imagen-producto")
let divCarrito = document.querySelector(".offcanvas-body")
let arreglo = []
let containerGrid = document.querySelector(".grid-container")



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
      id: boton.querySelector(".btn").value
  }
  console.log(infoProduct);


  // const existe = arreglo.some ((product) => product.nombre === infoProduct.nombre )

  // //TRUE O FALSE
  // if (existe)  {
  //     const nuevoArreglo = arreglo.map ((e) => {
  //     if (e.nombre === infoProduct.nombre) {
  //       e.value++
  //       return e
  //     }
  //     else {
  //       return e
  //     }
  //   })
  //   arreglo = [... nuevoArreglo] //TRUE 
  // }
  //     else {
  //       arreglo = [...arreglo , infoProduct] //FALSE
  //       }
        
  // updateCarrito (arreglo) //buscando datos de producto
}

//--------------PINTAR PRODUCTOS-----------------
// function updateCarrito (arreglo){
//   clear()
//   arreglo.forEach(productosVarios => {
//     const {nombre , imagen , precio , cantidad} = productosVarios
//         let rowCarrito = document.createElement('div')
//         rowCarrito.classList.add('productoCarrito')
//         rowCarrito.innerHTML = `
//                 <img class="imagenProductoCarrito" src="${imagen}" alt="">
//                 <strong class="nombreProductoCarrito">${nombre}</strong>
//                 <strong class="precioProducto">${precio}</strong>
//                 <input class="inputControl mx-3" style="width:40px" type="number" value="${cantidad}">
//                 <button class="btn btn-dark">
//                     <a class="btnCarrito" name="delete" href="">X</a>
//                 </button>
//         `
//         divCarrito.prepend(rowCarrito)

//     //------------EVENTO BORRAR PRODUCTO Y PRECIO---------------------
//     rowCarrito.querySelector(".btn").addEventListener("click", (e) => {
//         const botonDelete = e.target 
//         botonDelete.closest(".productoCarrito").remove();  //BORAR PRODUCTO
//         // Swal.fire({
//         //   title: 'Estas seguro?',
//         //   text: "",
//         //   icon: 'warning',
//         //   showCancelButton: true,
//         //   confirmButtonColor: '#3085d6',
//         //   cancelButtonColor: '#d33',
//         //   confirmButtonText: 'Si, eliminar'
//         // }).then((result) => {
//         //   if (result.isConfirmed) {
//         //     Swal.fire(
//         //       'Articulo eliminado',
//         //       'Eliminaste tu producto',
//         //       'success'
//         //     )
//         //   }
//         // })
//         sumarProducto()//--------RESTANDO PRECIO--------
//     })
    
//       rowCarrito.querySelector(".inputControl").addEventListener('change' , (e) => {
//         const input = e.target
//         input.value <= 0 ? input.value = 1 : null;
//         sumarProducto()//------SUMANDO INPUT---------
//       })
//   })
//     sumarProducto()//---------SUMAR PRECIO----------
// }

// //FORMATEANDO HTML
// function clear() {
//   divCarrito.innerHTML = ''
// }
// //-------------SUMA DE PRODUCTOS-----------
// function sumarProducto() {
//     let total = 0 
//     let precioTotal = document.querySelector(".price")
//     const items = document.querySelectorAll(".productoCarrito")
//     items.forEach (items => {
//         let elementoPrecio = Number(items.querySelector(".precioProducto").textContent.replace("Precio: $" , ''))
//         console.log(elementoPrecio);
//         const cantidad = Number(items.querySelector(".inputControl").value)
//         total = total + elementoPrecio * cantidad
//     })
//     precioTotal.innerHTML = `Total $${total}`
// }


