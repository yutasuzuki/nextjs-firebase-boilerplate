import cookieSession from "cookie-session";
import { Request, Response } from "express";

export const addSession = (req: Request, res: Response) => {
  if (
    !(process.env.SESSION_SECRET_CURRENT && process.env.SESSION_SECRET_PREVIOUS)
  ) {
    throw new Error(
      "Session secrets must be set as env vars `SESSION_SECRET_CURRENT` and `SESSION_SECRET_PREVIOUS`."
    );
  }

  const sessionSecrets = [
    process.env.SESSION_SECRET_CURRENT,
    process.env.SESSION_SECRET_PREVIOUS,
  ];

  const includeSession = cookieSession({
    keys: sessionSecrets,
    httpOnly: true,
    overwrite: true,
  });
  includeSession(req, res, () => {});
};

type Handler = (req: Request, res: Response) => void;
type CookieSessionWrapper = (handler: Handler) => Handler;
export const cookieSessionWrapper: CookieSessionWrapper = (handler) => {
  return (req, res) => {
    try {
      addSession(req, res);
    } catch (e) {
      return res.status(500).json({ error: "Could not get user session." });
    }
    return handler(req, res);
  };
};
