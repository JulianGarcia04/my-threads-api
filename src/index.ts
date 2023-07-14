import { Hono } from "hono";
import { serveStatic } from "hono/serve-static.bun";
import { DOC_ID } from "./contants";
import baseFetch from "./fetch";

const port = parseInt(process.env.PORT) || 3000;

const app = new Hono();

app.use("/favicon.ico", serveStatic({ path: "./public/favicon.ico" }));

app.get("/", (c) => {
	return c.html("<span><h1>Message: </h1>Hello world</span>");
});

app.get("/user/:userID/:fbID", async (c) => {
	try {
		const userID = c.req.param("userID");
		const fbID = c.req.param("fbID");
		const data = await baseFetch(userID, DOC_ID, fbID);
		return c.json(data);
	} catch (error) {
		return c.text(error);
	}
});

console.log(`Running at http://localhost:${port}`);

export default {
	port,
	fetch: app.fetch,
};
