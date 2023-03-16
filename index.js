const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);

// declarar socket.io tiene que ser siempre "S"erver con mayuscula
const { Server } = require('socket.io');
const io = new Server(server);

//creamos un get a la raiz que sera index.html
app.get("/", (request, response) => {
    response.sendFile(__dirname + '/templates/index.html'); 
});

//declaracion del evento connection y se activa en el html
io.on('connection', (socket)=>{ //socket de ida, cada vez que se usa el io.on crea un socket
    
    console.log("Un usuario esta conectado al chat");
    //.on = enciende el input-output [socket]
    //ev: 'connection' evento que establece la coneccion
    //socket pide una funcion con el parametro socket por defecto

    //--------------------------------Receptor-------------------------------------
    socket.on('chat message', (message) => { //recibe lo del socket.emit en el html
        console.log("El mensaje fue: " + message);
        //creamos un socket de vuelta, cada vez que se usa el io.on crea un socket
        io.emit('chat message', message);
    });

    //cada conexion dispara un evento disconect 
    socket.on('disconnect', () => { //desconecta al usuario cuando termine la conexion de forma inesperada
        console.log("EL usuario se ha desconectado")
    });
});

// Archivos estaticos
app.use(express.static(path.join(__dirname, "public")));

//host
server.listen(3000, () => {
    console.log("Escuchando en el puerto: 8080");
});