import NextApp, { AppInitialProps, AppContext } from "next/app";
import { get } from "lodash";
import { authModule } from "../configureStore/modules/authModule";
import { wrapper } from "../configureStore/store";
import styles from "./_app.module.scss?type=global";

class App extends NextApp<AppInitialProps> {
  public static getInitialProps = async ({ Component, ctx }: AppContext) => {
    const { createServerSide, createClientSide } = authModule.actions;
    if (typeof window === "undefined") {
      const { req, res } = ctx;
      const { addSession } = require("../utils/middleware/cookieSession");
      addSession(req, res);
      const payload = {
        firebaseUser: get(req, "session.decodedToken", null),
        token: get(req, "session.token", null),
      };
      ctx.store.dispatch(createServerSide(payload));
    } else {
      if (!ctx.store.getState().auth.authUser) {
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
