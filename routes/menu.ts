import express, { Router } from "express";

const router: Router = express.Router();

router.get("/", async (req, res) => {
    res.render("menu", {
    });
});
export default router;