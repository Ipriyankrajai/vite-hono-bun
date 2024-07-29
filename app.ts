import { Hono } from "hono";
import { logger } from "hono/logger";
import { expenseRoute } from "./routes/expenses";

const app = new Hono();

app.use("*", logger());
app.get("/", (c) => c.text("Hello, Hono!"));
app.route("/api/expense", expenseRoute);

export default app;
