const path = require("path");

module.exports = {
  root: true,
  plugins: ["react", "react-hooks"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  env: {
    es6: true,
    node: false,
  },
  ignorePatterns: ["./node_modules", "./package.json", "./package-lock.json"],
  rules: {
    semi: "error",
    "space-infix-ops": "error",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react-hooks/exhaustive-deps": "error",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      plugins: ["@typescript-eslint"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: [path.resolve(__dirname, "./tsconfig.json")],
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      rules: {
        "@typescript-eslint/no-misused-promises": "off",
      },
    },
    {
      files: [
        ".eslintrc.js",
        "webpack.config.js",
        "babel.config.js",
        ".prettierrc.js",
        "jest.config.js",
      ],
      env: {
        node: true,
      },
    },
  ],
};
