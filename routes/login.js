const express = require("express");
const router = express.Router();

const loginController = require("../controllers/login");

router.get("/", loginController.getLogin); //login
router.post("/", loginController.postLogin); //Enter home page...

exports.router = router;
