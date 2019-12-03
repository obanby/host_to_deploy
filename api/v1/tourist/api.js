// NPM
const express = require("express");
const Loggy = require("@elbanby/loggy");
// Custom
const handler = require("./handlers");

const touristApi = express.Router();

touristApi.get("/", handler.getAll);

touristApi.post("/signup", handler.signup);
touristApi.post("/login", handler.login);
touristApi.post("/editprofile", handler.editprofile);
touristApi.post("/joinEvent", handler.joinEvent);
touristApi.post("/leaveEvent", handler.leaveEvent);
touristApi.post("/joinedEvents", handler.joinedEvents);
module.exports = touristApi;