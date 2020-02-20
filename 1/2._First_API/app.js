const express= require("express");
const app=express();
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
    res.send("Sorry, no info about this website")
});

app.get("/time", (req, res) => {
    let date = new Date();
    const r={
        
    } 
});


app.listen(3000,(error)=>{
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port", 3000);
});