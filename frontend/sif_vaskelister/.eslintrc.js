module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
    ],
    rules: {
        "react/prop-types": 0,
        "@typescript-eslint/explicit-function-return-type": 0,
        "@typescript-eslint/camelcase": 0
    },
};
