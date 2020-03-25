const express= require("express");
const app=express();
const request = require('request');
//var path = require('path');

app.use(express.json());
app.use(express.static('public'));
app.use(express.static('images'));
//app.use('/public', express.static(path.join(__dirname, '..', 'public')));

app.get("/", (req, res) => {
    return res.sendFile(__dirname + '/public/index.html');
});
app.get("/basics", (req, res) => {
    return res.sendFile(__dirname + '/public/basics.html');
});

app.get("/api", (req, res) => {
    return res.sendFile(__dirname + '/public/api.html');
});

app.get("/arrays", (req, res) => {
    return res.sendFile(__dirname + '/public/arrays.html');
});

app.get("/commands", (req, res) => {
    return res.sendFile(__dirname + '/public/commands.html');
});

app.get("/express", (req, res) => {
    return res.sendFile(__dirname + '/public/express.html');
});

app.get("/functions", (req, res) => {
    return res.sendFile(__dirname + '/public/functions.html');
});

app.get("/jQuery", (req, res) => {
    return res.sendFile(__dirname + '/public/jQuery.html');
});

app.get("/npm", (req, res) => {
    return res.sendFile(__dirname + '/public/npm.html');
});

app.get("/objects", (req, res) => {
    return res.sendFile(__dirname + '/public/objects.html');
});

app.get("/steps", (req, res) => {
    return res.sendFile(__dirname + '/public/steps.html');
});

app.get("/strings", (req, res) => {
    return res.sendFile(__dirname + '/public/strings.html');
});

app.listen(3000,(error)=>{
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port", 3000);
});