# Mamadou Dian Diallo — Portfolio & Journal

Personal portfolio and bilingual editorial blog built with Astro and Markdown/MDX.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Publishing an article

1. Create a `.md` or `.mdx` file in `src/content/blog/`.
2. Add the required frontmatter (title, description, author, category, date, language).
3. Write the article in Markdown.
4. Keep `draft: true` while preparing it.
5. Set `draft: false` when it is reviewed and ready to publish.
6. Commit and push to `main`; GitHub Actions builds and deploys the site.

## Guest contributions

Guest authors are invited to send a proposal by email. Contributions are reviewed and published by the site owner; there is no public account or upload system.

## GitHub Pages

Repository: https://github.com/mdou10297-source/Mon-Portfolio (confirm repository name before pushing).
Site base path: `/Mon-Portfolio/`.
