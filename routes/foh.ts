import express, { Router } from "express";
import { floor, pushFloorElement } from "../data/datausages";
import { Floorelement } from "../data/types";
import { table } from "console";
const router: Router = express.Router();


router.get("/", async (req, res) => {
    res.render("foh", {
        tables: floor
    });
});
router.post("/sortfloor", async (req, res) => {
    const sortingdirection = req.body.sortOptions;
    if (sortingdirection === "asc") {
        floor.sort((a, b) => parseInt(a.follownummer) - parseInt(b.follownummer));
    } else if (sortingdirection === "desc") {
        floor.sort((a, b) => parseInt(b.follownummer) - parseInt(a.follownummer));
    }else if (sortingdirection === "chairsAsc"){
        floor.sort((a, b) => parseInt(a.amount.toString()) - parseInt(b.amount.toString()));
    }else if (sortingdirection === "chairsDesc"){
        floor.sort((a, b) => parseInt(b.amount.toString()) - parseInt(a.amount.toString()));
    }
    res.redirect("/foh");
});
router.post("/addtable", async (req, res) => {
    try {
        const tableNumbers: string[] = floor.map(table => table.follownummer);
        let outOfOrderElement: string | null = null;
        for (let i = 0; i < tableNumbers.length - 1; i++) {
            if (parseInt(tableNumbers[i]) > parseInt(tableNumbers[i + 1])) {
                outOfOrderElement = tableNumbers[i + 1];
                break;
            }
        }
        const newtable : Floorelement = {
            follownummer: outOfOrderElement || (parseInt(tableNumbers[tableNumbers.length - 1]) + 1).toString(),
            amount: 0
        }
        await console.log(newtable)
        res.redirect("/foh");

    } catch (error) {
        console.error("Error adding table:", error);
        res.status(500).send("internal server errro");
    }
});

export default router;