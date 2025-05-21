import express, { Router, Request, Response } from "express";
import { pushIngredient, getDataIngredients } from "../data/datausages";
import { Ingredient } from "../data/types";


const router: Router = express.Router();


router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.get("/", async (req: Request, res: Response) => {
    try {
        const ingredients = await getDataIngredients();


        res.render("storage", {
            ingredients: ingredients
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to fetch ingredients." });
    }
});


router.post("/add", async (req: Request, res: Response) => {
    const newIngredient: Ingredient = req.body;


    try {
        await pushIngredient(newIngredient);
        res.status(201).send({ message: "Ingredient added successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to add ingredient." });
    }
});


export default router;