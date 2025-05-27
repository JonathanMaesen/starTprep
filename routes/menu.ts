import express, { Router } from "express";
import { floor, dishmaster, dishes, updateFloorElement } from "../data/datausages";
import { Dish, Floorelement, Ticket } from "../data/types";

const router: Router = express.Router();

let ticket: Ticket = {
    follownummer: "",
    chairAndDish: [],
};
router.get("/:search", async (req, res) => {
    const search: string = req.params.search;
    const table = floor.find((table: Floorelement) => table.follownummer === search);
    if (!table) {
        return res.status(404).send("Table not found");
    }
    ticket.follownummer = search;
    res.render("menu", {
        cssName: "menu",
        table: table,
        ticket: ticket,
        dishmaster: dishmaster,
        dishes: dishes,
        banner: null

    });
});

router.post("/:search/addChair", async (req, res) => {
    const search: string = req.params.search;
    const table = floor.find((table: Floorelement) => table.follownummer === search);
    if (!table) {
        return res.status(404).send("Table not found");
    }
    table.amount += 1;
    updateFloorElement(search, table)
    res.redirect(`/menu/${req.params.search}`);
});

router.post("/:search/removeDish", async (req, res) => {
});

router.post("/:search/addDish/:dish/:chair", async (req, res) => {
    const tableId = req.params.search;
    const dishName = req.params.dish;
    const chair = Number(req.params.chair);

    const dish = dishes.find(d => d.name === dishName);
    if (!dish) {
        return res.status(404).render("menu", {
            cssName: "menu",
            table: floor.find(t => t.follownummer === tableId),
            ticket,
            dishmaster,
            dishes,
            banner: { type: "error", msg: "Gerecht niet gevonden" }
        });
    }

    let bucket = ticket.chairAndDish.find(c => c.chair === chair);
    if (!bucket) {
        bucket = { chair, dish: [] };
        ticket.chairAndDish.push(bucket);
    }
    bucket.dish.push(dish);

    res.redirect(`/menu/${tableId}`);
});



export default router;