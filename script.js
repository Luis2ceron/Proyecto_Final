// Función para agregar productos al carrito
function agregarAlCarrito(id, nombre, precio, imagen) {
    // Obtenemos el carrito actual desde localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Creamos un objeto producto
    const producto = { id, nombre, precio, imagen };

    // Agregamos el producto al carrito
    carrito.push(producto);

    // Guardamos el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Notificamos al usuario que el producto se ha agregado al carrito
    alert(`${nombre} ha sido agregado al carrito.`);
}

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
    // Obtenemos el carrito actual desde localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Obtenemos el elemento HTML donde se mostrará el carrito
    const listaCarrito = document.getElementById('lista-carrito');

    // Limpiamos la lista actual
    listaCarrito.innerHTML = '';

    // Iteramos sobre los productos en el carrito y los agregamos a la lista
    carrito.forEach((producto, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px;">
            ${producto.nombre} - $${producto.precio}
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        listaCarrito.appendChild(li);
    });
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(index) {
    // Obtenemos el carrito actual desde localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Eliminamos el producto del carrito según su índice
    carrito.splice(index, 1);

    // Guardamos el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizamos la visualización del carrito
    actualizarCarrito();
}

// Llamamos a la función actualizarCarrito si estamos en la página del carrito
if (document.getElementById('lista-carrito')) {
    actualizarCarrito();
}