import base, { js } from '@jrmajor/eslint-config';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
	base,
	js,
	{
		languageOptions: {
			globals: globals.node
		},
	},
]);
