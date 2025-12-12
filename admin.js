// Productos iniciales del administrador
var productos = [
    {
        id: 1,
        nombre: "Whey Protein ENA TrueMade",
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

var tbodyProductosHTML = document.getElementById("tbody-productos");
var formProductoHTML = document.getElementById("form-producto");

// Mostrar tabla
function renderProductos(arrayProductos) {
    tbodyProductosHTML.innerHTML = "";

    arrayProductos.forEach(function (producto) {
        var fila = document.createElement("tr");

        var textoPromo = producto.promocion ? "Sí" : "No";

        fila.innerHTML =
            "<td><img class='img-tabla' src='" + producto.imagen + "' alt='" + producto.nombre + "'></td>" +
            "<td>" + producto.nombre + "</td>" +
            "<td>" + producto.marca + "</td>" +
            "<td class='descripcionAdmin'>" + producto.descripcion + "</td>" +
            "<td>$" + producto.precio + "</td>" +
            "<td>" + textoPromo + "</td>" +
            "<td><button class='btn-eliminar' onclick='eliminarProducto(" + producto.id + ")'>X</button></td>";

        tbodyProductosHTML.appendChild(fila);
    });
}

// Mostrar al cargar
renderProductos(productos);

// Alta de producto
formProductoHTML.addEventListener("submit", function (event) {
    event.preventDefault();

    var nombreInput = document.getElementById("nombre");
    var marcaInput = document.getElementById("marca");
    var descripcionInput = document.getElementById("descripcion");
    var precioInput = document.getElementById("precio");
    var promocionSelect = document.getElementById("promocion");
    var imagenInput = document.getElementById("imagen");

    var nombre = nombreInput.value.trim();
    var marca = marcaInput.value.trim();
    var descripcion = descripcionInput.value.trim();
    var precioTexto = precioInput.value.trim();
    var imagen = imagenInput.value.trim();
    var promocionValor = promocionSelect.value;

    if (nombre === "" || marca === "" || descripcion === "" || precioTexto === "") {
        alert("Completá todos los campos.");
        return;
    }

    var precioNumero = Number(precioTexto);

    if (isNaN(precioNumero) || precioNumero <= 0) {
        alert("Ingresá un precio válido mayor a 0.");
        return;
    }

    var nuevaPromocion = false;
    if (promocionValor === "true") {
        nuevaPromocion = true;
    }

    var nuevoId = 1;
    if (productos.length > 0) {
        var ultimoProducto = productos[productos.length - 1];
        nuevoId = ultimoProducto.id + 1;
    }

    var nuevoProducto = {
        id: nuevoId,
        nombre: nombre,
        marca: marca,
        descripcion: descripcion,
        precio: precioNumero,
        promocion: nuevaPromocion,
        imagen: imagen
    };

    productos.push(nuevoProducto);
    renderProductos(productos);
    formProductoHTML.reset();
});

// Eliminar producto
function eliminarProducto(idProducto) {
    var posicion = productos.findIndex(function (producto) {
        return producto.id === idProducto;
    });

    if (posicion !== -1) {
        productos.splice(posicion, 1);
        renderProductos(productos);
    }
}
