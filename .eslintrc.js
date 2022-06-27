/**@type {import('eslint').Linter.Config} */
// eslint-disable-next-line no-undef
module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	plugins: [
		"@typescript-eslint",
	],
	extends: [
		"eslint:recommended",
		"plugin:import/recommended",
		"plugin:import/typescript",
		"plugin:@typescript-eslint/recommended",
	],
	rules: {
		"semi": [2, "always"],
		"@typescript-eslint/no-unused-vars": ["error", {
			"argsIgnorePattern": "^_"
		}],
		"@typescript-eslint/no-explicit-any": 2,
		"@typescript-eslint/explicit-module-boundary-types": 2,
		"@typescript-eslint/no-non-null-assertion": 2,
		"import/no-extraneous-dependencies": 2,
		"import/no-unresolved": ["error", {
			ignore: [
				"vscode"
			]
		}],
	}
};
