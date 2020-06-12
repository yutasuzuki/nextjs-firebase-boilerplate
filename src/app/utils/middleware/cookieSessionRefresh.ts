import { Request, Response } from "express";

export const cookieSessionRefresh = (handler: any) => {
  return (req: Request, res: Response) => {
    if (req.session) {
      req.session.nowInMinutes = Math.floor(Date.now() / 60e3);
    }
    handler(req, res);
  };
};
