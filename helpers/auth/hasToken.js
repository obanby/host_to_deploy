// This is a simple middle wear that simply checks if the JWT is available or not
// NPM Modules
const Loggy = require("@elbanby/loggy");
// Custom Modules
const jsonR = require("../response");

function hasToken(req, res, next) {
    if (!req.headers.jwt) {
        jsonR(res, 400, "Must provide your web token in request headers", null);
        return;
    }
    next();
}

module.exports = hasToken;