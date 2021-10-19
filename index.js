const express = require('express'); //de esta forma se importa en node

require('dotenv').config();
const { dbConection } = require('./config/database');
const cors = require('cors');

//Creando el servidor express
const app = express();

//Configuracion de CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Conexion a la BD
dbConection();

//console.log(process.env);

//Rutas de la API
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/todo', require('./routes/busquedas.routes'));
app.use('/api/uploads', require('./routes/uploads.routes'));
app.use('/api/cliente', require('./routes/clientes.route'));
app.use('/api/facturas', require('./routes/facturas.route'));
app.use('/api/productos', require('./routes/productos.route'));
app.use('/api/proveedor', require('./routes/proveedor.route'));
app.use('/api/ciudad', require('./routes/ciudad.route'))

//Para levantar el servidor
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT)
})