const router = require("express").Router();
const crypto = require("crypto");

const Photo = require('../models/Photo.js');
const User = require('../models/User.js');

const requireLogin = (req, res, next) => {
    if (req.session.user) {
      next(); 
    } else {
      return res.redirect("/login"); 
    }
}

router.get("/logged-user", requireLogin, async (req, res) => {
    return res.status(200).json(req.session.user[0]);
}); 

router.get("/profile-photos", requireLogin, async (req, res) => {
    const userId = await User.query().select("id").where({'username': req.session.user[0].username});
    const userPhotos = await Photo.query().select().where({'user_id': userId[0].id});
    return res.status(200).json(userPhotos);
});



module.exports = router;