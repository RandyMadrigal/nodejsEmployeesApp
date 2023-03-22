const express = require("express");
const router = express.Router();

const loginController = require("../controllers/login");

router.get("/", loginController.getLogin); //login

exports.router = router;
