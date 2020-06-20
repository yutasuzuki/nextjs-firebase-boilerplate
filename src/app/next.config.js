require("dotenv").config();

module.exports = {
  distDir: "../../dist/functions/next",
  env: {
    PROJECT_ID: process.env.PROJECT_ID,
    CLIENT_EMAIL: process.env.CLIENT_EMAIL,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
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

    config.node = {
      fs: "empty",
      child_process: "empty",
      net: "empty",
      dns: "empty",
      tls: "empty",
    };
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
