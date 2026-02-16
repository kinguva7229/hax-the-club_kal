# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

HAX The Club is a Lit Web Components-based single-page application with screen-based navigation. It's part of the Penn State HAXTheWeb ecosystem - a design system for creating accessible web components.

## Commands

```bash
npm install          # Install dependencies
npm start            # Dev server at https://localhost:8000 (uses HTTPS)
npm run build        # Build to /public directory
npm test             # Run tests with web-test-runner
npm run test:watch   # Run tests in watch mode
npm run dddaudit     # Run HAX DDD design system audit
```

Run a single test file:
```bash
npx web-test-runner test/hax-the-club.test.js --node-resolve
```

## Architecture

### Screen-Based Navigation System

The app is a carousel of full-screen panels. Navigation flows:

1. User action → `screen-change` custom event with `{ direction: 1 | -1 }`
2. `hax-the-club.js` (main container) catches event, updates `currentScreen`
3. URL hash updates (`#0`, `#1`, etc.) for bookmarkable navigation
4. Active screen scrolls into view with CSS transitions

### Component Hierarchy

```
hax-the-club.js          # Main orchestrator - manages screens[], currentScreen, navigation
└── lib/htc-screen.js    # Base class ALL screens extend
    └── lib/htc-*-screen.js  # Individual screen implementations
```

### Creating New Screens

1. Copy `lib/example-htc-screen.js` to `lib/your-htc-screen.js`
2. Rename tag and class to match (e.g., `YourHTCScreen`, `your-htc-screen`)
3. Import in `index.html` and add your tag with unique `sid` and `title` attributes:
   ```html
   <your-htc-screen title="Your Title" sid="7"></your-htc-screen>
   ```

Pattern for screen components:
```javascript
import { html, css } from "lit";
import { HTCScreen } from "./htc-screen.js";

export class YourHTCScreen extends HTCScreen {
  static get tag() { return "your-htc-screen"; }
  
  static get styles() {
    return [super.styles, css`/* your styles */`];
  }
  
  render() {
    return html`/* your content */`;
  }
}
globalThis.customElements.define(YourHTCScreen.tag, YourHTCScreen);
```

### Key Properties

- `sid` (Number): Unique screen identifier
- `active` (Boolean, reflected): Whether screen is currently visible
- `title` (String): Screen title shown in navbar

### Custom Events

- `screen-change`: Dispatch to navigate (`detail: { direction: 1 | -1 }`)
- `screen-ready`: Fired when screen mounts (for parent discovery)

## Dependencies

Uses `@haxtheweb/*` packages from the HAX design system:
- `d-d-d`: DDD (Digital Design & Development) design tokens
- `future-terminal-text`, `type-writer`: Text animation effects
- `simple-icon`, `hax-iconset`: Icon system
- `i18n-manager`: Internationalization (translations in `/locales/`)
- `rpg-character`: Character avatar component

## Testing

Uses `@open-wc/testing` with `@web/test-runner`. Test files go in `/test/` with `.test.js` suffix.

```javascript
import { html, fixture, expect } from '@open-wc/testing';
import "../hax-the-club.js";

describe("Component test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<hax-the-club></hax-the-club>`);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });
});
```

## Asset References

Reference non-JS assets using `import.meta.url` for correct build paths:
```javascript
new URL('./assets/sounds/coin2.mp3', import.meta.url).href
```

## CSS Variables

Screens use CSS custom properties for theming:
- `--htc-screen-background-color`: Screen background (default: black)
- DDD tokens from `@haxtheweb/d-d-d` (e.g., `--ddd-theme-default-white`)
