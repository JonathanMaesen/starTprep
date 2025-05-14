import express, { Router } from "express";

const router: Router = express.Router();

router.get("/", (req, res) => {
    res.render("home", {
        cssName: "home"
    });
});

export default router;
