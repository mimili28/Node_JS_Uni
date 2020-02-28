const express= require("express");
const app=express();
const request = require('request');

app.get("/", (req, res) => {
    res.send({message: "This is API"});
});

app.get("/about", (req, res) => {
    res.send({message: "API for devices"})
});

let devices = [
    {id: 0, type: "computer"},
    {id: 1, type: "smart watch"}
];

app.get("/devices", (req, res) => {
    return res.send({devices: devices});
});

app.get("/devices/:id", (req, res) => {
    const device = devices.find(device => device.id === Number(req.params.id));
    return res.send({device: device});
});

app.post("/test", (req, res) => {
    res.send({});
});

const server = app.listen(3000,(error)=>{
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port", server.address().port);
});
