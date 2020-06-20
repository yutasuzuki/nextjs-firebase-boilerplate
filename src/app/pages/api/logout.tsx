import { Request, Response } from "express";
import { removeTokenCookie } from "../../utils/auth/firebaseSessionHandler";

const handler = (req: Request, res: Response) => {
  removeTokenCookie(res);
  res.status(200).json({ status: true });
};

export default handler;
