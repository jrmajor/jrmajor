import { buildApplication, buildRouteMap, run } from '@stricli/core';
import { add } from './add.ts';
import { gen } from './gen.ts';

const app = buildApplication(
	buildRouteMap({
		routes: { add, gen },
		docs: { brief: 'List commands' },
	}),
	{ name: 'cli' },
);

await run(app, process.argv.slice(2), { process });
