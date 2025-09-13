import express, { type Application } from "express";
import routes from "./routes/index.js";

const app: Application = express();

// Middlewares globales
app.use(express.json());
app.use("/api", routes);

export default app;
