import express, { Router } from "express";

const router: Router = express.Router();

router.get("/front-of-house", (req, res) => {
    res.render("front-of-house", {
    });
});

export default router;
