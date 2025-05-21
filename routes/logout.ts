import express, { Router } from "express";

const router: Router = express.Router();

router.get("/", (req, res) => {
    res.clearCookie("jwt");
    res.redirect("/login");
});

export default router;