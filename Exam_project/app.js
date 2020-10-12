const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const flash = require('connect-flash');
app.use(flash());

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

const navbarPage = fs.readFileSync("public/navbar/navbar.html", "utf8");
const loginPage = fs.readFileSync("public/login/login.html", "utf8");
const signupPage = fs.readFileSync("public/signup/signup.html", "utf8");
const explorePage = fs.readFileSync("public/explore/explore.html", "utf8");
const chatPage = fs.readFileSync("public/chat/chat.html", "utf8");
const footerPage = fs.readFileSync("public/footer/footer.html", "utf8");
const profilePage = fs.readFileSync("public/profile/profile.html", "utf8");
const photoviewPage = fs.readFileSync("public/photoview/photoview.html", "utf8");
const photoviewEditPage = fs.readFileSync("public/photoview/photoviewEdit.html", "utf8");
const uploadPage = fs.readFileSync("public/upload/upload.html", "utf8");

app.get("/status", (req, res) => {
    if(req.session.user){
        return res.status(200).send("user");
    }else{
        return res.status(200).send("anonymous");
    }
});

app.get("/login", (req, res) => {
    return res.send(navbarPage + loginPage + footerPage);
});

app.get("/signup", (req, res) => {
    return res.send(navbarPage + signupPage + footerPage);
}); 

app.get("/upload", requireLogin, (req, res) => {
    return res.send(navbarPage + uploadPage + footerPage);
}); 

app.get("/", (req,res) => {
    return res.send(navbarPage + explorePage + footerPage);
});

app.get("/chat", requireLogin, (req,res) => {
    return res.send(navbarPage + chatPage + footerPage);
});

app.get("/profile", requireLogin, (req,res) => {
    return res.send(navbarPage + profilePage + footerPage);
});

app.get("/profile/:photoId", requireLogin, (req, res) => {
    return res.send(navbarPage + photoviewPage + footerPage);
});

app.get("/profile/edit/:photoId", requireLogin, (req, res) => {
    return res.send(navbarPage + photoviewEditPage + footerPage);
});

const PORT = 3000;

server.listen(PORT, (error) => {
    if(error) {
        console.log(error);
    }
    console.log("Server running on port", PORT);
});

module.exports = {
    requireLogin
}