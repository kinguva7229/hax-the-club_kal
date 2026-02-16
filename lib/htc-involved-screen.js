import { html, css } from "lit";
import { HTCScreen } from "./htc-screen.js";

export class HTCInvolvedScreen extends HTCScreen {
  static get tag() {
    return "htc-involved-screen";
  }

  constructor() {
    super();
  }

  static get styles() {
    return [super.styles, css`
      :host {
        justify-content: flex-start !important;
        align-items: stretch !important;
        overflow-y: auto !important;
        overflow-x: hidden !important;
        scrollbar-gutter: stable !important;
      }

      .involved-bg {
        position: fixed;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        background:
          radial-gradient(1200px 700px at 18% 12%, rgba(172, 201, 255, 0.40), transparent 62%),
          radial-gradient(950px 700px at 55% 0%, rgba(158, 130, 255, 0.30), transparent 60%),
          radial-gradient(1100px 800px at 86% 30%, rgba(116, 165, 255, 0.28), transparent 62%),
          linear-gradient(180deg, rgba(8, 10, 18, 0.94), rgba(8, 10, 18, 0.98));
      }

      .involved-haze {
        position: fixed;
        inset: -40px;
        z-index: 1;
        pointer-events: none;
        background:
          radial-gradient(700px 520px at 25% 40%, rgba(255, 255, 255, 0.06), transparent 62%),
          radial-gradient(800px 560px at 70% 55%, rgba(255, 255, 255, 0.05), transparent 64%);
        filter: blur(18px);
        opacity: 0.85;
      }

      .involved-wrap {
          position: relative;
          z-index: 2;
          width: min(1280px, 96vw);
          margin: 0 auto;
          padding: 72px 0 120px;
          color: rgba(255, 255, 255, 0.94);
          box-sizing: border-box;
      }

      .involved-title {
        margin: 0 0 10px;
        font-size: 28px;
        font-weight: 900;
        color: rgba(255, 255, 255, 0.94);
        text-shadow: 0 14px 30px rgba(0, 0, 0, 0.16);
      }

      .involved-sub {
        margin: 0 0 32px;
        font-size: 13px;
        color: rgba(255, 255, 255, 0.78);
        line-height: 1.45;
      }

      .calendar-section {
        margin-bottom: 40px;
      }

      .calendar-section h2 {
        margin: 0 0 16px;
        font-size: 20px;
        font-weight: 900;
        color: rgba(255, 255, 255, 0.92);
      }

      .involved-card {
        padding: 12px;
        background: rgba(255, 255, 255, 0.10);
        border: 1px solid rgba(255, 255, 255, 0.16);
        border-radius: 16px;
        box-shadow: 0 18px 52px rgba(0, 0, 0, 0.28);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        margin-bottom: 16px;
      }

      .involved-embed {
        width: 100%;
        height: min(78vh, 720px);
        border: 0;
        border-radius: 12px;
        overflow: hidden;
        background: rgba(0, 0, 0, 0.18);
      }

      .socials-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 14px;
        margin-top: 16px;
      }

      .social-link {
        padding: 16px;
        background: rgba(255, 255, 255, 0.10);
        border: 1px solid rgba(255, 255, 255, 0.16);
        border-radius: 12px;
        text-decoration: none;
        color: rgba(255, 255, 255, 0.92);
        text-align: center;
        font-weight: 700;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        backdrop-filter: blur(10px);
      }

      .social-link:hover {
        background: rgba(255, 255, 255, 0.14);
        border-color: rgba(255, 255, 255, 0.24);
      }

      @media (max-width: 520px) {
        .involved-embed {
          height: 72vh;
        }
      }
    `];
  }

  render() {
    return html`
      <div class="involved-bg" aria-hidden="true"></div>
      <div class="involved-haze" aria-hidden="true"></div>

      <div class="involved-wrap">
        <h1 class="involved-title">Get Involved</h1>
        <p class="involved-sub">Join our community and start building with us. We meet regularly, ship constantly, and always welcome new members.</p>

        <div class="calendar-section">
          <h2>📅 Our Schedule</h2>
          <p style="font-size: 13px; color: rgba(255, 255, 255, 0.78); margin: 0 0 16px;">We hold weekly meetings, project kickoffs, and code reviews. Here's when:</p>
          <div class="involved-card">
            <iframe
              class="involved-embed"
              title="HAX The Club Google Calendar"
              src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23080A12&ctz=America%2FNew_York&mode=MONTH&showTitle=0&showPrint=0&showCalendars=0&showTz=0&showTabs=0"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div class="calendar-section">
          <h2>🔗 Connect & Join</h2>
          <p style="font-size: 13px; color: rgba(255, 255, 255, 0.78); margin: 0 0 16px;">Find us on Discord (our main hub), GitHub, and social media. New members always welcome!</p>

          <div class="socials-grid">
            <a href="https://discord.gg/PLACEHOLDER" class="social-link">💬 Discord Server</a>
            <a href="https://github.com/haxtheweb/hax-the-club" class="social-link">🐙 GitHub Repo</a>
            <a href="https://instagram.com/haxtheweb" class="social-link">📸 Instagram</a>
            <a href="https://twitter.com/haxtheweb" class="social-link">𝕏 Twitter/X</a>
            <a href="https://www.linkedin.com/company/hax-the-web/" class="social-link">💼 LinkedIn</a>
            <a href="mailto:hax@psu.edu" class="social-link">✉️ Email Us</a>
          </div>
        </div>

        <div class="calendar-section">
          <h2>🚀 How to Get Started</h2>
          <div style="display: grid; gap: 12px;">
            <div class="involved-card" style="padding: 16px;">
              <p style="margin: 0 0 6px; font-weight: 700; color: rgba(255, 255, 255, 0.92);">1. Join Discord</p>
              <p style="margin: 0; font-size: 13px; color: rgba(255, 255, 255, 0.78);">Introduce yourself and see what projects are active.</p>
            </div>
            <div class="involved-card" style="padding: 16px;">
              <p style="margin: 0 0 6px; font-weight: 700; color: rgba(255, 255, 255, 0.92);">2. Attend a Meeting</p>
              <p style="margin: 0; font-size: 13px; color: rgba(255, 255, 255, 0.78);">Weekly meetings are open to everyone. No experience required.</p>
            </div>
            <div class="involved-card" style="padding: 16px;">
              <p style="margin: 0 0 6px; font-weight: 700; color: rgba(255, 255, 255, 0.92);">3. Pick a Task</p>
              <p style="margin: 0; font-size: 13px; color: rgba(255, 255, 255, 0.78);">Start with a beginner-friendly issue or help on an active project.</p>
            </div>
            <div class="involved-card" style="padding: 16px;">
              <p style="margin: 0 0 6px; font-weight: 700; color: rgba(255, 255, 255, 0.92);">4. Ship & Grow</p>
              <p style="margin: 0; font-size: 13px; color: rgba(255, 255, 255, 0.78);">Get code reviewed, merge PRs, and build your portfolio.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

globalThis.customElements.define(HTCInvolvedScreen.tag, HTCInvolvedScreen);