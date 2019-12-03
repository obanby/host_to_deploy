// NPM
const express = require("express");
// Custom
const jsonR = require("../helpers/response");
// APIs
const hostAPI = require("./v1/host/api");
const touristAPI = require("./v1/tourist/api");
const eventAPI = require("./v1/event/api");

const api = express.Router();

api.get("/", (req, res) => jsonR(res, 200, null, "API V1"));
api.use("/host", hostAPI);
api.use("/tourist", touristAPI);
api.use("/event", eventAPI);

module.exports = api;