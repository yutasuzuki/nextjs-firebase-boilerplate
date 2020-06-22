import firebase from "firebase/app";
import { serialize, parse } from "cookie";

const TOKEN_NAME = "__session";
const MAX_AGE = 60 * 60 * 8; // 8 hours
const EXPIRES = new Date(Date.now() + MAX_AGE * 1000);

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
      })
        .then((response) => response.json())
        .then((data) => {
          if (document.domain === "localhost") {
            document.cookie = `${TOKEN_NAME}=${data.sessionCookie}; max-age=${MAX_AGE}; expires=${EXPIRES}; domain=${document.domain}; path=/;`;
          }
          return data;
        });
    });
  }

  return fetch("/api/logout", {
    method: "POST",
    credentials: "same-origin",
  });
};

export const setTokenCookie = (res, token) => {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: EXPIRES,
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
  if (req.cookies) return req.cookies;
  const cookie = req.headers?.cookie;
  return parse(cookie || "");
};

export const getTokenCookie = (req) => {
  const cookies = parseCookies(req);
  return cookies[TOKEN_NAME];
};
