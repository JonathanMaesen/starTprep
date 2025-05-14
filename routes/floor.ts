import express, { Router } from "express";
import { floor } from "../data/datausages";

const router: Router = express.Router();

router.get("/", (req, res) => {
    res.render("floor", {
        cssName: "floor"
    });
});

export default router;
