import { Request, Response } from "express";
import { verifyIdToken } from "../..//utils/auth/firebaseAdmin";
import { commonMiddleware } from "../../utils/middleware/commonMiddleware";

const handler = (req: Request, res: Response) => {
  const authorization = JSON.parse(req.headers.authorization);
  if (!authorization && !authorization.token) {
    return res.status(400);
  }
  return verifyIdToken(authorization.token)
    .then((decodedToken) => {
      req.session.decodedToken = decodedToken;
      req.session.token = authorization.token;
      return decodedToken;
    })
    .then((decodedToken) => {
      return res.status(200).json({ status: true, decodedToken });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export default commonMiddleware(handler);
