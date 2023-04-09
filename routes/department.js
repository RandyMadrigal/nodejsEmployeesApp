const express = require("express");
const router = express.Router();

const departmentController = require("../controllers/department");

router.get("/add-department", departmentController.getAddDepartment); //get add-department
router.post("/add-department", departmentController.postDepartment); //get add-department
router.post("/add-department:Id", departmentController.postDepartment); //delete-department

exports.router = router;
