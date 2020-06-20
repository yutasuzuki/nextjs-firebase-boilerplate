import { Request, Response } from "express";
// import {} from "next"
import {
  verifyIdToken,
  createSessionCookie,
} from "../../utils/auth/firebaseAdmin";
import { setTokenCookie } from "../../utils/auth/firebaseSessionHandler";

const handler = (req: Request, res: Response) => {
  const authorization = JSON.parse(req.headers.authorization);
  if (!authorization && !authorization.token) {
    return res.status(400);
  }
  return verifyIdToken(authorization.token)
    .then(async (decodedToken) => {
      const sessionCookie = await createSessionCookie(authorization.token);
      setTokenCookie(res, sessionCookie);
      return decodedToken;
    })
    .then((decodedToken) => {
      return res.status(200).json({ status: true, decodedToken });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export default handler;
