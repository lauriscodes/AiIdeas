import antfu from "@antfu/eslint-config";
import { resolveConfig } from "prettier";

const prettierOptions = await resolveConfig(import.meta.filename);

export default antfu(
	{
		type: "app",
		typescript: true,
		node: false,
		formatters: {
			prettierOptions
		},
		stylistic: {
			indent: "tab",
			semi: true,
			quotes: "double",
			braceStyle: "1tbs"
		},
		ignores: ["dist/**", "**/migrations/**"]
	},
	{
		languageOptions: {
			globals: {
				Bun: "readonly"
			}
		},
		rules: {
			"style/arrow-parens": ["error", "always"],
			"style/comma-dangle": ["error", "never"],
			"style/jsx-quotes": ["error", "prefer-double"],
			"style/quote-props": ["error", "as-needed"],
			"no-console": ["warn"],
			"antfu/no-top-level-await": ["off"],
			"perfectionist/sort-imports": [
				"error",
				{
					environment: "bun",
					tsconfig: {
						rootDir: import.meta.dirname
					}
				}
			],
			"unicorn/filename-case": [
				"error",
				{
					case: "kebabCase",
					ignore: ["README.md"]
				}
			]
		}
	}
);
