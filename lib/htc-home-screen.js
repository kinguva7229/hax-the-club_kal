import { html, css } from "lit";
import { HTCScreen } from "./htc-screen.js";
import "@haxtheweb/simple-icon/lib/simple-icon-button-lite.js";

export class HTCHomeScreen extends HTCScreen {
  static get tag() {
    return "htc-home-screen";
  }

  constructor() {
    super();
  }

  static get styles() {
    return [super.styles, css`
      :host {
        background: linear-gradient(135deg, #000000, #0a0a1a);
      }

    .home-wrapper {
      padding: 0px 5%;
      display: flex;
      flex-flow: column;
      justify-content: center;
      height: 100%;
      position: relative;
      z-index: 3;
      width: 100%;
      max-width: 1080px;
      margin: 0px auto;
      box-sizing: border-box;
    }

      h1 {
        margin: 0;
        font-size: 48px;
        font-weight: 900;
        color: white;
        animation: slideInTitle 0.5s ease-out 0.1s both;
      }

      .home-discord {
        animation: slideInButton 0.5s ease-out 0.2s both;
        margin-top: 24px;
        display: flex;
        gap: 12px;
        align-items: center;
      }

      .home-discord a {
        color: white;
        text-decoration: none;
        font-weight: 700;
        transition: opacity 0.2s ease;
      }

      .home-discord a:hover {
        opacity: 0.8;
      }

      .home-banner {
        width: 100%;
        height: 50vh;
        background: linear-gradient(135deg, rgba(94, 109, 255, 0.3), rgba(116, 165, 255, 0.2));
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
        margin-top: 32px;
        color: rgba(255, 255, 255, 0.5);
        font-size: 14px;
      }

      .home-gallery {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 12px;
        margin-top: 20px;
      }

      .gallery-item {
        aspect-ratio: 1;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.12);
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(255, 255, 255, 0.5);
        font-size: 12px;
      }

      @keyframes slideInTitle {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes slideInButton {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @media (max-width: 520px) {
        .home-wrapper {
          padding: 0px 5%;
          width: 90%;
        }
        h1 {
          font-size: 32px;
        }
      }
    `];
  }

  static get properties() {
    return {
      ...super.properties,
    };
  }

  render() {
    return html`
      <div class="home-wrapper">
        <h1>HAX The Club</h1>
        <p style="margin: 12px 0 0; font-size: 16px; color: rgba(255, 255, 255, 0.85); line-height: 1.5;">
          Build real web components. Ship with a team. Turn code into career proof.
        </p>
        <div class="home-discord">
          <simple-icon-button-lite
            id="home-enter"
            icon="icons:arrow-forward"
            style="color: white;"
          ></simple-icon-button-lite>
          <a href="https://discord.gg/PLACEHOLDER">Join our Discord →</a>
        </div>

        <div class="home-banner">
          🚀 Welcome to HAX The Club — Where Penn State students build, ship, and grow.
        </div>

        <div style="margin-top: 40px;">
          <p style="margin: 0 0 16px; font-size: 14px; font-weight: 700; color: rgba(255, 255, 255, 0.80);">
            What You'll Do
          </p>
          <div style="display: grid; gap: 12px;">
            <div style="padding: 14px; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 8px; font-size: 13px; color: rgba(255, 255, 255, 0.85);">
              💻 Build components in a real codebase with real feedback
            </div>
            <div style="padding: 14px; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 8px; font-size: 13px; color: rgba(255, 255, 255, 0.85);">
              🤝 Collaborate with other students and mentors
            </div>
            <div style="padding: 14px; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 8px; font-size: 13px; color: rgba(255, 255, 255, 0.85);">
              📦 Contribute to open source and HAX ecosystem
            </div>
            <div style="padding: 14px; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 8px; font-size: 13px; color: rgba(255, 255, 255, 0.85);">
              🎯 Ship projects that matter to the Penn State web community
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

globalThis.customElements.define(HTCHomeScreen.tag, HTCHomeScreen);