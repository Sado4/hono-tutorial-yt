import { Hono } from "hono";

let blogPosts = [
  { id: 1, title: "First Post", content: "This is the first post" },
  { id: 2, title: "Second Post", content: "This is the second post" },
  { id: 3, title: "Third Post", content: "This is the third post" },
] satisfies { id: number; title: string; content: string }[];

const app = new Hono();

app.get("", (c) => {
  return c.json(blogPosts);
});

app.get("/:id", (c) => {
  const id = c.req.param("id");
  const post = blogPosts.find((post) => post.id === parseInt(id));
  return c.json(post);
});

app.post("", async (c) => {
  const post = (await c.req.json()) as {
    title: string;
    content: string;
  };
  const newPost = { id: blogPosts.length + 1, ...post };
  blogPosts = [...blogPosts, newPost];
  return c.json(newPost);
});

app.put("/:id", async (c) => {
  const id = c.req.param("id");
  const index = blogPosts.findIndex((post) => post.id === parseInt(id));

  if (index === -1) {
    return c.json({ error: "Post not found" }, 404);
  }

  const post = (await c.req.json()) as {
    title: string;
    content: string;
  };
  blogPosts[index] = { ...blogPosts[index], ...post };

  return c.json(blogPosts[index]);
});

app.delete("/:id", (c) => {
  const id = c.req.param("id");
  const index = blogPosts.findIndex((post) => post.id === parseInt(id));

  if (index === -1) {
    return c.json({ error: "Post not found" }, 404);
  }

  blogPosts = blogPosts.filter((post) => post.id !== parseInt(id));

  return c.json({ message: "Post deleted" });
});

export default app;
