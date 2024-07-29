import app from "./app";

Bun.serve({
    fetch: app.fetch,
});

console.log("Server running on port 3000");