import { cookieSessionWrapper } from "./cookieSession";
import { cookieSessionRefresh } from "./cookieSessionRefresh";

export const commonMiddleware = (handler: any) => {
  console.log("commonMiddleware");
  return cookieSessionWrapper(cookieSessionRefresh(handler));
};
