let productos = ["Laptop", "Mouse", "Teclado"];
let precios = [1000, 50, 80];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarMensaje(texto) {
    document.getElementById("mensaje").innerText = texto;
}

function agregarAlCarrito() {
    let productoSeleccionado = document.getElementById("producto").value;
    const cantidad = parseInt(document.getElementById("cantidad").value);

    if (cantidad > 0) {
        let nombreProducto = productos[productoSeleccionado];
        let precioProducto = precios[productoSeleccionado];
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
        mostrarMensaje(`${cantidad} ${nombreProducto} agregado(s) al carrito`);
    } else {
        mostrarMensaje("Por favor, ingrese una cantidad válida.");
    }
}

function mostrarCarrito() {
    let tablaCarrito = document.getElementById("carrito");
    tablaCarrito.innerHTML = "";

    for (let i = 0; i < carrito.length; i++) {
        let item = carrito[i];
        let fila = `<tr>
            <td>${item.producto}</td>
            <td>${item.cantidad}</td>
            <td>$${item.subtotal.toFixed(2)}</td>
        </tr>`;
        tablaCarrito.innerHTML += fila;
    }
}

function calcularTotal() {
    let totalCalculado = carrito.reduce((sum, item) => sum + item.subtotal, 0);
    document.getElementById("total").innerText = "Total a pagar: $" + totalCalculado.toFixed(2);
}

mostrarCarrito();
