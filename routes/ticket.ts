import express, { Router } from "express";
import fs from "fs";
import path from "path";

const router: Router = express.Router();
const jsonPath = path.join(process.cwd(), "data", "tickets.json");

router.use(express.urlencoded({ extended: true }));

function readTickets(): any[] {
  if (!fs.existsSync(jsonPath)) return [];
  try {
    const raw = fs.readFileSync(jsonPath, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeTickets(tickets: any[]): boolean {
  try {
    fs.writeFileSync(jsonPath, JSON.stringify(tickets, null, 2), "utf-8");
    return true;
  } catch {
    return false;
  }
}

router.get("/", (req, res) => {
  const tickets = readTickets();
  res.render("ticket", { tickets, cssName: "ticket" });
});

router.post("/delete", (req, res) => {
  const ticketId = req.body.ticketId;
  if (!ticketId) return res.status(400).send("Missing ticket ID");

  const current = readTickets();
  const updated = current.filter(t => t.id !== ticketId);

  if (updated.length === current.length) return res.status(404).send("Not found");
  if (!writeTickets(updated)) return res.status(500).send("Failed to write");

  return res.sendStatus(200);
});

export default router;
