const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaProductos = document.querySelector("#lista-productos");
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
    listaProductos.addEventListener("click", agregarProducto);
  
    //Eliminar cursos del carrito
    carrito.addEventListener("click", eliminarProducto);
  
    //Vaciando el carrito
  
    vaciarCarritoBtn.addEventListener("click", () => {
      articulosCarrito = [];
  
      limpiarHTML();
    });
}

function agregarProducto(e) {
    e.preventDefault();
  
    if (e.target.classList.contains("agregar-carrito")) {
      const productoSeleccionado = e.target.parentElement;
      leerDatosProducto(productoSeleccionado);
    }  
}

function eliminarProducto(e) {
    e.preventDefault();
    // console.log(e.target.classList);
    if (e.target.classList.contains("borrar-producto")) {
      const productoID = e.target.getAttribute("id");
  
      //Eliminar del arreglo de articulosCarrito por el id
      articulosCarrito = articulosCarrito.filter((producto) => producto.id !== productoID);
  
      carritoHTML();
    }
}

function leerDatosProducto(producto) {
    const infoProducto = {
      imagen: producto.querySelector("img").src,
      titulo: producto.querySelector(".card-title").innerText,
      precio: producto.querySelector("h6").innerText,
      id: producto.querySelector("a").getAttribute("id"),
      cantidad: 1,
    };
    const existe = articulosCarrito.some((producto) => producto.id === infoProducto.id);
  if (existe) {
    //Actualizamos la cantidad
    const productos = articulosCarrito.map((producto) => {
      if (producto.id === infoProducto.id) {
        producto.cantidad++;
        return producto; // retorna objeto actualizado
      } else {
        return producto; // retorna los objetos que no son duplicados
      }
    });
    articulosCarrito = [...productos];
  } else {
    //Agregar elementos al arreglo del carrito
    articulosCarrito = [...articulosCarrito, infoProducto];
  }
  carritoHTML();
}

function carritoHTML() {
    //Limpiar el HTML
    limpiarHTML();
  
    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach((producto) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${producto.titulo}</td>
      <td>${producto.precio}</td>
      <td>${producto.cantidad}</td>
      <td>
      <a href="" class="borrar-producto" id="${producto.id}">x</a>
      </td>`;
      //Agrega el HTML del carrito en el tbody
      contenedorCarrito.appendChild(row);
    });
}

function limpiarHTML() {
    contenedorCarrito.innerHTML = "";
}