# WIP

The idea is, to build a tool that will help mappers to update deprecated tags in a reagion they know.

## Basic concept

- Show a map/bbox
- List all osm elements with deprecated tags in a table
- Transpose the deprecated tags to the new tags, show them as part of the table
- Highlight tags that cannot be tranposed automatically; allow to change those manually
- Allow to commmit the updated tags to OSM after human review

# Development

This is a plain Typescript React App using Vite.

- Vitest for tests
- Tailwind CSS, Tailwind UI, Headless UI and Heroicon for styling
- Prettier, ESLint, Editorconfig for code formatting
