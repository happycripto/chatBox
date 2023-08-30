import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import { Server } from "socket.io";
import viewRouter from "./routes/views.js";
import usersRouter from "./routes/users.js";

const app = express();

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.static(__dirname + '/public'));

app.use('/', viewRouter);
app.use('/', usersRouter);


const server = app.listen(8080, () => {
    console.log('Server ON')
})

const io = new Server(server); 

let messages = [];

io.on('connection', socket => {
    console.log('Nuevo cliente conectado');

    socket.on('message', data => {
        messages.push(data);
        io.emit('messageLogs', messages);
    })

    socket.on('authenticated', data=> {
        socket.broadcast.emit('newUserConnected', data);
    })
})