import { removeTokenCookie } from "../../utils/auth/firebaseSessionHandler";

const handler = (req, res) => {
  removeTokenCookie(res);
  res.status(200).json({ status: true });
};

export default handler;
