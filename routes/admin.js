const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");

router.get("/index", adminController.getIndex); //home admin
router.post("/index", adminController.postFilterIndex); //home admin with filters employees by name

router.get("/add-employee", adminController.getAddEmployee); //get add-employee
router.post("/add-employee", adminController.postEmployee); //Post add-employee

router.get("/details/:Id", adminController.getDetails); //details-employee

router.get("/admin-options", adminController.getAdminOptions); //get all options

router.get("/admin-employee", adminController.getEditEmployee); //Edit / delete employee options

router.get("/edit/:Id", adminController.getEdit); //Editar
router.post("/edit", adminController.postEdit); //Editar

router.get("/delete/:Id", adminController.getDelete); //Delete
router.post("/delete", adminController.postDelete); //Delete

router.get("/vacation-manager", adminController.getVacationManager); //vacation manager
router.post("/vacation-manager", adminController.postVacationManager); //vacation manager

router.get("/cancel/:Id", adminController.getCancelVacation); //cancel vacation
router.post("/cancel", adminController.postCancelVacation); //cancel vacation

router.get("/admin-nomina", adminController.getNomina); //nomina.
router.post("/admin-nomina", adminController.postNomina); //actualizar nomina.

exports.router = router;
