import { Hono } from "hono";
import { userRouter } from "./Routes/User";
import { BlogRouter } from "./Routes/Blog";
import type { Bindings } from "./types";

const app = new Hono<{ Bindings: Bindings }>();

app.route("/api/v1/user", userRouter);

app.route("/api/v1/blog", BlogRouter);


export default app;