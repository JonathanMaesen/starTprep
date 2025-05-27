import express, { Router } from "express";
import { createUser } from "../data/user";
import {role as Role} from "../data/types"
import { resolve } from "path";

const router: Router = express.Router();

export const roleList: Role[] = ["ADMIN", "KEUKEN", "SERVEERSTER", "DEVELOPER"];
router.get("/", (req, res) => {
    res.render("register", {
        roles : roleList,
        cssName: "login"
    });
});

router.post("/", (req, res) => {
    if (req.body.name && req.body.role && req.body.password && req.body.mail) {
        createUser(req.body.name, req.body.role, req.body.password, req.body.mail);
        res.redirect('/login');
    } else {
        res.render('register', {
            error: 'All fields are required',
            cssName: "login"
        });
    }
});

export default router;
