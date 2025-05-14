import express, { Router } from "express";
import fs from "fs";
import path from "path";

const router: Router = express.Router();

// Path to your JSON file
const jsonPath = path.join(__dirname, "../data/tickets.json");

router.get("/", (req, res) => {
  // Default ticket always shown
  let tickets = [
    {
      id: "TKT-001",
      title: "Sample Ticket",
      description: "This is a test ticket.",
      status: "Open",
      createdAt: "2025-05-07",
      updatedAt: "2025-05-07",
      extraCommentaar: "",
      doneButton: false,
      allergenen: [],
      effectiefBesteld: [],
      supplementen: [],
      extraTijd: null
    }
  ];

  // Try to load more tickets from JSON
  if (fs.existsSync(jsonPath)) {
    try {
      const raw = fs.readFileSync(jsonPath, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        tickets = [...tickets, ...parsed];
        console.log(`✅ Loaded ${parsed.length} extra ticket(s) from JSON.`);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.warn("⚠️ Could not load tickets.json:", err.message);
      } else {
        console.warn("⚠️ Could not load tickets.json (unknown error)");
      }
    }
  } else {
    console.warn("⚠️ tickets.json not found at:", jsonPath);
  }

  res.render("ticket", { tickets });
});

export default router;
