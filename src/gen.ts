import fs from 'node:fs';
import { buildCommand } from '@stricli/core';
import * as d from 'date-fns';

export const gen = buildCommand({
	parameters: { },
	docs: { brief: 'Regenerate README.md' },
	func() {
		const latestReleases = fs.readFileSync('releases.txt', 'utf-8')
			.trimEnd()
			.split('\n')
			.slice(-10)
			.map((s) => {
				const [date, repo, releases, prs] = s.split(' ');
				return {
					date: new Date(date),
					repo,
					releases: releases.split(','),
					prs: prs?.split(',') ?? [],
				};
			})
			.reverse()
			.reduce((acc, group) => {
				const tags = group.releases.map((r) => `[${r}](https://github.com/${group.repo}/releases/tag/${r})`);
				const tagsStr = new Intl.ListFormat('en').format(tags);

				const date = formatRelative(group.date);

				const link = `[${group.repo}](https://github.com/${group.repo})`;
				return `${acc}- ${link} (${tagsStr}, ${date})\n`;
			}, '####  Latest releases I\'ve contributed to:\n\n');

		fs.writeFileSync('README.md', latestReleases);
	},
});

function formatRelative(date: Date) {
	const now = new Date();
	const f = new Intl.RelativeTimeFormat('en', { style: 'long' });

	const years = d.differenceInYears(now, date);
	if (years >= 1) return f.format(-years, 'year');

	const months = d.differenceInMonths(now, date);
	if (months >= 1) return f.format(-months, 'month');

	const days = d.differenceInDays(now, date);
	if (days >= 1) return f.format(-days, 'day');

	return 'today';
}
