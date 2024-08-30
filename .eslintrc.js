/* eslint-disable no-mixed-spaces-and-tabs */
module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"standard",
		"eslint-config-prettier",
		"eslint:recommended",
		"plugin:react/recommended",
	],
	overrides: [],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		jsx: true,
	},

	plugins: ["react"],
	settings: {
		react: {
			version: "18.0.0", // O bien, especifica la versión específica de React que estás utilizando, por ejemplo, "16.8.0"
		},
	},
	rules: {
		"react/react-in-jsx-scope": "off",
		"react/no-unknown-property": "off",
		"react/prop-types": "off",
	},
};
