const producto2 = [
  { nombre: "Remera",
precio: 3000,
imagen: `src="./assets/zapatillas.jpeg"`}
]




const carritoDeCompras = document.querySelector(".carrito")
producto2.forEach(element => {
  const productos = document.createElement ("div")
  productos.className = "carrito"
  productos.innerHTML= `<img  class="imagenCarrito" ${element.imagen} alt="">
  <strong>${element.nombre}</strong>
  <h6 class="precioCarrito">Precio: $${element.precio}</h6>
  <button class="btn-delete">X</button>`
  carritoDeCompras.appendChild(productos)
}
);

