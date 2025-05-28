import express, { Router } from "express";
import fetch from "node-fetch";

const router: Router = express.Router();

interface Meal {
    strMeal: string;
    strInstructions: string;
    strCategory: string;
    strArea: string;
    strMealThumb: string;
    idMeal: string;
    [key: string]: any;
}

type Recipe = {
    id: number;
    title: string;
    ingredients: string[];
    instructions: string[];
};

type GridItem = {
    id: number;
    title: string;
};

let gridItems: GridItem[] = [];
let nextId = 1;

router.get("/", (req, res) => {
    res.render("recipes", {
        gridItems,
        cssName: "recipes",
    });
});

router.post("/add-item", (req, res) => {
    gridItems.push({
        id: nextId++,
        title: "Nieuw item",
    });

    res.redirect("/recipes");
});

router.get("/search", async (req, res) => {
    const term = req.query.term as string;
    if (!term || term.trim().length < 3) {
        return res.status(400).json({ error: "Zoekterm te kort" });
    }
    try {
        const meals = await fetchMeals(term.trim());
        res.json({ meals });
    } catch (error) {
        res.status(500).json({ error: "Fout bij ophalen maaltijden" });
    }
});

// Functions

async function fetchMeals(term: string): Promise<Meal[]> {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    const data = await response.json() as { meals?: Meal[] };
    return data.meals ?? [];
}

export default router;