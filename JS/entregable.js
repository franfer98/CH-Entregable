// const listaUsuarios = [];

// let boton = document.getElementById("primer-btn");

// boton.addEventListener("click", function agregarUsuario(){
//     let idUsuario = prompt("Para registrarse ingrese su ID: ");
//     let passUsuario = prompt("Ingrese una contraseña: ");
//     let usuario = ` ID: ${idUsuario} - PASS: ${passUsuario}`;
//     listaUsuarios.push(usuario);
//     console.log(listaUsuarios);
// });

// Se declara la constante boton y se le asigna una 
// función flecha que se ejecutara al hacerle click.
const boton = document.getElementById("btn-generar-pedido");
boton.addEventListener("click", ()=>{

    // Se comienza declarando la variable orden y se le asigna la clase pedido.
    if (confirm("Quieres comenzar con tu pedido?") === true){
        let orden = new Pedido();

        // Loop while, mientras seguir sea true, ejecuta una serie de instrucciones
        // para agregar productos a la variable orden (que es una lista de productos)
        // generada anteriormente.
        let seguir = true;
        while (seguir === true){
            let productoSolicitado = prompt("¿Qué le gustaría ordenar?");
            productoSolicitado.toUpperCase();
            
            let listaObjetivo = null;
            let lista = [];
            for (lista in listaDeListas){
                let productoListado = lista.find(producto => producto.nombre === productoSolicitado);
                if (productoListado){
                    listaObjetivo = lista;
                    productoListado = producto;
                    break;
                }
            }

            console.log(producto, lista)

            // Comienza el switch
            switch(productoSolicitado){
                // Primer case
                case productoSolicitado in listaObjetivo.nombre:
                    let cantidadSolicitada = parseInt(prompt("¿Cuántos quiere? Ingrese un valor numérico"));
                    if (cantidadSolicitada > 0){
                        let contador = 0;
                        do {
                            orden.pedido.push(productoSolicitado);
                            contador += 1;
                        }
                        while (contador < cantidadSolicitada);
                    }else{
                        console.log("Pida al menos 1");
                        alert("Pida al menos 1");
                    }
                    break;

                // Segundo case
                case productoSolicitado in listaBebidas.nombre:
                    cantidadSolicitada = parseInt(prompt("¿Cuántas quiere? Ingrese un valor numérico"));
                    if (cantidadSolicitada > 0){
                        let contador = 0;
                        do {
                            orden.pedido.push(productoSolicitado);
                            contador += 1;
                        }
                        while (contador < cantidadSolicitada);
                    }else{
                        console.log("Pida al menos 1");
                        alert("Pida al menos 1");
                    }
                    break;

                // Tercer case
                case productoSolicitado in listaAderezos.nombre:
                    cantidadSolicitada = parseInt(prompt("¿Cuántos quiere? Ingrese un valor numérico"));
                    if (cantidadSolicitada > 0){
                        let contador = 0;
                        do {
                            orden.pedido.push(productoSolicitado);
                            contador += 1;
                        }
                        while (contador < cantidadSolicitada);
                    }else{
                        console.log("Pida al menos 1");
                        alert("Pida al menos 1");
                    }
                    break;
                default:
                    console.log("El producto solicitado no se encuentra dentro del menú.");
                    alert("El producto solicitado no se encuentra dentro del menú.");
            }
            seguir = confirm("¿Desea continuar agregando productos a su orden?");
        };
        const factura = new Factura(orden.pedido);
        factura.calcularPrecio();
    }else{
        console.log("Si cambias de parecer vuelve a presionar el botón ;)");
        alert("Si cambias de parecer vuelve a presionar el boton ;)");
    }
});

// Declaración y asignación de las listas que contienen 
// las bebidas, los platillos y los aderezos, así como
// de la listaPedidos (para llevar un registro de los pedidos realizados)
// y la lista de listas (la cual se va a utilizar para recorrer).
const listaBebidas = [{"tipo": "BEBIDA", "nombre": "COCA-LOCA", "precio": 25},
                      {"tipo": "BEBIDA", "nombre": "ES-PRAIT", "precio": 25},
                      {"tipo": "BEBIDA", "nombre": "AGUA", "precio": 10},
                      {"tipo": "BEBIDA", "nombre": "JUGO CON F", "precio": 15}];

const listaPlatillos = [{"tipo": "PLATILLO", "nombre": "PIÑZZA", "precio": 40},
                        {"tipo": "PLATILLO", "nombre": "HAMBURGUÉS", "precio": 30},
                        {"tipo": "PLATILLO", "nombre": "PASTEL DU PAPA (SIN PAPA)", "precio": 55},
                        {"tipo": "PLATILLO", "nombre": "SADANAPME", "precio": 25}];

const listaAderezos = [{"tipo": "ADEREZO", "nombre": "SABOR-A!", "precio": 5},
                       {"tipo": "ADEREZO", "nombre": "MOSTOZE", "precio": 5},
                       {"tipo": "ADEREZO", "nombre": "MAYONESO", "precio": 5},
                       {"tipo": "ADEREZO", "nombre": "ALSAS", "precio": 5}];

const listaDeListas = [listaPlatillos, listaBebidas, listaAderezos];
const listaPedidos = [];

// // Declaración de la clase Producto
// class Producto{
//     constructor(tipo, nombre, precio){
//         this.tipo = tipo;
//         this.nombre = nombre;
//         this.precio = precio;
//     }
// }

// Declaración de la clase Pedido
class Pedido{
    constructor(){
        this.pedido = [];
    }

    /* Agrega un producto al pedido */
    agregarProducto(producto) {
        this.pedido.push(producto);
    }
    /* Elimina un producto del pedido */
    eliminarProducto(producto){
        if (producto in this.pedido)
            this.pedido.pop(producto);
    }
}

// Declaración de la clase Factura
class Factura{
    constructor(pedido){
        this.pedido = pedido;
    }

    /* Calcula el precio y muestra la factura por consola */
    calcularPrecio(){
        let importe = 0;
        let descuento = 0;
        const longitud = this.pedido.lenght;
        switch(longitud){
            case longitud > 5:
                descuento = 0.10;
            case longitud <= 5 && longitud >= 2:
                descuento = 0.05;
            default:
                console.log("Sin descuento aplicable.");
        }
        for (producto in this.pedido){
            importe += producto.precio;
        }
        importe -= importe * descuento;
        console.log(`${this.pedido}\n`, ` Importe final: ${importe}\nDescuento aplicado: ${descuento}`);
    }
}

// function mostrarImporte(){
//     let importe = 350;
//     let descuento = 0.05;
//     console.log(importe);
//     console.log(importe -= importe * descuento);
//     console.log(importe);
// }

// mostrarImporte();


