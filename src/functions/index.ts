import { https } from "firebase-functions";
import path from "path";
import next from "next";
import loginHandler from "./apis/login";
import logoutHandler from "./apis/logout";

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({
  dev,
  conf: { distDir: `${path.relative(process.cwd(), __dirname)}/next` },
});
const handle = nextApp.getRequestHandler();

export const hosting = https.onRequest(async (req, res) => {
  console.log("File: " + req.originalUrl);
  await nextApp.prepare();
  handle(req, res);
});

export const login = https.onRequest(loginHandler);

export const logout = https.onRequest(logoutHandler);
