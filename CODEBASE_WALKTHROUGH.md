# HAX The Club - Complete Codebase Architecture

## High-Level Overview

**HAX The Club** is a single-page web application built with **Lit Web Components**. It's a screen-based navigation system where users scroll/navigate through multiple "screens" to explore information about the HAX club at Penn State.

Think of it as a **carousel of full-screen panels**, each one a complete web component with its own styling, animations, and functionality.

---

## Project Structure

```
hax-the-club/
├── index.html                 # Entry point - defines screen hierarchy
├── hax-the-club.js           # Main container component
├── lib/
│   ├── htc-screen.js         # Base screen class (all screens inherit from this)
│   ├── htc-main-screen.js    # Special intro screen with loading animation
│   ├── intro-controller.js   # Isolated intro animation logic
│   ├── htc-home-screen.js    # Home/landing screen
│   ├── htc-about-screen.js   # About HAX screen
│   ├── htc-team-screen.js    # Team/members screen
│   ├── htc-involved-screen.js # Get involved/join screen
│   ├── htc-resources-screen.js # Resources/links screen
│   ├── htc-footer.js         # Footer component
│   └── [other screens...]    # Additional themed screens
├── assets/
│   ├── images/               # SVGs, PNGs, GIFs
│   ├── sounds/               # Audio files for interactions
│   └── voices/               # Voice files (if any)
├── locales/                  # i18n translation files
├── package.json              # Dependencies
└── rollup.config.js          # Build configuration
```

---

## Core Architecture

### 1. **Main Container: `hax-the-club.js`**

This is the **orchestrator** of the entire application.

**What it does:**
- Maintains `currentScreen` (which screen is active)
- Tracks all screen components in a `screens` array
- Listens for `screen-change` events from child screens
- Updates URL hash (`#0`, `#1`, etc.) for bookmarkable navigation
- Renders a navbar with navigation dots
- Emits a `loading` overlay while initializing

**Key Methods:**
- `handleScreenChange(e)`: Moves to next/previous screen
- `updateScreenList()`: Discovers all screen components in the DOM
- `updated()`: Syncs screen state when `currentScreen` changes

**Template Structure:**
```html
<hax-the-club>
  <htc-home-screen sid="0"></htc-home-screen>
  <htc-about-screen sid="1"></htc-about-screen>
  <htc-team-screen sid="2"></htc-team-screen>
  <!-- ... more screens ... -->
</hax-the-club>
```

---

### 2. **Base Screen Class: `htc-screen.js`**

This is the **foundation** all screens inherit from. It provides:

**Shared Functionality:**
- `sid` (screen ID): Unique identifier for each screen
- `active` (boolean): Whether this screen is currently visible
- Full-screen viewport sizing (100vw × 100vh)
- Keyboard navigation (arrow keys dispatch `screen-change` events)
- Event lifecycle: `screen-ready` event when mounted

**Lifecycle:**
1. Component connects to DOM
2. `firstUpdated()` fires → dispatches `screen-ready` event
3. Parent (`hax-the-club`) listens for this and adds screen to array
4. When `active=true`, screen receives focus and `.active` attribute

All other screens extend this base class.

---

### 3. **Special: Main/Home Screen with Intro Animation**

The **first screen** (sid="0") is special—it shows on initial load with:

#### Part 1: Narrative Wake-Up Sequence
A **timeline** of text changes simulating a system boot:

```
t=0s     → "Future loading.."
t=5s     → "we need you"
t=9s     → "time to wake"
t=11s    → "time to build"
t=13s    → "arise"
t=16s    → "WAKE UP!"
```

#### Part 2: Glitch Loading Animation
While `loading=true`, the animation:
- Finds all `.hax` elements (the three large "HAX / The / Club" texts)
- Each glitches 3 times with random delays (3–8 seconds)
- Applies random neon colors: `#?f?f?f88` format
- After 20 seconds: restores state and sets `loading=false`

#### Part 3: Skip Functionality
Users can skip the intro anytime, which:
- Cancels all pending timeouts
- Instantly shows final tagline
- Allows immediate navigation

**Architecture:**
- Animation logic is isolated in `intro-controller.js`
- `htc-main-screen.js` uses the controller
- Controller is completely reusable and testable

---

### 4. **Individual Screen Components**

Each screen (e.g., `htc-home-screen.js`) follows this pattern:

```javascript
export class HTCHomeScreen extends HTCScreen {
  static get tag() { return "htc-home-screen"; }
  
  static get styles() {
    return [super.styles, css`...screen-specific styles...`];
  }
  
  render() {
    return html`...screen content...`;
  }
}

customElements.define(HTCHomeScreen.tag, HTCHomeScreen);
```

**Each screen provides:**
- Unique visual design (CSS)
- Specific content (HTML template)
- Optional interactivity (click handlers, events)

Example screens:
- **Home**: Landing page with intro info
- **About**: History and mission of HAX
- **Team**: Members and leadership
- **Get Involved**: Signup forms, links
- **Resources**: Documentation, links

---

## Data Flow & Navigation

### How Navigation Works

```
User clicks arrow → dispatchEvent("screen-change", { direction: 1 })
  ↓
hax-the-club listens to "screen-change"
  ↓
Calculates: newScreen = currentScreen + direction (with bounds checking)
  ↓
Sets: currentScreen = newScreen
  ↓
updated() watches currentScreen change
  ↓
Updates URL hash: location.hash = currentScreen
  ↓
Finds screen with matching sid
  ↓
Sets screen.active = true (all others = false)
  ↓
Scrolls active screen into view (smooth animation)
```

