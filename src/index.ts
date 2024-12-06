import { Hono } from "hono";
import posts from "./blogs/blog";
import auth from "./auth/auth";
import { basicAuth } from "hono/basic-auth";

const app = new Hono();

app.use(
  "/auth/*",
  basicAuth({
    username: "user1",
    password: "password",
  })
);

app.route("/posts", posts);
app.route("/auth", auth);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
