const express = require("express");
const { checkValue, message } = require("../controller/controller");

const Router = express.Router();

Router.post("/data", checkValue).post('/message', message)

module.exports = {Router}