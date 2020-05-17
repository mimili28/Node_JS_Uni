const express = require('express');
const app = express();

app.use(express.json());

// Setup Objection + Knex
const {Model} = require('objection'); //import objection library
//const Model = require('objection').Model; - same as above
const Knex = require('knex'); //import knex library-  Knex
const knexFile = require('./knexfile.js');

const knex = Knex(knexFile.development); //the connection

Model.knex(knex); //we give the model the connection

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

app.use(authRoute);


//start server
const PORT = 3000;

app.listen(PORT, (error) => {
    if(error) {
        console.log(error);
    }
    console.log("Server running on port", PORT)
})