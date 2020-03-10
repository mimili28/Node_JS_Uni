const express= require("express");
const app=express();
const request = require('request');

//same in one line
// const app= require("express")();

app.get("/", (req, res) => {
    res.send({message: "Hello there"});
});

app.get("/aboutMe", (req, res) => {
    const me={
        name: "Maria"
    }
    res.send(me);
});


app.get("/aboutThisWebsite", (req, res) => {
    const about = {
        info: "My first node website"
    }
    if(about){
        res.send(about);
    }
    res.send("Sorry, no info about this website");
});

const weekdays= ["Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

app.get("/time", (req, res) => {
    const today = new Date();

    // const t={
    //     date : today.getFullYear()+ '-' +(today.getMonth()+1) + '-' + today.getDate() + "Today is " + weekdays[today.getDay],
    //     time : today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    // }
    res.send({
        date: today.toLocaleTimeString(),
        //hour: today.getHours(),
        weekday: weekdays[today.getDay()-1]
    });
});

app.get("/user/:id",(req,res) => {
    console.log(req.params); //server code so we see it in terminal
    return res.send({id: req.params.id});
});

app.get("/search", (req, res) =>{
    return res.send(req.query);
});


app.get("/google", (req, res) =>{
    request('http://www.google.com', function (error, response, body) {
       console.error('error:', error); // Print the error if one occurred
       console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
       console.log('body:', body); // Print the HTML for the Google homepage.
       return res.send(body);
    });
});

app.get("/documentation",(req, res)=>{
    console.log(__dirname);
    //return res.redirect("/documentationtwo");
    return res.sendFile(__dirname + '/public/documentation.html');
});

app.get("/documentationtwo",(req, res)=>{
    console.log(__dirname);
    return res.sendFile(__dirname + '/public/documentationTwo.html');
});


app.listen(3000,(error)=>{
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port", 3000);
});