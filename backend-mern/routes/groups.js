import express from "express";
import Contact from "../models/Contact.js";
import { groupContacts } from "../utils/groupContacts.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();

    const contactsWithLocation = contacts.filter(
      (contact) =>
        contact.latitude != null &&
        contact.longitude != null
    );

    const groups = groupContacts(contactsWithLocation);

    res.json(groups);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

export default router;