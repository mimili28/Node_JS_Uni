const router = require("express").Router();
//const uuid = require('uuid').v4;
const crypto = require("crypto");

const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "videos/");
    },
    filename: (req, file, cb) => {
        const fileName = crypto.randomBytes(20).toString("hex");
        const mimetypeArray = file.mimetype.split("/");
        if (mimetypeArray[0] === "video") {
            const extension = mimetypeArray[mimetypeArray.length - 1];
            cb(null, fileName + "." + extension);
        } else {
            cb("Not a video error. Mimetype: " + file.mimetype);
        }
    }
});
const upload = multer({ storage: storage });

const videos = [{
    title: "Ocean Waves",
    description: "Watch the waves and enjoy",
    fileName: "3ad1ed96-63d9-414e-8f34-27cdece63962.mp4",
    thumbnail: "",
    category: "Nature",
    tags: ["waves", "ocean", "coast"],
    uploadDate: new Date(2020, 3, 26, 08, 43)
}];

const videosPerPage = 10;

router.get("/videos", (req, res) => {
    const page = Number(req.query.page) ? Number(req.query.page) : 1;
    const start = (page-1) * videosPerPage;
    const end = start + videosPerPage;

    return res.send({ response: videos.slice(start, end) });
});

router.get("/videos/:videoId", (req, res) => {       
    return res.send({ response: videos.find(video => video.fileName === req.params.videoId) });
});

//single- video- the name from the input
router.post("/videos", upload.single('video'), (req, res) => {
   // console.log(req.file);

    let errors = [];

    let video = {
        fileName: req.file.filename,
        title: req.body.title || "",
        description: req.body.description || "",
        thumbnail: "",
        category: req.body.category ? req.body.category : "unknown",
        tags: req.body.tags.split(/\s*[,\s]\s*/),
        uploadDate: new Date()
    };

    if(video.title.length < 8 || video.title.length > 64){
        errors.push("Title is not between 8 and 64")
    }

    if(video.description.length > 2048){
        errors.push("The description cant be longer than 2048 chars");
    }
    if(errors.length > 0){
        return res.send({ response: errors});
    }else{
        videos.push(video);
        return res.redirect("/player/" + video.fileName);
    }

    return res.redirect("/");
});

module.exports = router;