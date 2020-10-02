module.exports = {
  // parser: "@typescript-eslint/parser",
  extends: [
    "airbnb-typescript-prettier",
    // "plugin:@typescript-eslint/recommended",
    // "plugin:react/recommended",
    // "airbnb",
    // "airbnb/hooks",
    // "prettier/@typescript-eslint",
    // "plugin:prettier/recommended",
    // "plugin:import/errors",
    // "plugin:import/warnings",
    // "plugin:jsx-a11y/recommended",
    // "plugin:react-hooks/recommended"
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  // plugins: ["react", "jsx-a11y", "import", "react-hooks", "prettier"],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    // Next imports React into pages automatically
    "react/react-in-jsx-scope": "off",
    // Next includes packages like MDX using their bundle
    "import/no-extraneous-dependencies": "off",

    "react/jsx-filename-extension": [0],
    "import/extensions": "off",
    "react/jsx-wrap-multilines": 0,
    "react/jsx-props-no-spreading": 0,
    "jsx-a11y/heading-has-content": 0,
    "jsx-a11y/href-no-hash": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "no-underscore-dangle": 0,
    "react/no-find-dom-node": 0,
    "react/prop-types": 0,
    "no-nested-ternary": 0,
    "no-plusplus": 0,
    "react/no-unescaped-entities": 0,
    "no-array-index-key": 0,
    "react/no-array-index-key": 0,
    "react/jsx-one-expression-per-line": 0,
    "no-console": ["error", { allow: ["warn", "error"] }],
    radix: 0,
    // "react/prefer-stateless-function": 0,
    // "linebreak-style": 0,
    // 'react/destructuring-assignment': 0,
    // 'react/static-property-placement': 0,
    // 'jsx-a11y/alt-text': 0,
    // Not necessary with Typescript

    // Causes issues with arrow functions and MDX provider components
    "react/display-name": "off",

    // Include .prettierrc.js rules
    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
  },
  settings: {
    react: {
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    "import/resolver": {
      node: {
        paths: ["."],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
}
