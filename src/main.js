import Reveal from 'reveal.js';
import Highlight from 'reveal.js/plugin/highlight/highlight.esm.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Notes from 'reveal.js/plugin/notes/notes.esm.js';

import 'reveal.js/dist/reveal.css';

import '@theme';

const markdownFiles = import.meta.glob('slides/*.md', {
	query: '?raw',
	import: 'default',
	eager: true,
});

const sortedMarkdownFiles = Object.entries(markdownFiles).sort(([a], [b]) =>
	a.localeCompare(b, undefined, {
		numeric: true,
		sensitivity: 'base',
	}),
);

const sections = sortedMarkdownFiles.map(
	([, content]) => `
	<section 
		data-markdown
		data-separator="^\n___\n$"
		data-separator-vertical="^\n---\n$"
		data-separator-notes="^Note:"
	>
		<textarea data-template>${content}</textarea>
	</section >
`,
);

document.querySelector('.slides').innerHTML = sections.join('');

const deck = new Reveal();

const defaultConfig = {
	hash: true,
	width: 1280,
	height: 960,
	margin: 0.1,
	highlight: {},
	plugins: [Markdown, Highlight, Notes],
};

let themeConfig = {};

try {
	const findingConfig = import.meta.glob('@theme/config.json', { eager: true });
	const [filename] = Object.keys(findingConfig);

	if (filename) {
		themeConfig = findingConfig[filename];
	}
} catch {}

deck.initialize({ ...defaultConfig, ...themeConfig });
