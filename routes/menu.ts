import express, { Router } from "express";

const router: Router = express.Router();
import { floor } from "../data/datausages";
import { Floorelement } from "../data/types";

router.get("/:search", (req, res) => {

    const search = req.params.search.toLowerCase();
    const table: Floorelement | undefined = floor.find(el => el.follownummer.toLowerCase() === search);
    res.render("menu", {
        cssName: "menu",
        table : table,
    });
});

export default router;
