import NextApp, { AppInitialProps, AppContext } from "next/app";
import authModule from "../configureStore/modules/authModule";
import { getTokenCookie } from "../utils/auth/firebaseSessionHandler";
import wrapper from "../configureStore/store";
import styles from "./_app.module.scss?type=global";

class App extends NextApp<AppInitialProps> {
  public static getInitialProps = async ({ Component, ctx }: AppContext) => {
    const { createServerSide, createClientSide, logout } = authModule.actions;
    if (typeof window === "undefined") {
      const { req, res } = ctx;
      const { verifySessionCookie } = require("../utils/auth/firebaseAdmin");
      const cookieToken = getTokenCookie(req);
      let firebaseUser: firebase.User = null;
      let token: string = null;
      if (cookieToken) {
        token = cookieToken;
        firebaseUser = await verifySessionCookie(token).catch(() => {
          firebaseUser = null;
          token = null;
          ctx.store.dispatch(logout());
        });
      }
      const payload = {
        firebaseUser,
        token,
      };
      ctx.store.dispatch(createServerSide(payload));
    } else {
      if (!ctx.store.getState().auth.user) {
        ctx.store.dispatch(createClientSide());
      }
    }

    return {
      pageProps: {
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
        appProp: ctx.pathname,
      },
    };
  };

  public render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <style jsx>{styles}</style>
        <Component {...pageProps} />
      </>
    );
  }
}

export default wrapper.withRedux(App);
