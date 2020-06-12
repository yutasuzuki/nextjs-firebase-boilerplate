import { Request, Response } from "express";
import { commonMiddleware } from "../../utils/middleware/commonMiddleware";

const handler = (req: Request, res: Response) => {
  req.session = null;
  res.status(200).json({ status: true });
};

export default commonMiddleware(handler);
