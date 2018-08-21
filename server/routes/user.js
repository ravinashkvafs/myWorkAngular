var express = require('express');
var CryptoJS = require('crypto-js');

var config = require('../config');
var verify = require('../verify');
var client = require('../db');

var router = express.Router();

router.route('/this')
    .get(function (req, res, next) {
        // console.log(req);
        res.status(200).send({ msg: "Success" });
    });

router.route('/login')
    .post(function (req, res, next) {
        // console.log(req.body);
        // console.log(CryptoJS.AES.decrypt(req.body.password, config.secret).toString(CryptoJS.enc.Utf8));
        // req.body.password = CryptoJS.AES.decrypt(req.body.password, config.secret).toString(CryptoJS.enc.Utf8);
        // console.log(req.body);
        client.getDb().collection('user').findOne({ username: req.body.username }, function (err, user) {
            if (err) {
                // console.log(err);
                res.status(500).send({ msg: "Failure" });
                return;
            }
            else if (user) {
                if (CryptoJS.AES.decrypt(req.body.password, config.secret).toString(CryptoJS.enc.Utf8) == CryptoJS.AES.decrypt(user.password, config.secret).toString(CryptoJS.enc.Utf8)) {
                    console.log(CryptoJS.AES.decrypt(req.body.password, config.secret).toString(CryptoJS.enc.Utf8) + ' | ' + CryptoJS.AES.decrypt(user.password, config.secret).toString(CryptoJS.enc.Utf8));
                    res.status(200).send({ msg: "Success", token: verify.getToken({ username: req.body.username }) });
                }
                else {
                    res.status(404).send({ msg: "Incorrect Password !" });
                }

                return;
            }
            else {
                res.status(404).send({ msg: "User Not Found !" });
                return;
            }
        });
    });

router.route('/register')
    .post(function (req, res, next) {
        var body = req.body;
        console.log(CryptoJS.AES.decrypt(req.body.password, config.secret).toString(CryptoJS.enc.Utf8));
        client.getDb().collection('user').findOne({ username: body.username }, function (err, us) {
            if (err) {
                res.status(500).send({ msg: "Failure" });
                return;
            }
            else if (us) {
                res.status(400).send({ msg: "User Already Exists" });
            }
            else {
                client.getDb().collection('user').insert(body, function (err, user) {
                    if (err) {
                        res.status(500).send({ msg: "Failure" });
                        return;
                    }
                    else {
                        // console.log(user);
                        res.status(200).send({ msg: "Success", token: verify.getToken({ username: body.username }) });
                    }

                });
            }
        });
    });

module.exports = router;