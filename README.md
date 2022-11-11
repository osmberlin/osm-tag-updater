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

# MVPs

## MVP 1

- Online tool that takes a list of tags (one Textfield) and transposes them to the new tags (second Textfield)
- Transposed tags need to be copied to an editor manually
- A MapRoulette challenge with custom description part that holds a link to the tool

_Workflow:_

MapRoulette => Tool => Tags (Clipboard)<br />
Separate: Editor => Find ways again => Update tags there

(Data preparation for MapRoulette requires quite a bit preprocessing.)

## MVP 2

- The tool can be opened with a OSM ID and transposes those
- Mappers can then open iD / JOSM from there
- Now we could use this tools URL in a MapRoulette challenge as primary editor. 

_Workflow:_

MapRoulette => Tool => New tags (Clipboard) => Editor => Update tags there

## MVP 3

- The tool can list OSM ways in a BBox

_Workflow:_

Tool => New tags => Editor => Update tags there

## MVP 4

- Tool can update OSM

_Workflow:_

Tool => New tags => Editor => Save new tags

## MVP 5

- Tool can show map per way to make UX better

_Workflow:_

Same
