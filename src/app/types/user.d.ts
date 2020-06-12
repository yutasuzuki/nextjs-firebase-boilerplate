type FirebaseAuthUserState = {
  firebaseUser: firebase.User;
  token: string;
};

type AuthUserState = {
  AuthUser: UserState;
  token: string;
};
