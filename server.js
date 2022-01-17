const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const Rutas = require('./rutas.js');
const routerProductos = express.Router();

let rutas = new Rutas();
let productos = rutas.productos;
let mensajes = [
    {
        email: "juanperez@gmail.com",
        fechaHora: new Date().toLocaleString(),
        texto: "Hola soy Juan"
    }
];

app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
app.use('/api/productos', routerProductos);
app.use(express.static("public"));

server.listen(8080, function () {
    console.log("Servidor corriendo en http://localhost:8080");
});

io.on('connection', (socket)=> {
    console.log('Cliente Conectado');
    socket.emit("productos", productos);
    socket.emit('mensajes', mensajes);
    socket.on("nuevo-producto", function (data) {
        productos.push(data);
        io.sockets.emit("productos", productos);
      });
    socket.on('nuevo-mensaje',(data)=>{
        mensajes.push(data);
        io.sockets.emit('mensajes',mensajes);
    });

});

routerProductos.get(rutas.listar, rutas.funcionListar);
routerProductos.get(rutas.listarId, rutas.funcionListarId);
routerProductos.post(rutas.guardar, rutas.funcionGuardar);
routerProductos.put(rutas.actualizar, rutas.funcionActualizar);
routerProductos.delete(rutas.borrar, rutas.funcionBorrar);

/* INGRESO DE DATOS
 ESCUADRA: 
 https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png
 
 CALCULADORA
 https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png
RELOJ
https://cdn2.iconfinder.com/data/icons/party-new-years/128/Party_Newyears_Watch-256.png
CUADERNO
https://cdn3.iconfinder.com/data/icons/education-209/64/book-note-paper-school-256.png
LAPIZ
https://cdn4.iconfinder.com/data/icons/small-n-flat/24/pencil-256.png*/