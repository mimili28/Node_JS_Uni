const router = require("express").Router();
const crypto = require("crypto");

const Photo = require('../models/Photo.js');
const User = require('../models/User.js');


const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "photos/");
    },
    filename: (req, file, cb) => {
        const fileName = crypto.randomBytes(20).toString("hex");
        const extension = file.mimetype.split("/")[1];
        cb(null, fileName + `.${extension}`);
    }
});
const upload = multer({ storage: storage });

router.get("/photos", async (req,res) => {
    const photos = await Photo.query().select('photos.*', 'users.username').join('users', 'photos.user_id', '=', 'users.id');
    return res.status(200).json(photos);
});

router.get("/photos/:photoId", async (req, res) => {  
    const photo = await Photo.query().select().where({'filename': req.params.photoId}).limit(1);
    return res.status(200).json(photo);
});

router.get("/delete/:photoId", async (req,res) => {
    const photo = await Photo.query().delete().where({'filename': req.params.photoId});
    return res.redirect("/profile")
});

router.post("/upload/photos", upload.single('photo'), async (req, res) => {
     let errors = [];
     const description= req.body.description || "";
     const tags = req.body.tags;
     const uploadDate= new Date();
 
     if(description.length > 2048){
         errors.push("The description cant be longer than 2048 chars");
     }
     if(errors.length > 0){
         return res.send({ response: errors});
     }else{
         const userId = await User.query().select("id").where({'username': req.session.user[0].username});
         const photo = await Photo.query().insert({
            filename: req.file.filename,
            description,
            tags,
            user_id: userId[0].id
         });
         return res.redirect("/profile");
     }

     return res.redirect("/");
 });
 
 module.exports = router;