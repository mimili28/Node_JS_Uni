const route = require('express').Router()

const User = require('../models/User.js');
const Role = require('../models/Role.js');

const bcrypt = require('bcrypt');
const saltRounds = 12;

const sendEmail = require("../nodemail")

route.post("/login", async (req,res) => {
  
    const { username, password } = req.body;
  
    const adminRole = await Role.query().select().where({role: 'ADMIN'});
    const users = await User.query().select();

    if(username && password){
            try{
                const user = await User.query().select().where({'username': username}).limit(1);
                    if(user.length>0){
                        bcrypt.compare(password, user[0].password).then(function(isMatch) {
                            if(isMatch){
                                req.session.user = user;
                                if(adminRole[0].id == user[0].roleId){
                                    req.session.isAdmin = true;
                                    req.session.users = users;  
                                }
                                res.redirect("/");
                            }
                            else{
                                res.render('loginpage/login', {message: "Wrong username or password"});
                            }
                        });
                    }else {
                        res.render('loginpage/login', {message: "Wrong username or password"});
                    }
                
            }catch(error){
                return res.status(500).send({response: "Something went wrong with the db"});
            }

    }else {
        res.render('loginpage/login', {message: "Missing fields: username, password"});
    
    }
        
});


route.post("/signup", async (req,res) => {
   
    const { username, password, passwordRepeat, email } = req.body;

    const isPasswordTheSame = password === passwordRepeat;

    if(username && password && isPasswordTheSame){
        if(password.length < 8){
            res.render('signuppage/signup', {message: "Password does not fulful the requirements.(Minimum 8 characters)"});
        }else{
            try{
                 const userFound = await User.query().select().where({'username': username}).limit(1);
                 //limit- stops after it has been satisfied -> performancy efficient
                 if(userFound.length > 0){
                     res.render('signuppage/signup', {message: "Username already exists"});
                     
                 }else{
                     
                     const defaultUserRoles = await Role.query().select().where({role: 'USER'});
                    
                     const hashedPassword = await bcrypt.hash(password, saltRounds);

                     //takes an object
                     const createdUser = await User.query().insert({
                         username,
                         password: hashedPassword,
                         roleId: defaultUserRoles[0].id
                     });
                     
                     sendEmail(email,"Account created", " your account at NodeAuth has been succesfully created");


                    res.render('loginpage/login', {message: "User has been created successfully"});
                    //return res.send({response: `User has been created with username: ${createdUser.username}`});
                    // res.redirect('/login');
                 }
                
            }catch (error){
                //server problem -> 500
                return res.status(500).send({response: "Something went wrong with the db"});
            }
        }
    }else if (password && passwordRepeat && !isPasswordTheSame) {
        res.render('signuppage/signup', {message: "Password and Repeat password does not match"});
    }else {
        res.render('signuppage/signup', {message: "Missing fields: username, password, passwordRepeat"});
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
route.get("/login", (req, res) => {
    return res.render('loginpage/login');
 });

 route.get("/signup", (req, res) => {
    return res.render('signuppage/signup');
 });

 route.get("/admin", (req, res) => {
    if(req.session.isAdmin) {
        return res.render('admin/admin', {users: req.session.users});
    }else{
        return res.redirect("/login");
    }
 });

route.get("/profile", async (req, res) => {
    if(req.session.user) {
        return res.render('profilepage/profile', { username: req.session.user[0].username});
    }else{
        return res.redirect("/login");
    }
 });

 route.get("/", (req, res) => {
    if(req.session.user) {
        return res.render('frontpage/frontpage', { username: req.session.user[0].username});
    }else{
        return res.render('frontpage/frontpage');
    }
 });
 
module.exports = route;