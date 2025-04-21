// Constante que contiene todos los productos disponibles, organizados por categoría
const productosPorCategoria = {
    Platillo: [
      { tipo: "Platillo", nombre: "PIÑZZA", precio: 40 },
      { tipo: "Platillo", nombre: "HAMBURGUÉS", precio: 30 },
      { tipo: "Platillo", nombre: "PASTEL DU PAPA (SIN PAPA)", precio: 55 },
      { tipo: "Platillo", nombre: "SADANAPME", precio: 25 }
    ],
    Bebida: [
      { tipo: "Bebida", nombre: "COCA-LOCA", precio: 25 },
      { tipo: "Bebida", nombre: "ES-PRAIT", precio: 25 },
      { tipo: "Bebida", nombre: "AGUA", precio: 10 },
      { tipo: "Bebida", nombre: "JUGO CON R", precio: 15 }
    ],
    Aderezo: [
      { tipo: "Aderezo", nombre: "SABOR-A!", precio: 5 },
      { tipo: "Aderezo", nombre: "MOSTOZE", precio: 5 },
      { tipo: "Aderezo", nombre: "MAYONESO", precio: 5 },
      { tipo: "Aderezo", nombre: "ALSAS", precio: 5 }
    ]
};

// Creación del div "factura" y se lo hace invisible hasta que
// hayan elementos para agregarle
const contenedorFactura = document.createElement("div");
contenedorFactura.id = "factura";
contenedorFactura.style.display = "none"; // Oculto al principio
body.appendChild(contenedorFactura);

// Clase que representa el pedido realizado por el usuario
class Pedido {
    constructor() {
        this.pedido = []; // En este array se guardarán todos los productos seleccionados
    }

    // Agrega productos según la cantidad indicada
    agregarProducto(producto, cantidad) {
        for (let i = 0; i < cantidad; i++) {
        this.pedido.push(producto);
        }
    }
}

// Genera y muestra la factura
class Factura {    
    constructor(pedido) {
        this.pedido = pedido;
    }

    // Función encargada de calcular el precio
    calcularPrecio() {
        const contenedorFactura = document.getElementById("factura");
        contenedorFactura.innerHTML = "<h2>🧾 Factura de tu pedido</h2>";
        
        // Calcula el total sin aplicar descuentos
        const importe = this.pedido.reduce((total, producto) => total + producto.precio, 0);

        // Aplica descuentos: 5% si hay entre 2-5 productos, 10% si hay más de 5 productos
        let descuento = 0;
        const longitud = this.pedido.length;

        // No me resigné a usar if...else, en vez de eso encontré una solución diferente ;)
        switch(true){
            case(longitud > 5):
            descuento = 0.10;
            break;
            case(longitud >=2):
            descuento = 0.05;
            break;
            default:
                descuento = 0;
        }
        // if (longitud > 5) descuento = 0.10;
        // else if (longitud >= 2) descuento = 0.05;

        const importeConDescuento = importe * (1 - descuento);

        // Agrupa productos por nombre y muestra la cantidad de cada uno
        const resumen = this.pedido.reduce((conteo, producto) => {
        if (!conteo[producto.nombre]) {
            conteo[producto.nombre] = { ...producto, cantidad: 1 };
        } else {
            conteo[producto.nombre].cantidad++;
        }
        return conteo;
        }, {});

    // Genera lista de productos en la factura y los muestra en el Body
    const lista = document.createElement("ul");
    Object.values(resumen).forEach(p => {
    const item = document.createElement("li");
    item.textContent = `${p.nombre} - $${p.precio} x ${p.cantidad} = $${p.precio * p.cantidad}`;
    lista.appendChild(item);
    });

    contenedorFactura.appendChild(lista);

    // Muestra totales y descuento aplicado
    contenedorFactura.innerHTML += `
    <p>Descuento aplicado: ${descuento * 100}%</p>
    <p>Total antes del descuento: $${importe}</p>
    <p><strong>💰 Total a pagar: $${importeConDescuento.toFixed(2)}</strong></p>
    `;

    // Una vez generados todos los elementos que componen la factura
    // Hacemos la factura visible en el body del HTML para el usuario
    contenedorFactura.style.display = "block";

    // Guarda la factura en el local storage del navegador
    const facturaParaGuardar = {
    productos: Object.values(resumen).map(p => ({
        nombre: p.nombre,
        precioUnitario: p.precio,
        cantidad: p.cantidad,
        subtotal: p.precio * p.cantidad
    })),
    totalSinDescuento: importe,
    descuentoAplicado: descuento,
    totalFinal: importeConDescuento
    };

    localStorage.setItem("facturaGuardada", JSON.stringify(facturaParaGuardar));
    }
}

