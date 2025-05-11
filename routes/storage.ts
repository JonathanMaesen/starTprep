import express, { Router } from "express";

const router: Router = express.Router();

router.get("/", (req, res) => {
    res.render("storage", {
    });
});

export default router;


/* import express, { Router } from "express";
import { pushIngredient } from "../data/datausages";

const router: Router = express.Router();

router.get("/", (req, res) => {
    res.render("storage", {
    });
});

router.use(express.json());

router.post("/add", async (req, res) => {
    const newIngredient = req.body;

    try {
        await pushIngredient(newIngredient);
    } catch (error) {
        res.status(500).send({ message: "Failed to add ingredient." });
    }
});

export default router; */