

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
            tipoDeProducto.toUpperCase();
            switch (tipoDeProducto){

                // En caso de pedir BEBIDAS
                case tipoDeProducto == "1" || tipoDeProducto == "BEBIDAS":
                    let productoSolicitado = prompt("Ingrese el nombre de la bebida que quiere");
                    productoSolicitado.toUpperCase();
                    for (producto in listaBebidas){
                        let productoListado = listaBebidas.find(producto => producto.nombre === productoSolicitado);
                        if (productoListado !== undefined){
                            productoSolicitado = productoListado;
                            break;
                        }else{
                            console.log("El producto que solicitó no existe dentro del menu actual, porfavor selecccione otro.");
                            alert("El producto que solicitó no existe dentro del menú actual, porfavor seleccione otro.");
                        }

                    }

                // En caso de pedir PLATILLOS
                case tipoDeProducto == "2" || tipoDeProducto == "PLATILLOS":
                    productoSolicitado = prompt("Ingrese el nombre de la bebida que quiere");
                    productoSolicitado.toUpperCase();
                    for (producto in listaPlatillos){
                        let productoListado = listaPlatillos.find(producto => producto.nombre === productoSolicitado);
                        if (productoListado !== undefined){
                            productoSolicitado = productoListado;
                            break;
                        }else{
                            console.log("El producto que solicitó no existe dentro del menu actual, porfavor selecccione otro.");
                            alert("El producto que solicitó no existe dentro del menú actual, porfavor seleccione otro.");
                        }
                    }

                // En caso de pedir ADEREZOS
                case tipoDeProducto == "3" || tipoDeProducto == "ADEREZOS":
                    productoSolicitado = prompt("Ingrese el nombre de la bebida que quiere");
                    productoSolicitado.toUpperCase();
                    for(producto in listaAderezos){
                        let productoListado = listaAderezos.find(producto => producto === productoSolicitado);
                        if (productoListado !== undefined){
                            productoSolicitado = productoListado;
                            break;
                        }else{
                            console.log("El producto que solicitó no existe dentro del menu actual, porfavor selecccione otro.");
                            alert("El producto que solicitó no existe dentro del menú actual, porfavor seleccione otro.");
                        }
                    }
                default:
                    console.log("Porfavor seleccione una opción válida (por ejemplo 1 o Bebidas)");
                    alert("Porfavor seleccione una opción válida (por ejemplo 1 o Bebidas)");
            }

            // Ligero cambio para legibilidad (cuantos/cuantas)
            if (productoSolicitado.tipo == "BEBIDA"){
                let cantidadSolicitada = parseInt(prompt("¿Cuántas quiere?, Ingrese un valor numérico"));
                orden.agregarProducto(productoSolicitado, cantidadSolicitada);
            }else{
                let cantidadSolicitada = parseInt(prompt("¿Cuántos quiere pedir?, Ingrese un valor numérico"));
                orden.agregarProducto(productoSolicitado, cantidadSolicitada);
            }

            seguir = confirm("¿Desea continuar agregando productos a su orden?");
        };


        const factura = new Factura(orden.pedido);
        factura.calcularPrecio();
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