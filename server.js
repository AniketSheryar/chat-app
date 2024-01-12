const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);

const port = process.env.PORT || 3000;

app.use(express.static(__dirname+'/public'));

server.listen(port,() => {
    console.log("server started at"+port);
})

app.get('/', (req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

const io = require("socket.io")(server);

const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    })

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]});
    })

    socket.on('disconnect', message  => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    })
})
