# auto-reveal

Create Reveal.js presentations from markdown files.

## Installation

```bash
# Create an empty node project
npm init
# Add auto-reveal
npm add auto-reveal
```

Add this to your `package.json`:

```json
{
  "scripts": {
    "start": "auto-reveal",
    "build": "auto-reveal build"
  }
}
```

## Usage

In it's current iteration, `auto-reveal` expects markdown files in `/slides` and
will output the presentation to `/dist` when running `npm run build`.

To get a live-reloading preview of your presentation, run `npm run start`.

### Slides

Markdown files are sorted by filename. `001-slide.md` will be the first slide,
`002-slide.md` the second, and so on.

Each Markdown file will generate a horizontal slide. If you want to create
vertical slides, use `\n---\n` inside your Markdown files to separate them.

### Themes

If you install any package prefixed with `auto-reveal-theme-`, it will
automatically be used for your presentation. For example, to use the
`auto-reveal-theme-mainmatter` theme, run:

```bash
npm add auto-reveal-theme-mainmatter
```

If no theme is installed, the default Reveal.js `simple` theme will be used
instead.

### Document Title

If your root folder contains a `README.md` and it starts with a first level
headline, it will be used as the document title of the presentation. It falls
back to the `name` field in `package.json` if no `README.md` is found.

### Assets

Any assets you want to use in your presentation should be places inside
`/public`. `/public/images/foo.jpg` can be referenced in your markdown as
`![foo](images/foo.jpg)`.

### Speaker notes

Any content after `Note:\n` will be treated as speaker notes and will be hidden
from the presentation.

### Additional Configuration

There is none.

## Development

This project uses Vite under the hood. Linting and formatting is handled by
Biome.

### Roadmap

- [ ] Add configuration options
