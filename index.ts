Bun.serve({
    fetch(req) {
        return new Response("Hello from Bun!");
    },
});

console.log("Server running on port 3000");