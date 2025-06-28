import { buildApplication, buildRouteMap, run } from '@stricli/core';

const app = buildApplication(
	buildRouteMap({
		routes: { },
		docs: { brief: 'List commands' },
	}),
	{ name: 'cli' },
);

await run(app, process.argv.slice(2), { process });
