# Static Images Guide

This directory stores all site images used by Docusaurus pages.

Rules:

- Use topic-based folders (for example: `examples/`, `ai-tools/`, `dev/`)
- Use lowercase kebab-case names
- Prefer `svg` for diagrams and `webp/png` for screenshots
- Reference assets with absolute paths starting from `/img/...`

Example reference in Markdown/MDX:

```md
![Example](/img/examples/tjufe-placeholder.svg)
```
