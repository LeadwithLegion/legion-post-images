# legion-post-images

A lightweight project for creating branded social media / post images using SVG templates.

## What this is

This repo gives you a simple generator that creates clean, reusable post images for announcements, launches, stories, and other content. It writes SVG files, which are easy to edit and widely supported by design tools and browsers.

## Quick start

```bash
npm run generate -- "Launch Day" "New tools for creators" output/post.svg
```

Or run directly:

```bash
node src/generate.js "Launch Day" "New tools for creators" output/post.svg
```

If you omit the file path, it writes to `output/post.svg` by default.

## Project structure

- `src/generate.js` — creates the SVG artwork
- `output/` — generated images

## Example output

The generated image includes:
- a dark background with a subtle gradient
- a soft accent bar and glow effect
- large headline text
- smaller supporting line
- a footer label

This makes it easy to customize for campaigns, product launches, or community updates.
