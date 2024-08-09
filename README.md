# auto-reveal

**The command-line interface for reveal.js presentations.**

Create presentations from Markdown files and let auto-reveal worry about configuration, themes and setup so you can focus on your content.

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

Markdown files are sorted alphabetically by filename. `001-slide.md` will be the first slide,
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
by default.

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

There is none (yet). 

## Development

### Contributing

This project uses Vite under the hood. Linting and formatting is handled by
Biome.

### Building themes

There is no full guide yet. Please look at [auto-reveal-theme-mainmatter][theme-mainmatter] for a working example.

A theme package for auto-reveal should contain: 

- mandatory: `package.json` with these fields:
  - `"main": "theme.css"`
  - recommended: `"keywords": ["auto-reveal-theme"]`
- mandatoriy: `theme.css` with your theme styles
- optional: `config.json` with Reveal.js configuration options

## License

auto-reveal is developed by and © [Mainmatter GmbH][mainmatter] and contributors. It is released under the [MIT License][license].

[theme-mainmatter]: https://github.com/mainmatter/auto-reveal-theme-mainmatter
[mainmatter]: https://mainmatter.com
[license]: ./LICENSE