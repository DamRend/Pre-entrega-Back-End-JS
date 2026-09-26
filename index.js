async function obtenerProductos() {      //funcion para traer y mostrar todos los productos de la fakestoreapi manejando promesas con try y catch
    try {
        console.log("Obteniendo productos...");
        const datos = await fetch('https://fakestoreapi.com/products');
        if (!datos.ok) {
            console.log("Error al obtener productos");
        }
        const productos = await datos.json();
        console.log("Productos obtenidos exitosamente ->\n");
        console.log(productos);

    } catch (error) {
        console.log("Error al conectarse a fakeStoreApi.");
    }
}

async function obtenerProductoPorId(idOrden) {       //funcion para traer 1 solo producto segun la id que le entra como parametro tambien maneja promesas con try y catch
    try {
        console.log(`Buscando producto con ID: ${idOrden} ...\n`);
        const idDatos = await fetch(`https://fakestoreapi.com/products/${idOrden}`);
        if (!idDatos.ok) {
            console.log(`Error al obtener producto con id ${idOrden}.`);
        }
        const idProducto = await idDatos.json();
        console.log(`Producto con ID: ${idOrden} obtenido exitosamente:`);
        console.log(idProducto);
    } catch (error) {
        console.log("Error al conectarse a fakeStoreApi.");
    }
}

async function agregarProducto(nombre, precio, categoria) {        //funcion que agrega un producto a la api
    try {
        console.log("Iniciando creacion de prodcuto...\n");
        const datos = await fetch('https://fakestoreapi.com/products');     //reutilizo codigo para tener todos los productos en una variable
        if (!datos.ok) {
            console.log("Error al agregar producto.");
        }
        const productos = await datos.json();
        const nuevoId = productos.length + 1;     //creo un nuevo id sumando 1 a la cantidad de productos que hay en la api
        const nuevoProducto = {         //creo el producto nuevo con los datos que se ingresaron por terminal
            id: nuevoId,
            title: nombre,
            price: parseFloat(precio),
            description: "",
            category: categoria,
            image: ""
        };

        const respuesta = await fetch('https://fakestoreapi.com/products', {        //hago el pedido al servidor y guardo la respuesta
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoProducto)
        });

        if (respuesta.ok) {
            console.log(`Producto: ${nombre} con id: ${nuevoId} creado con exito ->\n`);
        } else {
            console.log("Error al agregar un nuevo producto");
        }
        console.log(nuevoProducto);

    } catch (error) {
        console.log("Error al conectarse a fakeStoreApi.");
    }
}

async function borrarProducto(id) {          //funcion para borrar el producto con el id que se ingresa por consola
    try {
        console.log(`Borrando producto con ID: ${id}...\n`);
        const respuesta = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: 'DELETE'
        });

        if (!respuesta.ok) {
            console.log(`Error al borrar producto con id ${id}`);
        }

        const productoBorrado = await respuesta.json();
        console.log(`Producto con ID: ${id} borrado con exito ->\n`);
        console.log(productoBorrado);
    } catch (error) {
        console.log("Error al conectarse a fakeStoreApi.");
    }
}

// obtenerProductos();

const [comando, orden, nombre, precio, categoria] = process.argv.slice(2);  //Obtengo en un array el comando(GET,POST o DELETE) y la orden
//console.log(comando);

switch (comando) {
    case "GET": {
        if (orden === "products") {
            obtenerProductos();     // si no hay id llamo a la funcion que muestra todos los productos
        } else if (orden && orden.split("/")[0] === "products" && orden.split("/")[1]) {    //verifico que haya id y la palabra "products" este bien escrita
            const idOrden = orden.split("/")[1];    // Extraigo el id usando split con la barra "/"
            obtenerProductoPorId(idOrden);     //si se cunple lo de arriba llamo a la funcion que muestra productos por id
        } else {
            console.log("Error de sintaxis , ingrese un comando valido.");
        }
        break;
    }
    case "POST": {
        if (orden === "products" && nombre && precio && categoria) {
            agregarProducto(nombre, precio, categoria);
        } else {
            console.log("Error de sintaxis, ingrese un comando valido.");
        }
        break;
    }
    case "DELETE": {
        if(orden && orden.split("/")[0] === "products" && orden.split("/")[1]) {
            const idABorrar = parseInt(orden.split("/")[1]);
            if (!isNaN(idABorrar)) {
                borrarProducto(idABorrar);
            } else {
                console.log("Error de sintaxis, ingrese un id valido.");
            }
        } else {
            console.log("Error de sintaxis, ingrese un comando valido.");
        }
        break;
    }
    default: {
        console.log("Error de sintaxis, ingrese un comando valido.");
    }
}