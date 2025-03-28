import { Hono } from 'hono';
import mainRoute from "./router/index.js";
import { cors } from 'hono/cors';
import { handle } from 'hono/vercel';
export const runtime = 'edge';
const app = new Hono().basePath('/api');

app.use('*', cors({
    origin : "*",
    allowMethods: ['GET'],
}));
app.route("/v1", mainRoute);
const handler = handle(app);
export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;
