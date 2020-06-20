/* globals window */
import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import "firebase/auth";
import authModule from "../configureStore/modules/authModule";

type Props = {};

export const FirebaseAuth: React.FC<Props> = () => {
  const [renderAuth, setRenderAuth] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRenderAuth(true);
    }
  }, []);

  const uiConfig = useMemo(
    () => ({
      signInFlow: "popup",
      signInOptions: [firebase.auth.TwitterAuthProvider.PROVIDER_ID],
      signInSuccessUrl: "/",
      callbacks: {
        signInSuccessWithAuthResult() {
          dispatch(authModule.actions.createClientSide());
          return false;
        },
      },
      credentialHelper: "none",
    }),
    []
  );

  return (
    <div>
      {renderAuth ? (
        <>
          <h1>My App</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </>
      ) : null}
    </div>
  );
};
