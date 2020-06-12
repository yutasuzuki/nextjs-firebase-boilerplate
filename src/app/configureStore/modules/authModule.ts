import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { get, has } from "lodash";
import { auth } from "../../libs/initFirebase";
import { setSession } from "../../utils/auth/firebaseSessionHandler";

export interface AuthUser {
  id: string;
  name: string;
  photoURL: string;
}

export interface AuthUserInfo {
  user?: AuthUser;
  token?: string;
}
interface ServerSidePayload {
  firebaseUser: firebase.User;
  token: string;
}

const createAuthUser = (firebaseUser: firebase.User): AuthUser => {
  if (!firebaseUser || !firebaseUser.uid) {
    return null;
  }
  return {
    id: get(firebaseUser, "uid"),
    name: has(firebaseUser, "name")
      ? get(firebaseUser, "name") // cookie
      : has(firebaseUser, "displayName")
      ? get(firebaseUser, "displayName") // client SDK
      : get(firebaseUser, "display_name"), // admin SDK
    photoURL: has(firebaseUser, "picture")
      ? get(firebaseUser, "picture") // cookie
      : has(firebaseUser, "photoURL")
      ? get(firebaseUser, "photoURL") // client SDK
      : get(firebaseUser, "photo_url"), // admin SDK
  };
};

const createAuthUserInfo = ({
  firebaseUser = null,
  token = null,
}): AuthUserInfo => {
  return {
    user: createAuthUser(firebaseUser),
    token,
  };
};

export const authInitState: AuthUserInfo = {
  user: null,
  token: null,
};

export const authModule = createSlice({
  name: "auth",
  initialState: authInitState,
  reducers: {
    createServerSide: (state, action: PayloadAction<ServerSidePayload>) => {
      const { user, token } = createAuthUserInfo(action.payload);
      state.user = user;
      state.token = token;
    },
    createClientSide: (state) => {
      const user = auth.currentUser;
      setSession(user);
      state.user = createAuthUser(user);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      setSession(null);
      auth.signOut();
    },
  },
});

export const useAuth = () => {
  return useSelector(
    (state: { auth: ReturnType<typeof authModule.reducer> }) => state.auth.user
  );
};

export default authModule;
