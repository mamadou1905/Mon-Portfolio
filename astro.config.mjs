import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://mamadou1905.github.io',
  base: '/Mon-Portfolio',
  integrations: [mdx()],
  output: 'static'
});