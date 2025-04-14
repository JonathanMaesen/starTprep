import express, { Router } from "express";

const router: Router = express.Router();

router.get("/foh", (req, res) => {
    res.render("foh", {
    });
});

export default router;
