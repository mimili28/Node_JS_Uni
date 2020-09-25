const route = require('express').Router()

const User = require('../models/User.js');

const bcrypt = require('bcrypt');
const saltRounds = 12;

route.post("/login", async (req,res) => {
    const {username, password} = req.body;

    const users = await User.query().select();

    if(username && password){
        try{
            const user = await User.query().select().where({'username': username}).limit(1);
                if(user.length>0){
                    bcrypt.compare(password, user[0].password).then(function(isMatch) {
                        if(isMatch){
                            req.session.user = user;
                            res.redirect("/profile");
                        }
                        else{
                            return res.status(400).redirect('/login?error');
                        }
                    });
                }else {
                    return res.status(400).redirect('/login?error');
                }
            
        }catch(error){
            return res.status(500).send({response: "Something went wrong with the db"});
        }

    }else {
        return res.status(400).redirect('/login?error');
    }
});

route.post("/signup", async (req,res) => {
   
    const { username, password, passwordRepeat} = req.body;

    const isPasswordTheSame = password === passwordRepeat;

    if(username && password && isPasswordTheSame){
        if(password.length < 8){
            //res.render('signup/signup', {message: "Password does not fulful the requirements.(Minimum 8 characters)"});
            res.redirect("/signup");
        }else{
            try{
                 const userFound = await User.query().select().where({'username': username}).limit(1);
                 if(userFound.length > 0){
                     //res.render('signup/signup', {message: "Username already exists"});
                     res.redirect('/signup');
                     
                 }else{
                     
                     const hashedPassword = await bcrypt.hash(password, saltRounds);

                     const createdUser = await User.query().insert({
                         username,
                         password: hashedPassword
                     });
                     
                     //sendEmail(email,"Account created", " your account at NodeAuth has been succesfully created");


                   //res.render('login/login', {success: "User has been created successfully"});
                   res.redirect("/login");
                 }
                
            }catch (error){
                //server problem -> 500
                return res.status(500).send({response: "Something went wrong with the db"});
            }
        }
    }else if (password && passwordRepeat && !isPasswordTheSame) {
        //res.render('signup/signup', {message: "Password and Repeat password does not match"});
        res.redirect('/signup');
    }else {
        //res.render('signup/signup', {message: "Missing fields: username, password, passwordRepeat"});
        res.redirect('/signup');
    }
    
});

route.get("/logout", (req,res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/login');
    });
});

module.exports = route;

