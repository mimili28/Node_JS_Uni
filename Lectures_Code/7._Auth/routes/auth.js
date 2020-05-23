const route = require('express').Router()

const User = require('../models/User.js');
const Role = require('../models/Role.js');

const bcrypt = require('bcrypt');
const saltRounds = 12;

//const session = require('express-session');

route.post("/login", async (req,res) => {
    //sess = req.session;
    // 1. retrieve the login details and values
    // 2. check for a user match in the db
    // 3. bcrypt compare
    // 4. sessions

    

    const { username, password } = req.body;
  
    const adminRole = await Role.query().select().where({role: 'ADMIN'});

    if(username && password){
            try{
                const user = await User.query().select().where({'username': username}).limit(1);
                    if(user.length>0){
                        bcrypt.compare(password, user[0].password, function(err, isMatch) {
                            if(err){
                                //return callback(err);
                            }
                            if(isMatch){
                                req.session.user = user;
                                if(adminRole[0].id == user[0].roleId){
                                    req.session.isAdmin = true;
                                }
                               
                                // res.locals.loggedIn = user;
                                // console.log(res.locals.loggedIn)
                                //res.render('profilepage/profile', { username: user[0].username })
                                res.redirect("/");
                            }
                            else{
                                
                                res.send(req.flash('errorMessage', 'Wrong username or password'));
                                res.redirect('/login');
                            }
                        });
                    }else {
                        //return res.send(req.flash('errorMessage', 'Wrong username or password'));
                        res.redirect('/login');
                    }
                
            }catch(error){
                return res.status(500).send({response: "Something went wrong with the db"});
            }

    }else {
        //return res.status(404).send({response:"Missing fields: username, password"})
        res.redirect('/login');
    }
        
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
                     
                     const defaultUserRoles = await Role.query().select().where({role: 'USER'});
                    
                     const hashedPassword = await bcrypt.hash(password, saltRounds);

                     //takes an object
                     const createdUser = await User.query().insert({
                         username,
                         password: hashedPassword,
                         roleId: defaultUserRoles[0].id
                     });

                    //return res.send({response: `User has been created with username: ${createdUser.username}`});
                    res.redirect('/login');
                 }
                
            }catch (error){
                //server problem -> 500
                return res.status(500).send({response: "Something went wrong with the db"});
            }
        }
    }else if (password && passwordRepeat && !isPasswordTheSame) {
        //return res.status(400).send({response:"Password do not match. Fields:password and passwordRepeat"})
        res.redirect('/signup');
    }else {
        //return res.status(404).send({response:"Missing fields: username, password, passwordRepeat"})
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
route.get("/login", (req, res) => {
    return res.render('loginpage/login');
 });

 route.get("/signup", (req, res) => {
    return res.render('signuppage/signup');
 });

 route.get("/admin", (req, res) => {
    if(req.session.isAdmin) {
        return res.render('admin/admin');
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