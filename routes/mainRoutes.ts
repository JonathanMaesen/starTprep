import express, { Router } from "express";
import floor from "./floor";
import foh from "./foh";
import home from "./home";
import index from "./index";
import login from "./login";
import menu from "./menu";
import order from "./order";
import recipes from "./recipes";
import register from "./register";
import scanner from "./scanner";
import storage from "./storage";

const router: Router = express.Router();


router.use("/floor", floor);

router.use("/foh", foh);

router.use("/home", home);

router.use("/", index);

router.use("/login", login);

router.use("/menu", menu);

router.use("/order", order);

router.use("/recipes", recipes);

router.use("/register", register);

router.use("/scanner", scanner);

router.use("/storage", storage);

export default router;
