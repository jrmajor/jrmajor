import { buildApplication, buildRouteMap, run } from '@stricli/core';
import { add } from './add.ts';

const app = buildApplication(
	buildRouteMap({
		routes: { add },
		docs: { brief: 'List commands' },
	}),
	{ name: 'cli' },
);

await run(app, process.argv.slice(2), { process });
