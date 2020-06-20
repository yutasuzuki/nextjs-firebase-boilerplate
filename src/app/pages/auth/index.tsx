import { NextPage } from "next";
import App from "../../components/App";
import { FirebaseAuth } from "../../components/FirebaseAuth";

const Auth: NextPage = () => {
  return (
    <App>
      <p>Sign in</p>
      <div>
        <FirebaseAuth />
      </div>
    </App>
  );
};

export default Auth;
