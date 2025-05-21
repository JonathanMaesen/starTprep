import express, { Router } from "express";
import { checkUserPassword, createUserJwtToken, getUserInfobyname } from "../data/user";
import { checkIfUserHas2FFAcode } from "../data/auth";
import { User } from "../data/types";

const router: Router = express.Router();

router.get("/", (req, res) => {
    res.render("login", {
        cssName: "login",
        e: ""
    });
});

router.post("/", async (req, res) => {
    const go: Boolean = await checkUserPassword(req.body.username, req.body.password);
    const user = await getUserInfobyname(req.body.username);

    if (!user) {
        return res.render("login", {
            cssName: "login",
            e: "Invalid username"
        });
    }

    if (go) {
        await checkIfUserHas2FFAcode(user.id, ""); // Wait for 2FA code generation
        return res.redirect(`/login/auth?id=${user.id}`);
    } else {
        return res.render("login", {
            cssName: "login",
            e: "Invalid password"
        });
    }
});

router.get("/auth", async (req, res) => {
    res.render("auth", {
        cssName: "login",
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
                cssName: "login",
                id: iduser,
                e: "Invalid authentication code"
            });
        }
        const jwttoken = await createUserJwtToken(iduser);
        res.cookie("jwt", jwttoken, {
            httpOnly: true,
            sameSite: "lax", 
            secure: false,
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });
        return res.redirect("/home"); // Redirect to home page on success
    } catch (error) {
        console.error("2FA authentication error:", error);
        return res.render("auth", {
            cssName: "login",
            e: "An error occurred during authentication",
            id: iduser
        });
    }
});

router.get("/backend", (req, res) => {
    res.render("login", {
        cssName: "login",
        e: ""
    });
});

router.post("/backend", async (req, res) => {
    const go: Boolean = await checkUserPassword(req.body.username, req.body.password);
    const user = await getUserInfobyname(req.body.username);

    if (!user) {
        return res.render("login", {
            cssName: "login",
            e: "Invalid username"
        });
    }

    if (go) {
        return res.redirect(`/home`);
    } else {
        return res.render("login", {
            cssName: "login",
            e: "Invalid password"
        });
    }
});

export default router;