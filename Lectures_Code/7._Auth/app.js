const express = require('express');
const app = express();


//const ejs = require('ejs');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static('public'));

const fs = require('fs');

const loginpage = fs.readFileSync("views/loginpage/login.ejs", "utf8");
const signuppage = fs.readFileSync("views/signuppage/signup.ejs", "utf8");
const profilepage = fs.readFileSync("views/profilepage/profile.ejs", "utf8");
// const navbar = fs.readFileSync("views/navbar/navbar.ejs", "utf8");
// const footer = fs.readFileSync("views/footer/footer.ejs", "utf8");
//for authorization
const session = require('express-session');
app.use(session({
    secret: require('./config/mysqlCredentials.js').sessionSecter,
    resave: false, //forces the session to be saved back to the session store
                    //even if the session was never modified during the request
    saveUninitialized: true, //forces a session that is unitialized to be saved to the store
    //cookie: { secure: true} //https is necessary for secure cookies
}))

const flash = require('req-flash');
app.use(flash());


const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 8 //limit each IP to 8 requests per windowMs
});
app.use("/login", limiter);
app.use("/signup", limiter);

// app.get("/", (req, res) => {
//     return res.send(navbar + footer);
//  });

// app.get("/login", (req, res) => {
//     return res.send(loginpage);
//  });
// app.get("/signup", (req, res) => {
//     return res.send(signuppage);
//  });

 app.post("/logout", (req, res) => {
    return res.send(loginpage);
 });

 app.use(function (req, res, next) {
    if(req.session.user){
         res.locals.loggedIn = req.session.user;
    } else{
         res.locals.loggedIn = null;
    }
    next()
    })


// Setup Objection + Knex
const {Model} = require('objection'); //import objection library
//const Model = require('objection').Model; - same as above

const Knex = require('knex'); //import knex library-  Knex
const knexFile = require('./knexfile.js');

const knex = Knex(knexFile.development); //the connection

Model.knex(knex); //we give the model the connection

//loggers
// app.use((req, res, next) => {
//     console.log(new Date());
//     next();
// })

//using promises
// app.get("/", (req, res) =>{
//     knex('users').select().then(users => {
//         return res.send({ response: users });
//     }).catch(error => {
//         return res.status(400).send({response: error})
//     });
//     // Jackson, ObjectMapper
// });

//2nd solution
// app.get("/", async (req, res) =>{

//     const result = await knex("users").select();
//     return res.send({response: result});
// });

//Add routes
const authRoute = require('./routes/auth.js');
const usersRoute = require('./routes/users.js');

app.use(authRoute);
app.use(usersRoute);


//start server
const PORT = 3000;

app.listen(PORT, (error) => {
    if(error) {
        console.log(error);
    }
    console.log("Server running on port", PORT)
})