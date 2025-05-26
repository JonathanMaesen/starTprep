import express, { Router } from "express";
import { floor } from "../data/datausages";
import { Floorelement } from "../data/types";

const router: Router = express.Router();


router.get("/:search", async (req, res) => {
    const search : string = req.params.search;

    const chairCount: number =
        table?.follownummer !== undefined ? Number.parseInt(String(table.follownummer), 10) : 0;

    console.log(table)
    res.render("menu", {
        cssName: "menu",
        table: table,
        chairCount: chairCount,
    });
});

export default router;