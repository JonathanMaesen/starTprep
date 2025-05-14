import express, { Router } from "express";
import { createUser } from "../data/user";

const router: Router = express.Router();

router.get("/", (req, res) => {
    res.render("register", {
        cssName: "register"
    });
});

router.post("/", (req, res) => {
    if (req.body.name && req.body.role && req.body.password && req.body.mail) {
        createUser(req.body.name, req.body.role, req.body.password, req.body.mail);
        res.redirect('/login');
    } else {
        res.render('register', {
            error: 'All fields are required'
        });
    }
});

export default router;
