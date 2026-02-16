/**
 * IntroController - Standalone intro animation controller
 * Manages the wake-up narrative and glitch loading sequences
 */

export class IntroController {
  constructor(component) {
    this.component = component;
    this.timeouts = [];
    this.glitchIterations = new Map(); // Track glitch iterations per element
  }

  /**
   * Generate random number between min and max (inclusive)
   */
  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate random neon color in format #?f?f?f88
   */
  randomNeonColor() {
    const r = this.randomNumber(0, 9);
    const g = this.randomNumber(0, 9);
    const b = this.randomNumber(0, 9);
    return `#${r}f${g}f${b}f88`;
  }

  /**
   * Schedule a timeout and track it for cleanup
   */
  scheduleTimeout(callback, delay) {
    const timeoutId = setTimeout(callback, delay);
    this.timeouts.push(timeoutId);
    return timeoutId;
  }

  /**
   * PART 1: Narrative Wake-Up Sequence
   * Runs once on component mount with specific timing
   */
  startWakeUpSequence() {
    // 5 seconds - "we need you"
    this.scheduleTimeout(() => {
      this.component.tagLine = "we need you";
    }, 5000);

    // 5 + 4 = 9 seconds - "time to wake"
    this.scheduleTimeout(() => {
      this.component.tagLine = "time to wake";
    }, 9000);

    // 9 + 2 = 11 seconds - "time to build"
    this.scheduleTimeout(() => {
      this.component.tagLine = "time to build";
    }, 11000);

    // 11 + 2 = 13 seconds - "arise"
    this.scheduleTimeout(() => {
      this.component.tagLine = "arise";
    }, 13000);

    // 13 + 3 = 16 seconds - "WAKE UP!"
    this.scheduleTimeout(() => {
      this.component.tagLine = "WAKE UP!";
    }, 16000);
  }

  /**
   * PART 2: System Boot / Glitch Loading Sequence
   * Runs while loading === true
   * Each .hax element glitches 3 times with random delays
   * After 20 seconds total, restore and complete loading
   */
  startGlitchLoadingSequence() {
    // Immediately get all .hax elements from shadowRoot
    const startTime = Date.now();

    const beginGlitchCycle = () => {
      const haxElements = this.component.shadowRoot?.querySelectorAll('.hax') || [];

      haxElements.forEach((item) => {
        // Initialize glitch iteration counter for this element
        if (!this.glitchIterations.has(item)) {
          this.glitchIterations.set(item, 0);
        }

        // Repeat glitch cycle 3 times
        for (let i = 0; i < 3; i++) {
          const iterationIndex = i;

          // Random delay between 3000-8000ms for each glitch
          const glitchDelay = this.randomNumber(3000, 8000);
          this.scheduleTimeout(() => {
            // Check if we haven't exceeded 20 seconds
            if (Date.now() - startTime < 20000) {
              item._doGlitch?.();
              const neonColor = this.randomNeonColor();
              item.style.setProperty('--future-terminal-text-color', neonColor);
            }
          }, glitchDelay);
        }
      });
    };

    // Start glitch cycle immediately
    beginGlitchCycle();

    // After 20 seconds, restore state and complete loading
    this.scheduleTimeout(() => {
      const haxElements = this.component.shadowRoot?.querySelectorAll('.hax') || [];

      haxElements.forEach((item) => {
        // Restore original text from title attribute
        item.innerHTML = item.getAttribute('title');
        // Restore text color to default
        item.style.setProperty('--future-terminal-text-color', '#ffffff88');
      });

      // Update component state
      this.component.tagLine = "Build future you.";
      this.component.loading = false;

      // Clear glitch iteration tracking
      this.glitchIterations.clear();
    }, 20000);
  }

  /**
   * Start both intro sequences
   * Called in component's firstUpdated lifecycle
   */
  start() {
    this.startWakeUpSequence();
    this.startGlitchLoadingSequence();
  }

  /**
   * Skip intro immediately
   * Cancel all pending timeouts and set final state
   */
  skip() {
    this.clearAll();
    
    this.component.tagLine = "Build future you.";
    this.component.loading = false;
  }

  /**
   * Clear all pending timeouts
   * Called on skip or component cleanup
   */
  clearAll() {
    this.timeouts.forEach(timeoutId => clearTimeout(timeoutId));
    this.timeouts = [];
    this.glitchIterations.clear();
  }

  /**
   * Cleanup - call when component disconnects
   */
  dispose() {
    this.clearAll();
  }
}
