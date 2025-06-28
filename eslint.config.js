import base from '@jrmajor/eslint-config';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
	base,
	{
		files: ['**.js'],
		languageOptions: { globals: globals.node },
	},
]);
