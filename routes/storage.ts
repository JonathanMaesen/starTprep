import express, { Router } from "express";

const router: Router = express.Router();

router.get("/", (req, res) => {
    res.render("storage", {
    });
});

export default router;

/*-------------------------------------------------------------------------------*/

/*So... I get errors and just give up, I think this should be okay
but I'm not sure since I can't test it
So, if this is okie, feel free to use it, if not, feel free to fix it, I can't*/

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