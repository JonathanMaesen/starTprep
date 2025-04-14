import express, { Router } from "express";

const router: Router = express.Router();

router.get("/front-of-house", (req, res) => {
    res.render("profile", {
        title: "User Profile",
        message: "Welcome to your profile"
    });
});

export default router;
