import express, { Express } from "express";
import path from "path";
import mainRoutes from "./routes/mainRoutes";
import userRoutes from "./routes/userRoutes";
import { PORT } from "./config/config";

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));

// Use the routes
app.use("/", mainRoutes);
app.use("/user", userRoutes);

// Centralized error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
