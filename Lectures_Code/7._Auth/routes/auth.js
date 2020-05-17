const route = require('express').Router()
const User = require('../models/User.js');

route.post("/login", (req,res) => {
    return res.send({response: "OKOK"});
});

route.post("/signup", async (req,res) => {
   

    const { username, password, passwordRepeat } = req.body;

    const isPasswordTheSame = password === passwordRepeat;

    if(username && password && isPasswordTheSame){
        if(password.length < 8){
            return res.status(400).send({response:"Password does not fulfill the requirements"}) 
        }else{
            try{
                 const userFound = await User.query().select().where({'username': username}).limit(1);
                 //limit- stops after it has been satisfied -> performancy efficient
                 if(userFound.length > 0){
                     return res.status(400).send({response: "User already exists"});
                 }else{
                     //takes an object
                     const createdUser = await User.query().insert({
                         username,
                         password,
                         roleId: 2
                     });

                    return res.send({response: `User has been created ${createdUser.username}`});
                 }
                
            }catch (error){
                //server problem -> 500
                return res.status(500).send({response: "Something went wrong with the db"});
            }
        }
    }else if (password && passwordRepeat && !isPasswordTheSame) {
        return res.status(400).send({response:"Password do not match. Fields:password and passwordRepeat"})
    }else {
        return res.status(404).send({response:"Missing fields: username, password, passwordRepeat"})
    }
    
});

route.get("/logout", (req,res) => {
    return res.send({response: "OKOK"});
});


module.exports = route;