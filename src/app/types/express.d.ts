import cookieSession, { Session } from "cookie-session";

declare namespace Express {
  export interface Request {
    session?: Session;
  }
}
