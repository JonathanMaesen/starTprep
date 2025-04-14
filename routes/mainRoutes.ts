import express, { Router } from "express";

const router: Router = express.Router();

router.get("/", (req, res) => {
    res.render("index", {
    });
});
router.get("/login", (req, res) => {
    res.render("login");
});
router.get("/register", (req, res) => {
    res.render("register");
});


export default router;
