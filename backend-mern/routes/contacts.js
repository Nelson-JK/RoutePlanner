import express from "express";
import Contact from "../models/Contact.js";

import { geocodeAddress } from "../utils/geocode.js";
const router = express.Router();

// GET all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({
      createdAt: -1,
    });

    res.json(contacts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET single contact by ID
router.get("/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// POST create contact
// POST create contact
router.post("/", async (req, res) => {
  try {
    const { name, street, city, state, zip } = req.body;

    const { latitude, longitude } = await geocodeAddress(
      street,
      city,
      state,
      zip
    );

    const newContact = new Contact({
      name,
      street,
      city,
      state,
      zip,
      latitude,
      longitude
    });

    const savedContact = await newContact.save();

    res.status(201).json(savedContact);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// UPDATE contact
router.put("/:id", async (req, res) => {
  try {
    const updatedContact =
      await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!updatedContact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE contact
router.delete("/:id", async (req, res) => {
  try {
    const deletedContact =
      await Contact.findByIdAndDelete(
        req.params.id
      );

    if (!deletedContact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    res.json({
      message:
        "Contact deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;