const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Objection and Knex

const {Model} = require('objection');
const Knex = require('knex');
const knexFile = require('./knexfile.js');
const knex = Knex(knexFile.development);
Model.knex(knex);

app.use(express.static('public'));
app.use(express.static('photos'));
app.use(express.static('views'));

const fs = require('fs');

// Session

const session = require('express-session');
app.use(session({
    secret: require('./config/mysqlCredentials.js').sessionSecter,
    resave: false, //forces the session to be saved back to the session store
                    //even if the session was never modified during the request
    saveUninitialized: true, //forces a session that is unitialized to be saved to the store
    //cookie: { secure: true} //https is necessary for secure cookies
}));

// Socket.io
const server = require("http").createServer(app);
const io = require("socket.io")(server)

io.on('connection', (socket) => {
    console.log('New user connected');
    
    socket.on('username', (data) => {
        socket.username = data.username
    });

    socket.on('new_message', (data) => {
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    });

    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    });
});


app.use(function (req, res, next) {
    if(req.session.user){
         res.locals.loggedIn = req.session.user;
    } else{
         res.locals.loggedIn = null;
    }
    next()
});

const requireLogin = (req, res, next) => {
    if (req.session.user) {
      next(); 
    } else {
      return res.redirect("/login"); 
    }
}

// Routes

const authRoute = require('./routes/auth.js');
const photosRoute = require("./routes/photos");
const profileRoute = require("./routes/profile");

app.use(authRoute);
app.use(photosRoute);
app.use(profileRoute);

app.get("/login", (req, res) => {
    return res.render("login/login");
});

app.get("/signup", (req, res) => {
    return res.render("signup/signup");
}); 

app.get("/upload", requireLogin, (req, res) => {
    return res.render("upload/upload");
}); 

app.get("/", (req,res) => {
    return res.render("explore/explore");
});

app.get("/chat", requireLogin, (req,res) => {
    return res.render("chat/chat");
});

app.get("/profile/:photoId", (req, res) => {
    return res.render("photoview/photoview");
});
const PORT = 3000;

server.listen(PORT, (error) => {
    if(error) {
        console.log(error);
    }
    console.log("Server running on port", PORT);
})