const app = require('express')();
const server = require('http').createServer(app);

//create io by giving server instance
const io = require('socket.io')(server);

const escape =require('escape-html');
const helmet = require('helmet');
app.use(helmet());

//listen to all sockets and logging if it is joining or leaving
io.on('connection', socket => {
    // console.log("Socket joined", socket.id);

    // socket.on("disconnect", () => {
    //     console.log("Socket left", socket.id);
    // });

    socket.on("I'm thinking about this", ({thoughts}) => {
        //send out to all clients
        io.emit("Someone said", {thoughts: escape(thoughts)});

        //sends back to the very same client
        //socket.emit("Someone said", {thoughts});

        //sends out to all client but the client itself
        //socket.broadcast.emit("Someone said", {thoughts});
    });

    socket.on('client color', (data) => {
        io.emit('color change', {color: escape(data.color)});
    });
});

app.get("/", (req,res) => {
    return res.sendFile(__dirname + "/index.html");
});

app.get('/color', (req, res) => {
    return res.sendFile(__dirname + "/color.html");
});

server.listen(3000);