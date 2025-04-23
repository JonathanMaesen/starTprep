import express, { Router } from "express";

const router: Router = express.Router();


router.get("/floor", (req, res) => {
    res.render("floor");
});

router.get("/foh", (req, res) => {
    res.render("foh");
});

router.get("/home", (req, res) => {
    res.render("home");
});

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/menu", (req, res) => {
    res.render("menu");
});

router.get("/order", (req, res) => {
    res.render("order");
});

router.get("/recipes", (req, res) => {
    res.render("recipes");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/scanner", (req, res) => {
    res.render("scanner");
});

router.get("/storage", (req, res) => {
    res.render("storage");
});

export default router;