### URL-Based Navigation

If you visit `https://hax.psu.edu/#2`, the app:
1. Reads `location.hash` → "2"
2. Sets `currentScreen = 2`
3. Jumps directly to the team screen
4. Skips the intro animation

---

## Component Lifecycle

### Initial Load

```
1. Browser loads index.html
2. Lit components render in shadowDOM
3. hax-the-club.firstUpdated()
   - Discovers all htc-*-screen elements
   - Stores them in screens array
   - Listens for screen-change events
4. htc-main-screen.firstUpdated()
   - Creates IntroController
   - Starts intro animation sequence
5. After 100ms, sets isLoading = false
```

### Screen Transition

```
1. User navigates (arrow key or button click)
2. "screen-change" event bubbles up to hax-the-club
3. currentScreen updates
4. updated() lifecycle fires
5. Active screen scrolls into viewport (smooth)
6. Previous screen becomes inactive
```

### Intro Skip

```
1. User clicks skip button (on main screen)
2. skipIntro property changes
3. htc-main-screen.updated() detects change
4. Calls introController.skip()
5. All timeouts cleared, final state set
```

---

## Styling Strategy

### Scoped CSS (Shadow DOM)

Each component uses **scoped CSS** (isolated in Shadow DOM):

```javascript
static get styles() {
  return [super.styles, css`
    :host {
      /* Component-level styles */
    }
    .some-element {
      /* Only visible inside this component */
    }
  `];
}
```

**Benefits:**
- No global namespace pollution
- Styles can't conflict between screens
- Each screen can have completely different design
- Easy to theme individual screens

### CSS Custom Properties

Components use CSS variables for theming:

```css
background-color: var(--htc-screen-background-color, black);
--future-terminal-text-color: #ffffff88;
--ddd-theme-default-white: #ffffff;
```

---

## External Dependencies

The app uses these external web component libraries:

- **`@haxtheweb/future-terminal-text`**: Glitch/terminal text effects
- **`@haxtheweb/type-writer`**: Typewriter animation effect
- **`@haxtheweb/simple-icon`**: Icon buttons
- **`@haxtheweb/i18n-manager`**: Multi-language support
- **`lit`**: Web component framework

---

## Asset Pipeline

### Images
Stored in `assets/images/`:
- `tv-static-bg.gif`: Animated background for loading
- `bmload.svg`: Spinning loading indicator
- Logos, screenshots, etc.

### Sounds
Stored in `assets/sounds/`:
- `coin2.mp3`: Click sound effect

### Localization
Stored in `locales/`:
- `hax-the-club.ar.json` (Arabic)
- `hax-the-club.es.json` (Spanish)
- `hax-the-club.zh.json` (Chinese)
- etc.

---

## Build & Deployment

### Development
```bash
npm start  # Starts dev server on http://localhost:8000
```

### Build
```bash
npm run build  # Produces optimized bundle
```

### Configuration Files

- **`package.json`**: Dependencies and scripts
- **`rollup.config.js`**: Bundler configuration
- **`web-dev-server.config.mjs`**: Dev server setup
- **`netlify.toml`**: Deployment config (deployed on Netlify)

---

## Key Design Patterns

### 1. Component Inheritance
All screens inherit from `HTCScreen` to get common behavior (sizing, navigation, lifecycle).

### 2. Event-Driven Communication
Components communicate via **custom events**:
- `screen-change`: Navigate between screens
- `screen-ready`: Screen initialized

### 3. Reactive Properties
Lit's reactive properties automatically trigger re-renders:
```javascript
static get properties() {
  return {
    currentScreen: { type: Number, reflect: true },
    loading: { type: Boolean },
  };
}
```

When `currentScreen` changes → `render()` called automatically.

### 4. Isolated Controllers
Animation logic lives in `IntroController`, separate from UI component (`htc-main-screen.js`). This makes it testable and reusable.

### 5. URL State Persistence
The `location.hash` stores which screen is active, enabling:
- Bookmarkable links
- Browser back/forward buttons
- Direct navigation to any screen

---

## User Experience Flow

```
1. User visits site
2. Landing page (main-screen) loads with intro animation
3. Narrative sequence plays (5 seconds of text changes)
4. Glitch loading animation runs (20 seconds)
5. Can skip at any time
6. After animation completes OR skip pressed
   → Navigation becomes available
   → Can browse all screens
7. Arrow keys or on-screen buttons navigate
8. URL updates to reflect current screen
9. Can share links and jump to any screen
```

---

## Summary

**HAX The Club** is a sophisticated, component-based web application that:

✅ Uses **Lit Web Components** for modular, reusable code
✅ Implements **screen-based navigation** with URL persistence
✅ Features a **visually stunning intro animation** with glitch effects
✅ Supports **multi-language localization**
✅ Provides **keyboard and button navigation**
✅ Has **scoped styling** to prevent CSS conflicts
✅ Uses **custom events** for component communication
✅ Follows **web standards** (Web Components, Shadow DOM)

Each piece (screens, animations, navigation, styling) works together seamlessly to create an immersive, interactive experience.
