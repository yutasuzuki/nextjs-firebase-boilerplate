import { NextPage } from "next";
import Header from "../../components/Header";
import { FirebaseAuth } from "../../components/FirebaseAuth";

const Auth: NextPage = () => {
  return (
    <div>
      <Header />
      <p>Sign in</p>
      <div>
        <FirebaseAuth />
      </div>
    </div>
  );
};

export default Auth;
