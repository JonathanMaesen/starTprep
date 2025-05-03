import express, { Router } from "express";
import { checkUserPassword, getUserInfobyname } from "../data/user";
import { checkIfUserHas2FFAcode } from "../data/auth";
import { User } from "../data/types";
const router: Router = express.Router();

router.get("/", (req, res) => {
    res.render("login", {
        e : ""
    });
});

router.post("/", async (req, res) => {
    const go: Boolean = await checkUserPassword(req.body.username, req.body.password);
    const user = await getUserInfobyname(req.body.username);
    
    if (!user) {
        return res.render("login", {
            e: "Invalid username"
        });
    }

    if (go) {
        await checkIfUserHas2FFAcode(user.id, ""); // Wait for 2FA code generation
        return res.redirect(`/login/auth?id=${user.id}`);
    } else {
        return res.render("login", {
            e: "Invalid password"
        });
    }
});

router.get("/auth", async (req, res) => {
    res.render("auth", {
        e: "",
        id: req.query.id
    });
});

router.post("/auth", async (req, res) => {
    const iduser: number = Number(req.query.id);
    const trycode: string = req.body.code;
    try {
        const isValidCode: Boolean | undefined = await checkIfUserHas2FFAcode(iduser, trycode);
        
        if (!isValidCode) {
            return res.render("auth", {
                e: "Invalid authentication code"
            });
        }
        
        return res.redirect("/home"); // Redirect to home page on success
    } catch (error) {
        console.error("2FA authentication error:", error);
        return res.render("auth", {
            e: "An error occurred during authentication"
        });
    }
});

router.get("/backend", (req, res) => {
    res.render("login", {
        e : ""
    });
});

router.post("/backend", async (req, res) => {
    const go: Boolean = await checkUserPassword(req.body.username, req.body.password);
    const user = await getUserInfobyname(req.body.username);
    
    if (!user) {
        return res.render("login", {
            e: "Invalid username"
        });
    }

    if (go) {
        return res.redirect(`/home`);
    } else {
        return res.render("login", {
            e: "Invalid password"
        });
    }
});

export default router;