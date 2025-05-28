import express, { Router, Request, Response } from "express";
import { pushIngredient, ingredients, updateIngredient, deleteIngredient} from "../data/datausages";
import { Ingredient } from "../data/types";
import { deleteElements } from "../data/database";
import { render } from "ejs";


const router: Router = express.Router();


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

async function cleanup(){
    const response = await deleteElements("ingredients", { "name" : "New Ingredient"});
    if(response == undefined){ return console.error("the cleanup returns undefined")}
    console.log(response);
}

router.get("/", async (req: Request, res: Response) => {
    try {
        res.render("storage", {
            cssName : "storage",
            ingredients: ingredients
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to fetch ingredients." });
    }
});

router.get("/filter/:name", async (req, res) => {
    const filtered:Ingredient[] = ingredients.filter((e) => {return e.name.includes(req.params.name)});
    let data = '';
    for (let item of filtered) {
        data += await new Promise((resolve) => {
            res.render("partials/storage/ingredient", { element: item }, (err, html) => {
                if (err) {
                    console.error(err);
                    resolve('');
                } else {
                    resolve(html);
                }
            });
        });
    }
    res.send(data);
});

router.get("/add", (req,res) => {
    res.render("partials/storage/createingredient");
});

router.post("/add", async (req: Request, res: Response) => {
    const highestid: number = ingredients.sort((a, b) => { return a.id - b.id})[ingredients.length -1].id;
    const newIngredient: Ingredient = req.body;
    newIngredient.id = highestid;
    await pushIngredient(newIngredient);
    res.redirect("/storage");
});

router.get("/editbar", (req,res) => {
    return res.render("partials/storage/barscanner", {
    });
});

router.post("/editbar", (req,res) => {
    const bar: string | null = typeof req.body.barcode == "string" ? req.body.barcode : null;
    const obj:Ingredient | null = ingredients.find((e) => {return e.barcode == bar}) ?? null;
    if((bar == null)||(obj == null)){
        return res.render("partials/storage/barscanner");
    }
    return res.render("partials/storage/editingredient", {
        data : obj
    });
});

router.get("/edit", (req,res) => {
    const naam: string | null = typeof req.query.name == "string" ? req.query.name : null;
    const obj : Ingredient | null = ingredients.find((e) => {return e.name == naam}) ?? null;
    if((naam == null)||(obj == null)){
        return res.render("partials/storage/createingredient");
    }
    return res.render("partials/storage/editingredient", {
        data : obj
    });
});

router.post("/edit", async (req,res) => {
    const { id, name, pricepk, barcode, unitprice, quantity, quantityWeightKg } = req.body;
    const updatedIngredient: Ingredient = {
        id: Number(id),
        name,
        pricepk: Number(pricepk),
        barcode,
        unitprice: Number(unitprice),
        quantity: Number(quantity),
        quantityWeightKg: Number(quantityWeightKg)
    };
    await updateIngredient(Number(id), updatedIngredient);
    return res.redirect("/storage");
});

router.post("/remove", async (req,res) => {
    const { id }= req.body;
    console.log(id);
    await deleteIngredient(Number(id));
    return res.redirect("/storage");
});
export default router;