import express, { Router } from "express";
import {
  getAllDataMongoDB,
  insertOneObjMongodb,
  deleteElement
} from "../data/database";
import { Ticket } from "../data/types";

const router: Router = express.Router();
const COLLECTION = "tickets";

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// GET /ticket — Toon alle tickets
router.get("/", async (req, res) => {
  try {
    const tickets: Ticket[] = await getAllDataMongoDB(COLLECTION);
    res.render("ticket", { tickets, cssName: "ticket" });
  } catch (err) {
    console.error("❌ Fout bij ophalen tickets:", err);
    res.status(500).send("Fout bij ophalen tickets");
  }
});

// POST /ticket/add — Voeg een nieuw ticket toe
router.post("/add", async (req, res) => {
  try {
    const { follownummer, chairAndDish } = req.body;

    if (!follownummer || !chairAndDish) {
      return res.status(400).send("Follownummer of gerechten ontbreken");
    }

    const parsedChairAndDish =
      typeof chairAndDish === "string"
        ? JSON.parse(chairAndDish)
        : chairAndDish;

    const newTicket: Ticket = {
      follownummer,
      chairAndDish: parsedChairAndDish,
    };

    await insertOneObjMongodb(COLLECTION, newTicket);
    res.redirect("/ticket");
  } catch (err) {
    console.error("❌ Fout bij toevoegen ticket:", err);
    res.status(500).send("Fout bij toevoegen ticket");
  }
});

// POST /ticket/delete — Verwijder een ticket op basis van follownummer
router.post("/delete", async (req, res) => {
  const { follownummer } = req.body;
  if (!follownummer) return res.status(400).send("Follownummer ontbreekt");

  try {
    const result = await deleteElement(COLLECTION, { follownummer });
    if (!result || result.deletedCount === 0) {
      return res.status(404).send("Ticket niet gevonden");
    }
    res.sendStatus(200);
  } catch (err) {
    console.error("❌ Fout bij verwijderen ticket:", err);
    res.status(500).send("Fout bij verwijderen ticket");
  }
});

export default router;
