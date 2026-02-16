/**
 * Copyright 2025 btopro
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/simple-icon/lib/simple-icon-button-lite.js";

/**
 * `hax-the-club`
 * 
 * @demo index.html
 * @element hax-the-club
 */
export class HaxTheClub extends I18NMixin(LitElement) {

  static get tag() {
    return "hax-the-club";
  }

  constructor() {
    super();
    this.t = this.t || {};
    this.t = {
      ...this.t,
      haxTheClub: "HAX The Club",
      skip: "Skip",
    };
    this.currentScreen = 0;
    this.isLoading = true;
    this.screens = [];
    this.totalScreens = 0;
  }

  firstUpdated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
    // use hash in URL
    if (parseInt(globalThis.location.hash.replace("#", "")) >= 0) {
      this.currentScreen = parseInt(globalThis.location.hash.replace("#", ""));
    }
    this.updateScreenList();
    // Listen for screen change events from child screens
    this.addEventListener("screen-change", (e) => this.handleScreenChange(e));
    // Hide loading overlay after a tick to allow DOM to settle
    setTimeout(() => {
      this.isLoading = false;
    }, 100);
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      currentScreen: { type: Number, reflect: true },
      screens: { type: Array },
      skipped: { type: Boolean, reflect: true },
      active: { type: Object },  
      isLoading: { type: Boolean },
      totalScreens: { type: Number },
    };
  }

  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    // if screen changes, update the hash
    if (this.shadowRoot && (changedProperties.has('screens') || changedProperties.has('currentScreen')) && this.screens.length > 0) {
      globalThis.location.hash = this.currentScreen;
      // scroll the screen into view
      let active = this.screens.find((screen => screen.sid == this.currentScreen));
      if (active) {
        this.screens.map((screen) => {
          if (screen.sid == this.currentScreen) {
            screen.active = true;
          }
          else {
            screen.active = false;
          }
        });
        this.active = null;
        this.active = active;
        this.active.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center"
        });
        // ensure intro skipped if we jumped to something
        if (this.currentScreen !== 0) {
          this.skipIntro();
        }
      }
    }
  }

  // Lit scoped styles
  static get styles() {
    return [
      css`
      :host {
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100%;
        max-width: 100vw;
        overflow: hidden;
        overflow-x: hidden;
        background: #000000;
        box-sizing: border-box;
      }

      .navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 60px;
        background: rgba(8, 10, 18, 0.95);
        border-bottom: 1px solid rgba(255, 255, 255, 0.10);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 24px;
        z-index: 100;
        backdrop-filter: blur(10px);
        opacity: 1;
        visibility: visible;
        transition: opacity 0.3s, visibility 0.3s;
      }

      :host([current-screen="0"]) .navbar {
        opacity: 0;
        visibility: hidden;
      }

      .navbar-logo {
        font-size: 20px;
        font-weight: 900;
        color: rgba(255, 255, 255, 0.92);
        letter-spacing: 0.2px;
        margin: 0;
      }

      .navbar-nav {
        display: flex;
        gap: 8px;
        align-items: center;
      }

      .nav-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.25);
        cursor: pointer;
        transition: all 0.3s ease;
        border: 1px solid rgba(255, 255, 255, 0.15);
      }

      .nav-dot:hover {
        background: rgba(255, 255, 255, 0.40);
        transform: scale(1.1);
      }

      .nav-dot.active {
        background: rgba(255, 255, 255, 0.92);
        box-shadow: 0 0 12px rgba(255, 255, 255, 0.4);
        width: 12px;
        height: 12px;
      }

      .nav-label {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.70);
        font-weight: 700;
        letter-spacing: 0.1px;
        margin-left: 8px;
        white-space: nowrap;
      }

      .screens-container {
        position: relative;
        flex: 1;
        width: 100%;
        max-width: 100%;
        margin-top: 60px;
        margin-bottom: 60px;
        overflow: hidden;
        transition: margin 0.3s;
      }

      :host([current-screen="0"]) .screens-container {
        margin-top: 0;
        margin-bottom: 0;
      }

      ::slotted(*) {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
         max-width: 100%; 
        height: 100%;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.4s ease, transform 0.4s ease;
        transform: translateX(100px);
        z-index: 1;
        box-sizing: border-box;
      }

      ::slotted([active]) {
        opacity: 1;
        pointer-events: auto;
        z-index: 10;
      }

      .loading-overlay {
        position: fixed;
        inset: 0;
        z-index: 200;
        background: linear-gradient(135deg, #000000, #0a0a1a);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 24px;
        opacity: 1;
        pointer-events: auto;
        transition: opacity 0.6s ease 0.3s;
      }

      .loading-overlay[hidden] {
        opacity: 0;
        pointer-events: none;
      }

      .spinner {
        width: 48px;
        height: 48px;
        border: 3px solid rgba(255, 255, 255, 0.15);
        border-top-color: rgba(255, 255, 255, 0.92);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }

      .loading-text {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.70);
        letter-spacing: 0.1px;
        font-weight: 700;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      @media (max-width: 600px) {
        .navbar {
          padding: 0 12px;
          gap: 8px;
        }

        .navbar-logo {
          font-size: 16px;
        }

        .nav-label {
          display: none;
        }
      }
    `];
  }
  skipIntro() {
    this.screens.find((screen) => screen.sid === 0 ).skipIntro = true;
    this.skipped = true;
  }

  updateScreenList() {
    const slot = this.shadowRoot.querySelector("slot");
    if (slot) {
      this.screens = slot.assignedElements({ flatten: true }).filter((el) => el.hasAttribute("sid"));
      this.totalScreens = this.screens.length;
      this.updateScreenVisibility();
    }
  }

  updateScreenVisibility() {
    this.screens.forEach((screen, index) => {
      const isActive = index === this.currentScreen;
      screen.setAttribute("data-active", isActive ? "true" : "false");
      screen.setAttribute("active", isActive ? "" : null);
      screen.active = isActive;
    });
  }

  handleScreenChange(e) {
    const direction = e.detail?.direction || 1;
    let newScreen = this.currentScreen + direction;

    if (newScreen < 0) newScreen = this.totalScreens - 1;
    if (newScreen >= this.totalScreens) newScreen = 0;
    this.currentScreen = newScreen;
    this.updateScreenVisibility();
  }

  goToScreen(index) {
    if (index >= 0 && index < this.totalScreens) {
      this.currentScreen = index;
    }
  }

  // Lit render the HTML
  render() {
    const currentTitle = this.screens[this.currentScreen]?.getAttribute("title") || "HAX The Club";

    return html`
      <div class="navbar">
        <h1 class="navbar-logo">HAX The Club</h1>
        <div class="navbar-nav">
          ${this.screens.map(
            (_, index) => html`
              <div
                class="nav-dot ${index === this.currentScreen ? "active" : ""}"
                @click=${() => this.goToScreen(index)}
                title="${this.screens[index]?.getAttribute("title") || ""}"
              ></div>
            `
          )}
          <span class="nav-label">${currentTitle}</span>
        </div>
      </div>

      <div class="screens-container">
        <slot></slot>
      </div>

      <div class="loading-overlay" ?hidden=${!this.isLoading}>
        <div class="spinner"></div>
        <div class="loading-text">Loading HAX The Club...</div>
      </div>
    `;
  }

  jokerClick(e) {
    this.playVoice(e);
    globalThis.document.body.classList.toggle('joker');
    setTimeout(() => {
      globalThis.document.body.classList.toggle('gone');
      setTimeout(() => {
        globalThis.document.body.classList.toggle('gone');
        this.screen = null;
        setTimeout(() => {
          this.screen = 0;
          globalThis.document.body.classList.toggle('joker');
        }, 500);
      }, 3000);
    }, 6000);
  }
  playVoice(e) {
    let sound = e.target.getAttribute('data-voice');
    return new Promise((resolve) => {
      let playSound = ["joker-website-gone"].includes(sound) ? sound : "joker-website-gone";
      this.audio = new Audio(
        new URL(`./assets/voices/${playSound}.mp3`, import.meta.url).href,
      );
      this.audio.volume = 0.8;
      this.audio.onended = (event) => {
        resolve();
      };
      this.audio.play();
      // resolve after 500s if sound failed to load
      setTimeout(() => {
        resolve();
      }, 500);
    });
  }
  playSound(e) {
    let sound = "coin2";
    return new Promise((resolve) => {
      let playSound = ["coin2"].includes(sound) ? sound : "coin2";
      this.audio = new Audio(
        new URL(`./assets/sounds/${playSound}.mp3`, import.meta.url).href,
      );
      this.audio.volume = 0.5;
      this.audio.onended = (event) => {
        resolve();
      };
      this.audio.play();
      // resolve after 1s if sound failed to load
      setTimeout(() => {
        resolve();
      }, 500);
    });
  }

  arrowClick(e) {
    this.playSound();
    let direction = 0;
    switch (e.target.getAttribute('data-direction')) {
      case "up":
        direction = -1;
        break;
      case "down":
        direction = 1;
        break;
      case "left":
        direction = -1;
        break;
      case "right":
        direction = 1;
        break;
    }
    this.dispatchEvent(
      new CustomEvent("screen-change", {
        bubbles: true,
        composed: true,
        detail: {
          direction: direction,
        },
      })
    );
  }
}

globalThis.customElements.define(HaxTheClub.tag, HaxTheClub);