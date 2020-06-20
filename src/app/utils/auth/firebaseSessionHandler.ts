import firebase from "firebase/app";
import { serialize, parse } from "cookie";

type SetSession = (user: firebase.User) => Promise<Response>;
export const setSession: SetSession = (user) => {
  if (user) {
    return user.getIdToken().then((token) => {
      return fetch("/api/login", {
        method: "POST",
        headers: {
          authorization: JSON.stringify({ token }),
        },
        credentials: "same-origin",
      });
    });
  }

  return fetch("/api/logout", {
    method: "POST",
    credentials: "same-origin",
  });
};

const TOKEN_NAME = "__session";
const MAX_AGE = 60 * 60 * 8; // 8 hours

export const setTokenCookie = (res, token) => {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });

  res.setHeader("Set-Cookie", cookie);
};

export const removeTokenCookie = (res) => {
  const cookie = serialize(TOKEN_NAME, "", {
    maxAge: -1,
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);
};

export const parseCookies = (req) => {
  console.log("req.headers.cookie", req.headers.cookie);
  if (req.cookies) return req.cookies;
  const cookie = req.headers?.cookie;
  return parse(cookie || "");
};

export const getTokenCookie = (req) => {
  const cookies = parseCookies(req);
  return cookies[TOKEN_NAME];
};
