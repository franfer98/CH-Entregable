

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
            let tipoDeProducto = prompt("¿Qué le gustaría ordenar?\n1. Bebidas\n2. Platillos\n3. Aderezos");
            tipoDeProducto = tipoDeProducto.toUpperCase();
            switch (tipoDeProducto){

                // En caso de pedir BEBIDAS
                case "BEBIDAS":
                case "1":
                    var productoSolicitado = prompt("Ingrese el nombre de la bebida que quiere");
                    productoSolicitado = productoSolicitado.toUpperCase();
                    var productoListado = listaBebidas.find(producto => producto.nombre === productoSolicitado);
                        if (productoListado !== undefined){
                            productoSolicitado = productoListado;
                            var cantidadSolicitada = parseInt(prompt("¿Cuántas quiere?, Ingrese un valor numérico"));
                            orden.agregarProducto(productoSolicitado, cantidadSolicitada);
                            break;
                        }else{
                            console.log("El producto que solicitó no existe dentro del menu actual, porfavor selecccione otro.");
                            alert("El producto que solicitó no existe dentro del menú actual, porfavor seleccione otro.");
                            break;
                        }

                // En caso de pedir PLATILLOS
                case "PLATILLOS":
                case "2":
                   var productoSolicitado = prompt("Ingrese el nombre del platillo");
                    productoSolicitado = productoSolicitado.toUpperCase();
                    var productoListado = listaPlatillos.find(producto => producto.nombre === productoSolicitado);
                    if (productoListado !== undefined){
                        productoSolicitado = productoListado;
                        var cantidadSolicitada = parseInt(prompt("¿Cuántos quiere pedir?, Ingrese un valor numérico"));
                        orden.agregarProducto(productoSolicitado, cantidadSolicitada);
                        break;
                    }else{
                        console.log("El producto que solicitó no existe dentro del menu actual, porfavor selecccione otro.");
                        alert("El producto que solicitó no existe dentro del menú actual, porfavor seleccione otro.");
                        break;
                    }

                // En caso de pedir ADEREZOS
                case "ADEREZOS":
                case "3":
                    var productoSolicitado = prompt("Ingrese el nombre del aderezo");
                    productoSolicitado = productoSolicitado.toUpperCase();
                    var productoListado = listaAderezos.find(producto => producto.nombre === productoSolicitado);
                    if (productoListado !== undefined){
                        productoSolicitado = productoListado;
                        var cantidadSolicitada = parseInt(prompt("¿Cuántos quiere pedir?, Ingrese un valor numérico"));
                        orden.agregarProducto(productoSolicitado, cantidadSolicitada);
                        break;
                    }else{
                        console.log("El producto que solicitó no existe dentro del menu actual, porfavor selecccione otro.");
                        alert("El producto que solicitó no existe dentro del menú actual, porfavor seleccione otro.");
                        break;
                    }
                default:
                    console.log("Porfavor seleccione una opción válida (por ejemplo 1 o Bebidas)");
                    alert("Porfavor seleccione una opción válida (por ejemplo 1 o Bebidas)");
                    break;
            }

            seguir = confirm("¿Desea continuar agregando productos a su orden?");
        };


        const factura = new Factura(orden.pedido);
        factura.calcularPrecio();

        console.log(factura)
    }
    
    else{
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

// Declaración y asignación de la lista que contendrá los pedidos realizados.
// Tiene como finalidad llevar un registro de los pedidos.                       
const listaPedidos = [];

// Declaración de la clase Pedido
class Pedido{
    constructor(){
        this.pedido = [];
    }

    /* Agrega un producto al pedido */
    agregarProducto(producto, cantidad){
        if (cantidad > 0){
            let contador = 0;
            do {
                this.pedido.push(producto);
                contador += 1;
            }
            while (contador < cantidad);
        }else{
            console.log("Pida al menos 1");
            alert("Pida al menos 1");
        }
    }

    /* Elimina un producto del pedido PROXIMAMENTE SOLO EN CINES*/
    // eliminarProducto(producto){
    //     if (producto in this.pedido)
    //         this.pedido.pop(producto);
    // }
}

// Declaración de la clase Factura
class Factura{
    constructor(pedido){
        this.pedido = pedido;
    }

    /* Calcula el precio y muestra la factura por consola */
    calcularPrecio(){
        var importe = 0;
        var descuento = 0;
        const longitud = this.pedido.lenght;
        switch(longitud){
            case longitud > 5:
                descuento = 0.10;
            case longitud <= 5 && longitud >= 2:
                descuento = 0.05;
            default:
                console.log("Sin descuento aplicable.");
        }
        this.pedido.forEach(producto => {
            importe += producto.precio;
        });

        importe -= importe * descuento;
        
        this.pedido.forEach(producto => {
            console.log(`${producto.nombre} $${producto.precio}\n`)
        });
        console.log(`Descuento aplicado: ${descuento}\nImporte final: ${importe}`);
    }
}