// Lleva la cuenta de cuantos productos de cada tipo pide el usuario
// Se actualiza cada vez que se le hace click al + o al - de la tabla
const cantidadesSeleccionadas = {};

// Se genera el HTML de manera dinámica
const app = document.getElementById("app");
app.innerHTML = `<h1>¿Tenés hambre? ¡Comenzá con tu pedido!</h1>`;

const tabla = document.createElement("table"); // Tabla
const encabezado = document.createElement("tr"); // Fila del encabezado

["Platillo", "Bebida", "Aderezo"].forEach(cat => {
    const th = document.createElement("th");
    th.textContent = `${cat}s`;
    encabezado.appendChild(th);
});
tabla.appendChild(encabezado);

// Determina cuantas filas va a tener la tabla basado en la categoría con más productos 
// (en este caso da igual porque todas tienen la misma cantidad de productos)
const maxFilas = Math.max(
    ...Object.values(productosPorCategoria).map(lista => lista.length)
);

// Genera las filas y las columnas
for (let i = 0; i < maxFilas; i++) {
    const fila = document.createElement("tr");
    ["Platillo", "Bebida", "Aderezo"].forEach(cat => {
        const producto = productosPorCategoria[cat][i];
        const td = document.createElement("td");

        if (producto) {
            // inicializa el contador para ese producto
            cantidadesSeleccionadas[producto.nombre] = 0;

            // Botones para agregar o eliminar productos de la lista "cantidadesSeleccionadas"
            td.innerHTML = `
                <div>
                <strong>${producto.nombre}</strong><br>$${producto.precio}
                <div class="contador">
                    <button onclick="cambiarCantidad('${producto.nombre}', -1)">-</button>
                    <span id="cantidad-${producto.nombre}">0</span>
                    <button onclick="cambiarCantidad('${producto.nombre}', 1)">+</button>
                </div>
                </div>
            `;
        }

    fila.appendChild(td);
    });

    tabla.appendChild(fila);
}

// Agregamos la tabla al body del HTML
app.appendChild(tabla);

// Se declara la constante "boton" y se agrega el objeto al body
const boton = document.createElement("button");
boton.textContent = "Generar Pedido";
app.appendChild(boton);

// Se le adjunta un eventListener para que genere el pedido y 
// calcule la fatura al hacerle click
boton.addEventListener("click", () => {
    if (!confirm("¿Confirmás tu pedido con las cantidades seleccionadas?")) return;

    const orden = new Pedido();

    // Recorre todos los productos y agrega la cantidad seleccionada al pedido
    for (const categoria in productosPorCategoria) {
        productosPorCategoria[categoria].forEach(producto => {
        const cantidad = cantidadesSeleccionadas[producto.nombre] || 0;
        orden.agregarProducto(producto, cantidad);
        });
    }

    // Control para que no se generen pedidos vacíos
    if (orden.pedido.length === 0) {
        alert("¡Tenés que pedir al menos un producto!");
        return;
    }

    const factura = new Factura(orden.pedido);
    factura.calcularPrecio();
});

// Función para modificar las cantidades mostradas al presionar los botones
function cambiarCantidad(nombre, delta) {
    // Asegura que nunca baje de 0
    cantidadesSeleccionadas[nombre] = Math.max(0, cantidadesSeleccionadas[nombre] + delta);

    // Actualiza el número visible en la pantalla
    document.getElementById(`cantidad-${nombre}`).textContent = cantidadesSeleccionadas[nombre];
}