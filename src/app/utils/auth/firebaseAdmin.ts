import admin from "firebase-admin";

export const verifyIdToken = (token: string) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.PROJECT_ID,
        clientEmail: process.env.CLIENT_EMAIL,
        privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
      databaseURL: process.env.DATABASE_URL,
    });
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch((error) => {
      throw error;
    });
};
