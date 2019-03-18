module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: "airbnb-base",
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        parser: "babel-eslint"
    },
    plugins: ["vue"],
    rules: {
        // allow paren-less arrow functions
        "arrow-parens": 0,
        // allow async-await
        "generator-star-spacing": "off",
        // allow debugger during development
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "eol-last": 0,
        "space-before-function-paren": 0,
        // 配置四格缩进
        "indent": "off",
        "vue/script-indent": [
            "error",
            4,
            {
                "baseIndent": 1
            }
        ],
        "vue/html-indent": [
            "error",
            4,
            {
                "baseIndent": 1
            }
        ]
    }
};
