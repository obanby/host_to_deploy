// Core module
const path = require("path");
const bodyParser = require('body-parser');
// NPM
const express = require("express");
const dotEnv = require("dotenv").config();
const Loggy = require("@elbanby/loggy");
// Custom modules
const jsonR = require("./helpers/response");
const api_v1 = require("./api/api");
const Mongo = require("./db/mongo/Mongo");

const app = express();

if (dotEnv.error) {
    Loggy.error("dotenv configuration failed to load", dotEnv.error, __filename);
    process.exit(1);
}

new Mongo()
    .connect()
    .then(_ => Loggy.log("Successfully connected to DB", __filename))
    .catch(err => Loggy.error("Couldn't connect to db", err, __filename));

const PUBLIC = path.resolve(".", "public");

app.use("/", express.static(PUBLIC));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/", (req, res) => jsonR(res, 200,null, "Please Look at API documentation"));
app.use("/v1", api_v1);

app.listen(process.env.PORT, () => Loggy.log(`listening on port ${process.env.PORT}`, __filename));

