import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import authModule from "../configureStore/modules/authModule";

export default ({ pathname }: { pathname?: any }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  return (
    <header>
      <p>ヘッダー</p>
      <p>{user ? user.name : null}</p>
      {user && user.id ? (
        <a
          onClick={() => {
            dispatch(authModule.actions.logout());
          }}
        >
          ログアウト
        </a>
      ) : null}
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a className={pathname === "/" ? "is-active" : ""}>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/auth">
              <a className={pathname === "/auth" ? "is-active" : ""}>auth</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a className={pathname === "/about" ? "is-active" : ""}>About</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
