const mongoClient = require("mongodb").MongoClient;

const connectionUrl = "mongodb://localhost:27017";
const dbName = "animalfarm";

mongoClient.connect(connectionUrl, { useUnifiedTopology: true}, (error,client) =>{
    if (error){
        throw "Error connecting to mongodb " + error;
    }
    const animalFarmDB = client.db(dbName);
    const building = animalFarmDB.collection("buildings");

    // findOne 
    building.find({type: {$exists: true}}, { projection: { _id:0 }}).limit(1).toArray((error, foundBuildings) => {
        console.log(foundBuildings);
        client.close(); //closes the connection to the db    
    });
    
});

