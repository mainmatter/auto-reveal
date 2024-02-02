#!/usr/bin/env node

import path from 'node:path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';
import { ViteEjsPlugin as viteEjsPlugin } from 'vite-plugin-ejs';
import { getTheme, getTitle } from '../lib/utils.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const argv = process.argv.slice(2);
const cwd = process.cwd();

getTheme();

async function start() {
  const server = await createServer({
    configFile: false,
    root: path.join(__dirname, '..', 'src'),
    server: {
      port: 1337,
    },
    plugins: [
      viteEjsPlugin({
        title: getTitle(),
      }),
    ],
    resolve: {
      alias: {
        slides: path.join(cwd, 'slides'),
        '@theme': getTheme(),
      },
    },
  });

  server.watcher.add(path.join(cwd, 'slides'));

  await server.listen();
  server.printUrls();
  server.bindCLIShortcuts({ print: true });
}

async function build() {}

if (!argv[0] || argv[0] === 'start') {
  start();
} else if (argv[0] === 'build') {
  // Build for production
}
