// NPM
const express = require("express");
const Loggy = require("@elbanby/loggy");
// Custom
const handler = require("./handler");
const hasToken = require("../../../helpers/auth/hasToken");

const eventAPI = express.Router();

// Public Endpoints
eventAPI.get("/", handler.getAll);
eventAPI.get("/id/:id", handler.getById);
eventAPI.get("/filter", handler.filter);
// Middle wear to validate JWT exist
eventAPI.use(hasToken);
// Private end points
eventAPI.post("/create", handler.create);
eventAPI.post("/update/:id", handler.update);

module.exports = eventAPI;