const express= require("express");
const app=express();
const request = require('request');
//var path = require('path');

app.use(express.json());
app.use(express.static('public'));
app.use(express.static('images'));
//app.use('/public', express.static(path.join(__dirname, '..', 'public')));

app.get("/", (req, res) => {
    console.log(__dirname);
    return res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000,(error)=>{
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port", 3000);
});