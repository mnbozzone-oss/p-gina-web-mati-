//  ARRAY PRINCIPAL DE PRODUCTOS QUE SE MUESTRAN EN LA TIENDA 
var suplementos = [
    {
        id: 1,
        nombre: "Whey Protein Ena True Made",
        descripcion: "TRUEMADE contiene un blend de máxima pureza con una rápida absorción y una excelente calidad, garantizando una efectiva y rápida recuperación del tejido muscular",
        precio: 45000,
        imagen: "img/whey-ena-truemade.jpg"
    },
    {
        id: 2,
        nombre: "Creatina Monohidratada Star Nutrition",
        descripcion: "Monohidrato de creatina para fuerza y rendimiento.",
        precio: 39999,
        imagen: "img/creatina.jpg"
    },
    {
        id: 3,
        nombre: "Pre Entreno C4",
        descripcion: "Pre-entreno legendario formulado para potenciar tu rendimiento, energía y concentración durante el entrenamiento.",
        precio: 25000,
        imagen: "img/pre-entreno.jpg"
    },
    {
        id: 4,
        nombre: "Just Plant Star Nutrition",
        descripcion: "Proteína a base de plantas para veganos.",
        precio: 34999,
        imagen: "img/Plantprotein.jpg"
    },
    {
        id: 5,
        nombre: "BCAA Optimun Nutrition",
        descripcion: "Aminoácidos ramificados para recuperación muscular.",
        precio: 24000,
        imagen: "img/BCAA.jpg"
    },
    {
        id: 6,
        nombre: "Multivitamínico MuscleTech",
        descripcion: "Complejo de vitaminas y minerales diarios.",
        precio: 20000,
        imagen: "img/Muscletech.jpg"
    }
];

var COSTO_ENVIO = 3500;

var gridProductosHTML = document.getElementById("grid-productos");//  REFERENCIAS A ELEMENTOS DEL DOM (HTML) 
var listaCarritoHTML = document.getElementById("lista-carrito");
var subtotalHTML = document.getElementById("subtotal");
var envioHTML = document.getElementById("envio");
var totalHTML = document.getElementById("total");

// carrito: id -> cantidad
var carrito = {};

// Mostrar tarjetas
function mostrarProductos(arrayProductos) {
    gridProductosHTML.innerHTML = "";

    arrayProductos.forEach(function (prod) {
        gridProductosHTML.innerHTML +=
            "<article class='tienda-card'>" +
                "<div class='tienda-img-wrapper'>" +
                    "<img src='" + prod.imagen + "' alt='" + prod.nombre + "'>" +
                "</div>" +
                "<h3>" + prod.nombre + "</h3>" +
                "<p class='tienda-descripcion'>" + prod.descripcion + "</p>" +
                "<p class='tienda-precio'>$" + prod.precio + "</p>" +
                "<button class='btn-agregar' onclick='agregarAlCarrito(" + prod.id + ")'>Agregar</button>" +
            "</article>";
    });
}

// Mostrar lista completa al cargar
mostrarProductos(suplementos);

// Buscador por nombre
function buscarProductos(evento) {
    var texto = evento.target.value.toLowerCase();

    var filtrados = suplementos.filter(function (prod) {
        return prod.nombre.toLowerCase().includes(texto);
    });

    mostrarProductos(filtrados);
}

// Orden por precio ascendente
function ordenarPorPrecioAsc() {
    var copia = suplementos.slice();

    copia.sort(function (a, b) {
        return a.precio - b.precio;
    });

    mostrarProductos(copia);
}

// Orden por precio descendente
function ordenarPorPrecioDesc() {
    var copia = suplementos.slice();

    copia.sort(function (a, b) {
        return b.precio - a.precio;
    });

    mostrarProductos(copia);
}

// Quitar filtros
function reiniciarFiltros() {
    var buscador = document.getElementById("buscador-productos");
    buscador.value = "";
    mostrarProductos(suplementos);
}

// Agregar al carrito
function agregarAlCarrito(idProducto) {
    if (!carrito[idProducto]) {
        carrito[idProducto] = 1;
    } else {
        carrito[idProducto] = carrito[idProducto] + 1;
    }

    actualizarCarrito();
}

// Quitar del carrito
function quitarDelCarrito(idProducto) {
    if (!carrito[idProducto]) {
        return;
    }

    carrito[idProducto] = carrito[idProducto] - 1;

    if (carrito[idProducto] === 0) {
        delete carrito[idProducto];
    }

    actualizarCarrito();
}

// Vaciar carrito
function vaciarCarrito() {
    carrito = {};
    actualizarCarrito();
}

// Actualizar lista + totales
function actualizarCarrito() {
    listaCarritoHTML.innerHTML = "";

    var subtotal = 0;

    for (var id in carrito) {
        var cantidad = carrito[id];

        var producto = suplementos.find(function (p) {
            return p.id === Number(id);
        });

        if (!producto) {
            continue;
        }

        var totalProducto = cantidad * producto.precio;
        subtotal = subtotal + totalProducto;

        var li = document.createElement("li");
        li.className = "item-carrito";

        li.innerHTML =
            "<div>" +
                "<span><strong>" + producto.nombre + " x" + cantidad + "</strong></span>" +
                "<span>$" + totalProducto + "</span>" +
            "</div>" +
            "<div class='item-carrito-controles'>" +
                "<button class='btn-menos' onclick='quitarDelCarrito(" + producto.id + ")'>-</button>" +
                "<button class='btn-mas' onclick='agregarAlCarrito(" + producto.id + ")'>+</button>" +
            "</div>";

        listaCarritoHTML.appendChild(li);
    }

    subtotalHTML.innerText = "$" + subtotal;
    envioHTML.innerText = "$" + COSTO_ENVIO;
    totalHTML.innerText = "$" + (subtotal + COSTO_ENVIO);
}

// Confirmar pedido
function confirmarPedido() {
    if (Object.keys(carrito).length === 0) {
        alert("Tu pedido está vacío. Agregá al menos un suplemento.");
        return;
    }

    alert("Gracias por tu pedido. Nos vamos a contactar para coordinar la entrega.");
    vaciarCarrito();
}
