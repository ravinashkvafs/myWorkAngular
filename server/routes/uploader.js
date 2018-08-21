var express = require('express');
var multer = require('multer');
var cloudinary = require('cloudinary');
var fs = require('fs');

var config = require('../config');
var verify = require('../verify');
var client = require('../db');

cloudinary.config({
    cloud_name: 'ravinashkvafs',
    api_key: '363387362749746',
    api_secret: 'kB2XyLOG9qtPFlonLgVxFtx0WIo'
});

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + "_" + file.originalname.replace(/\s/g, '-'));
    }
});
var upload = multer({ storage: storage });

// var upload = multer({ dest: '../public/uploads' })

var router = express.Router();

router.route('/upload-file')
    .post(upload.single('myFile'), function (req, res, next) {

        console.log(req.file);
        console.log("99----------------------------------------------");

        cloudinary.uploader.upload(req.file.path,
            function (result) {
                if ("error" in result) {
                    console.log({ error: result['error'], success: false });
                    return res.json({ error: result['error'], success: false });
                }

                fs.unlinkSync(req.file.path);

                client.getDb().collection('imageData').insert({ url: req.file.path }, function (err, user) {
                    if (err) {
                        // console.log(err);
                        res.status(500).send({ msg: "Failure" });
                        return;
                    }
                    else {
                        console.log({ data: result, success: true });
                        return res.json({ data: result, success: true });
                    }
                });

            },
            { use_filename: true, unique_filename: true, width: 200, height: 100, crop: "limit", effect: 'sepia', public_id: req.file.path.split('\\')[1] }
        );

    });

module.exports = router;