import express from "express";
import validateToken from "../middleware/validateToken.js";
import {getAllContact, getContact, addContact, editContact, deleteContact} from "../controller/contactController.js"

const router = express.Router()

router.use(validateToken)

router.route("/").get(getAllContact).post(addContact)
router.route("/:id").get(getContact).put(editContact).delete(deleteContact)

export default router