import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import nextPlugin from "@next/eslint-plugin-next";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default [
    {
        ignores: ["node_modules/**", ".next/**"],
    },
    {
        files: ["src/**/*.{ts,tsx}"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: "./tsconfig.json",
            },
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
            "@next/next": nextPlugin,
            "react-hooks": reactHooksPlugin,
        },
        rules: {
            ...tsPlugin.configs["recommended"].rules,
            ...nextPlugin.configs["core-web-vitals"].rules,
            ...reactHooksPlugin.configs["recommended"].rules,
            "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
        },
    },
];
