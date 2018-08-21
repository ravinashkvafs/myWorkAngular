var jwt = require('jsonwebtoken');

var config = require('./config');

exports.getToken = function (details) {
    return jwt.sign({ username: details.username, password: details.password }, config.secret);
}

exports.verifyOrdinaryUser = function (req, res, next) {
    var token = req.headers['x-access-token'];

    if (token) {
        jwt.verifyToken(token, config.secret, function (err, decoded) {
            if (err) {
                res.status(401).send("You are not authenticated !");
                return next(err);
            }
            else {
                req.decoded = decoded;
                return next();
            }
        });
    }
    else {
        res.status(401).send("No token provided !");
        return next(err);
    }
}