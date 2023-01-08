# OSM Tag Updater

The general idea is, to build a tool that will help mappers to update deprecated tags in a reagion they know.

## OSM `parking:lane` schema update

The concrete use case is to provide a tool tool that helps with updating the parking lane data, following the [street parking revision proposal](https://wiki.openstreetmap.org/wiki/Proposed_features/street_parking_revision).

## App

https://osmberlin.github.io/osm-tag-updater/

# Development

This is a plain Typescript React App using Vite.

- Vite for development and build
- Vitest for tests
- Tailwind CSS, Tailwind UI, Headless UI and Heroicon for styling
- Prettier, ESLint, Editorconfig for code formatting
- Tanstack Query for fetching https://tanstack.com/query/v4
- react hook form for Forms
  - General TS Docs https://react-hook-form.com/get-started#TypeScript
  - Validation example https://github.com/react-hook-form/react-hook-form/blob/master/examples/V7/validationOnFieldChange.tsx
  - useFieldArray for the dynamic field list https://react-hook-form.com/api/usefieldarray
- Husky runs our checks on push. Use `git push --no-verify` to force-skip them.
- [Docs](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values) to find good Keyboard Shortcuts

# OSM Schema

Old vs. new schema docs https://wiki.openstreetmap.org/wiki/Proposed_features/street_parking_revision#Dictionary:_old_vs._new_tags

# Minimum Viable Products (MVPs)

A very rough outline of possible MVP releases. Each MVP has a feasable workflow to use the tool to update the given tagging. However, the mapping UX becomes better with each MVP

`WIP` (work in progress) features are already part of the prototype in some form.

## MVP 1 – WIP

- DONE – Online tool that takes a list of tags (one Textfield) and transposes them to the new tags (second Textfield)
- DONE – Transposed tags need to be copied to an editor manually
- A MapRoulette challenge with custom description part that holds a link to the tool

_Workflow:_

MapRoulette => Tool => Tags (Clipboard)<br />
Separate: Editor => Find ways again => Update tags there

(Data preparation for MapRoulette requires quite a bit preprocessing.)

## MVP 2 – WIP

- DONE – The tool can be opened with a OSM ID and transposes those
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
