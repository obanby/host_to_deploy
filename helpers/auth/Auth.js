// Core module
const proccess = require("process");
// NPM
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

class Auth {
    static hash(password) {
        return bcrypt.hash(password, 10)
    }

    static comparePassword(providedP, currentP) {
        return bcrypt.compare(providedP, currentP);
    }

    static sign(signObj) {
        return new Promise( (resolve, reject) => {
            jwt.sign(signObj, proccess.env.JWT_TOKEN, (err, token) => {
               if (err) reject(err);
               resolve(token);
            });
        });
    }

    static verify(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, proccess.env.JWT_TOKEN, (err, decoded) => {
                if (err) reject(err);
                resolve(decoded);
            });
        });
    }

}

module.exports = Auth;