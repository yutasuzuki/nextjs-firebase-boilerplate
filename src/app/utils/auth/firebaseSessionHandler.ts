import firebase from "firebase/app";

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
