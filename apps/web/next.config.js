module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      "react-native$": "react-native-web",
    };
    config.resolve.extensions = [
      ".web.js",
      ".web.jsx",
      ".web.ts",
      ".web.tsx",
      ...config.resolve.extensions,
    ];

    config.module.rules.push({
      test: /\.js$/,
      exclude: /node_modules[/\\](?!react-native-vector-icons)/,
      use: {
        loader: 'babel-loader',
        options: {
          // Disable reading babel configuration
          babelrc: false,
          configFile: false,

          // The configuration for compilation
          presets: [
            ['@babel/preset-env'],
            '@babel/preset-react',
            '@babel/preset-flow',
            "@babel/preset-typescript"
          ],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-object-rest-spread'
          ],
        },
      },
    });

    return config;
  },
};
