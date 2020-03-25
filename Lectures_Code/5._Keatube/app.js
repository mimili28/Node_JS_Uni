const express = require("express");
const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

app.use(express.static('public'));
app.use(express.static('videos'));

const fs = require('fs');

// here: load the navbar and console.log it
const navbarPage = fs.readFileSync("public/navbar/navbar.html", "utf8");
const footerPage = fs.readFileSync("public/footer/footer.html", "utf8");

const frontpagePage = fs.readFileSync("public/frontpage/frontpage.html", "utf8");
const playerPage = fs.readFileSync("public/player/player.html", "utf8");

app.get("/", (req, res) => {
   return res.send(navbarPage + frontpagePage + footerPage);
});

app.get("/player/:videoid", (req, res) => {
    return res.send(navbarPage + playerPage + footerPage);
});

// Import routes
const videosRoute = require("./routes/videos");


// Setup routes
app.use(videosRoute);

const port = process.env.PORT ? process.env.PORT : 3000;

const server = app.listen(port, (error) => {
    if (error) {
        console.log("Error running the server");
    }
    console.log("Server is running on port", server.address().port);
});