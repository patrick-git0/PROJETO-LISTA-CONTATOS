import express from "express";
import {getContacts, createContact, editContact, removeContact} from "../controllers/contactController.js"
 
const router = express.Router();

router.get("/", getContacts);
router.post("/", createContact);
router.put("/:id", editContact);
router.delete("/:id", removeContact);

export default router;