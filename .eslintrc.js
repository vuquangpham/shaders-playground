module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    indent: [
      2,
      2,
      {
        SwitchCase: 1,
      },
    ],
    "linebreak-style": [2, "unix"],

    // single or double quotes
    quotes: [1, "double"],

    // not using var
    "no-var": ["error"],

    // semi colon
    semi: [2, "always"],

    // if with curly bracket
    curly: [2, "all"],

    // camelCase in code
    camelcase: [
      2,
      {
        properties: "always",
      },
    ],

    // comparison == vs ===
    eqeqeq: [2, "smart"],

    "new-cap": 2,
    "one-var-declaration-per-line": [2, "always"],
    "no-case-declarations": 0,
  },
  globals: {
    arguments: true,
  },
};
