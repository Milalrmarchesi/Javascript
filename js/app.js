//let productos = ["Laptop", "Mouse", "Teclado"];
//let precios = [1000, 50, 80];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


let productos = [];

fetch('data/productos.json')
  .then(response => response.json())
  .then(data => {
    productos = data;
    llenarSelect();
    mostrarCarrito();
  });

function llenarSelect() {
  const select = document.getElementById("producto");
  select.innerHTML = "";
  productos.forEach((producto, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.text = `${producto.nombre} - $${producto.precio}`;
    select.appendChild(option);
  });
}


function mostrarMensaje(texto) {
    document.getElementById("mensaje").innerText = texto;
}

function agregarAlCarrito() {
    let productoSeleccionado = document.getElementById("producto").value;
    const cantidad = parseInt(document.getElementById("cantidad").value);

    if (cantidad > 0) {
        //let nombreProducto = productos[productoSeleccionado];
        //let precioProducto = precios[productoSeleccionado];
        let producto = productos[productoSeleccionado];
        let nombreProducto = producto.nombre;
        let precioProducto = producto.precio;

        let subtotal = precioProducto * cantidad;

        let actualizado = false;
        for (let i = 0; i < carrito.length; i++) {
            if (carrito[i].producto == nombreProducto) {
                carrito[i].cantidad += cantidad;
                carrito[i].subtotal = precioProducto * carrito[i].cantidad;
                actualizado = true;
                break;
            }
        }

        if (!actualizado) {
            carrito.push({ producto: nombreProducto, cantidad: cantidad, subtotal: subtotal });
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
        //mostrarMensaje(`${cantidad} ${nombreProducto} agregado(s) al carrito`);
        Swal.fire({
            icon: 'success',
            title: 'Producto agregado',
            text: `${cantidad} ${nombreProducto} agregado(s) al carrito`
        });
          
    } else {
        mostrarMensaje("Por favor, ingrese una cantidad válida.");
    }
}

function mostrarCarrito() {
    let tablaCarrito = document.getElementById("carrito");
    tablaCarrito.innerHTML = "";
  
    carrito.forEach((item, index) => {
      let fila = `<tr>
        <td>${item.producto}</td>
        <td>${item.cantidad}</td>
        <td>$${item.subtotal.toFixed(2)}</td>
        <td><button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">❌</button></td>
      </tr>`;
      tablaCarrito.innerHTML += fila;
    });
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
    Swal.fire({
      icon: 'info',
      title: 'Producto eliminado',
      text: 'Se eliminó un producto del carrito.'
    });
  }
  

  function vaciarCarrito() {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se eliminarán todos los productos del carrito.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, vaciar"
    }).then((result) => {
      if (result.isConfirmed) {
        carrito = [];
        localStorage.removeItem("carrito");
        mostrarCarrito();
        document.getElementById("total").innerText = "";
        Swal.fire("¡Carrito vaciado!", "Puedes empezar una nueva compra.", "success");
      }
    });
  }
  
  

function calcularTotal() {
    let totalCalculado = carrito.reduce((sum, item) => sum + item.subtotal, 0);
    document.getElementById("total").innerText = "Total a pagar: $" + totalCalculado.toFixed(2);
}

//mostrarCarrito();
