import Reveal from 'reveal.js';
import Highlight from 'reveal.js/plugin/highlight/highlight.esm.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Notes from 'reveal.js/plugin/notes/notes.esm.js';
import frontMatter from 'front-matter';

import 'reveal.js/dist/reveal.css';
import 'reveal.js/plugin/highlight/monokai.css'
import '@theme';

const markdownFiles = import.meta.glob('slides/*.md', {
	as: 'raw',
	eager: true,
});

const sortedMarkdownFiles = Object.entries(markdownFiles).sort(([a], [b]) => {
	const regex = /slides\/(\d+)-/;
	const [, aNumb] = regex.exec(a);
	const [, bNumb] = regex.exec(b);

	return Number(aNumb) - Number(bNumb);
});

const sections = sortedMarkdownFiles.map(([, content]) => { 
	const fm = frontMatter(content);
	const { body, attributes: { notes } } = fm

	const noteSeparator = 'Note:';

	let notesBlock;

	if (notes) {
		notesBlock = `
${noteSeparator}

${notes}
	`;
	}

	return `
	<section 
		data-markdown
		data-separator="^\n___\n$"
		data-separator-vertical="^\n---\n$"
		data-separator-notes="^${noteSeparator}"
	>
		<textarea data-template>
			${body}
			${notesBlock}
		</textarea>
	</section >
`
}
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
	const findingConfig = import.meta.glob('@theme/config.json', {eager: true});
	const [filename] = Object.keys(findingConfig);

	if (filename) {
		themeConfig = findingConfig[filename]
	}
} catch {}

deck.initialize({...defaultConfig, ...themeConfig});
