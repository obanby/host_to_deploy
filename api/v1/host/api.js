// NPM
const express = require("express");
const Loggy = require("@elbanby/loggy");
// Custom
const handler = require("./handlers");

const hostApi = express.Router();

hostApi.get("/", handler.getAll);

hostApi.post("/signup", handler.signup);
hostApi.post("/login", handler.login);
hostApi.post("/editprofile", handler.editProfile);

module.exports = hostApi;
