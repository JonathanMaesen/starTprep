import express, { Express } from "express";
import path from "path";
import mainRoutes from "./routes/mainRoutes";
import userRoutes from "./routes/login";
import cookieParser from "cookie-parser";
import { PORT } from "./config/config";
import { closeConnection } from "./data/database";

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Add cookie-parser middleware

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));

//routes
app.use("/", mainRoutes);

// middelware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});

process.on("SIGINT", async () => {
    console.log("SIGINT received, shutting down...");
    await closeConnection();
    process.exit(0);
});

process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutting down...");
    await closeConnection();
    process.exit(0);
});