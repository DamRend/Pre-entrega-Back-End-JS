# Pre-entrega-Back-End-JS

CLI en Node.js para interactuar con FakeStoreAPI usando fetch, async/await y manejo de errores con try/catch.

Requisitos
Node.js (usa ES Modules, "type": "module")
Uso
bash
node index.js <COMANDO> <recurso> [nombre] [precio] [categoria]
Comandos disponibles

Obtener todos los productos

bash
node index.js GET products

Obtener un producto por ID

bash
node index.js GET products/5

Agregar un producto

bash
node index.js POST products "Nombre del producto" 19.99 "categoria"

Borrar un producto por ID

bash
node index.js DELETE products/5

Si el comando o los parámetros no son válidos, se muestra un mensaje de error de sintaxis por consola.
