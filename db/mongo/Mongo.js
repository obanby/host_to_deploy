// Core modules
const process = require("process");
// NPM
const mongoose = require('mongoose');
const Loggy = require("@elbanby/loggy");

class Mongo {
    constructor() {
        if (!process.env.DB_CON_STR)
            Loggy.error("invalid connection url", "connection url passed is incorrect", __filename);
        this.connectionStr = process.env.DB_CON_STR;
    }

    connect() {
        return new Promise((resolve, reject) => {
            mongoose.connect(this.connectionStr, { useUnifiedTopology: true, useNewUrlParser: true })
                .then(result => resolve(result))
                .catch(err => reject(err));
        });
    }
}

module.exports = Mongo;