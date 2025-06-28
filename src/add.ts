import fs from 'node:fs';
import { buildCommand, numberParser } from '@stricli/core';

type Args = {
	repo: string;
	tag: string[];
	pr?: number[];
};

export const add = buildCommand({
	parameters: {
		flags: {
			repo: {
				kind: 'parsed',
				parse: String,
				brief: '',
			},
			tag: {
				kind: 'parsed',
				parse: String,
				variadic: true,
				brief: '',
			},
			pr: {
				kind: 'parsed',
				parse: (v: string): number[] => v.split(',').map(numberParser),
				optional: true,
				brief: '',
			},
		},
		aliases: {
			r: 'repo',
			t: 'tag',
			p: 'pr',
		},
	},
	docs: { brief: 'Add release to releases.txt' },
	loader: async () => async ({ repo, tag: tags, pr: prs }: Args) => {
		const dates = await Promise.all(tags.map(async (tag) => {
			const r = await fetch(`https://github.com/${repo}/releases/tag/${tag}`);
			const text = await r.text();

			const re = /(?:released|tagged) this\s+<(?:relative|local)-time[^>]+datetime="([\d-]{10}T[\d:]{8}Z)"/;
			const date = re.exec(text)?.[1];
			if (!date) throw new Error(`Unable to parse date for ${repo}@${tag}.`);
			return date;
		}));

		const [date] = dates.toSorted();
		const prsStr = prs?.map((p) => `#${p}`).join(',') ?? '';

		const line = `${date} ${repo} ${tags.join(',')} ${prsStr}`.trim();

		fs.appendFileSync('releases.txt', `${line}\n`);
	},
});
