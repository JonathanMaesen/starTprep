import express, { Router } from "express";
import { getDishes } from "../data/datausages";

const router: Router = express.Router();

router.get("/", async (req, res) => {
    getDishes();



    res.render("menu", {
    });
});
export default router;