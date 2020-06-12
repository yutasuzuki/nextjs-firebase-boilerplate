module.exports = {
  distDir: "../../dist/functions/next",
  env: {
    PROJECT_ID: "XXXXXXXXX",
    CLIENT_EMAIL: "firebase-adminsdk-nk9f8@XXXXXXX.iam.gserviceaccount.com",
    PRIVATE_KEY: `-----BEGIN PRIVATE KEY-----\nXXXXXXXXXX\n-----END PRIVATE KEY-----\n`,
    DATABASE_URL: "https://XXXXXXX.firebaseio.com",
    SESSION_SECRET_CURRENT: "XXXXXXXXXXXXX",
    SESSION_SECRET_PREVIOUS: "XXXXXXXXXXXXXXX",
  },
  webpack: (config, options) => {
    const { defaultLoaders, dir } = options;
    config.module.rules.push({
      test: /\.scss$|\.css$/,
      use: [
        defaultLoaders.babel,
        {
          loader: require("styled-jsx/webpack").loader,
          options: {
            type: (fileName, options) => options.query.type || "scoped",
          },
        },
        "sass-loader",
      ],
    });
    config.module.rules.push({
      oneOf: [
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          include: dir,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader",
            },
          ],
        },
      ],
    });

    return config;
  },
};
