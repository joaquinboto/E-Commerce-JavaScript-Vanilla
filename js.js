alert ("Remera: $2500")
class GeneradorProductos {
    constructor(usuario) {
        this.nombre = usuario.name
        this.genero = usuario.genero
        this.precio = usuario.precio
    }
}

let productos = [
  new GeneradorProductos ({name: "remera roja" , genero: "femenino" , precio: 2500})
  ]

let CantidadDeProductos = Number(prompt ("INGRESE CUANTAS REMERAS QUIERE"))
const ValorProducto = productos.map( (ropa) => {
        
    return {
        nombre: ropa.nombre,
        precio: ropa.precio * CantidadDeProductos,
        genero: ropa.genero
    }
})


const TotalProductos = ValorProducto.reduce ((acum , elemento) => acum + elemento.precio,0 )
console.log(ValorProducto);

console.log(`El total a pagar es $ ${TotalProductos}`);