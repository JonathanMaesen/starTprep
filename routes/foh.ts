import express, { Router } from "express";

const router: Router = express.Router();

router.get("/", (req, res) => {
    res.render("foh", {
    });
});

export default router;