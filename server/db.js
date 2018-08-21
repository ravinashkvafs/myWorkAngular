var config = require('./config');
var mongodb = require('mongodb');

var mongoC = mongodb.MongoClient;

var db;

module.exports = {
    connectDb: function (cb) {
        mongoC.connect(config.mLab_key, function (err, client) {
            if (err) {
                cb(err);
            }

            db = client.db('ang5');

            // client.close();
            cb(null);
        });
    },
    getDb: function () {
        return db;
    }
}