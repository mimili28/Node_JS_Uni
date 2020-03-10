const express = require("express");
const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
 
// parse application/json
app.use(express.json());

let devices = [
    { id: 1, type: "computer" }, 
    { id: 2, type: "smart watch" }
];
let nextDeviceId = 3;

app.get("/", (req, res) => {
    return res.send({ response: "This is my device API vs. 0.0.1" });
});

app.get("/devices", (req, res) => {
    return res.send({ response: devices });
});

app.get("/devices/:id", (req, res) => {
    const device = devices.find(device => device.id === Number(req.params.id));
    return res.send({ response: device });
});

app.post("/devices", (req, res) => {
    let newDevice = req.body;
    if (!newDevice.type) {
        return res.status(400).send({ response: "Missing the device type" });
    }
    newDevice.id = nextDeviceId++;
    devices.push(newDevice);
    return res.send({ response: newDevice });
});

app.put("/devices/:id", (req, res) => {
    const foundIndex = devices.findIndex(device => device.id === Number(req.params.id));
    delete req.body.id;
    
    const newDevice = { ...devices[foundIndex], ...req.body };
    devices[foundIndex] = newDevice;

    return res.send({ response: newDevice });
});

app.delete('/devices/:id', (req,res) => {
    devices = devices.filter(device => device.id !== Number(req.params.id));
    return res.send({ response: devices });
});

const server = app.listen(3000, (error) => {
    if (error) {
        console.log("Error running the server");
    }
    console.log("Server is running on port", server.address().port);
});