const express = require("express");
const router = express.Router();

const positionController = require("../controllers/position");

router.get("/add-position", positionController.getAddPosition); //get add-position
router.post("/add-position", positionController.postPosition); //get add-position
router.post("/add-position:Id", positionController.postPosition); //delete-position

exports.router = router;
