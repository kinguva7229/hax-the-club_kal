import { html, css } from "lit";
import { HTCScreen } from "./htc-screen.js";

export class HTCTeamScreen extends HTCScreen {
  static get tag() {
    return "htc-team-screen";
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

      .team-bg {
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

      .team-haze {
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

      .team-wrap {
        position: relative;
        z-index: 2;
        width: min(1280px, 96vw);
        margin: 0 auto;
        padding: 72px 0 120px;
        color: rgba(255, 255, 255, 0.94);
        box-sizing: border-box;
      }

      .team-title {
        margin: 0 0 10px;
        font-size: 28px;
        font-weight: 900;
        color: rgba(255, 255, 255, 0.94);
        text-shadow: 0 14px 30px rgba(0, 0, 0, 0.16);
      }

      .team-sub {
        margin: 0 0 32px;
        font-size: 13px;
        color: rgba(255, 255, 255, 0.78);
        line-height: 1.45;
      }

      .team-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 20px;
      }

      .team-member {
        padding: 16px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 12px;
        text-align: center;
        backdrop-filter: blur(10px);
      }

      .member-photo {
        width: 100px;
        height: 100px;
        border-radius: 999px;
        margin: 0 auto 12px;
        background: rgba(255, 255, 255, 0.12);
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(255, 255, 255, 0.5);
        font-size: 12px;
      }

      .member-name {
        margin: 0 0 6px;
        font-weight: 900;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.92);
      }

      .member-role {
        margin: 0 0 8px;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.70);
        font-weight: 700;
      }

      .member-bio {
        margin: 0;
        font-size: 12px;
        line-height: 1.4;
        color: rgba(255, 255, 255, 0.75);
      }
    `];
  }

  render() {
    return html`
      <div class="team-bg" aria-hidden="true"></div>
      <div class="team-haze" aria-hidden="true"></div>

      <div class="team-wrap">
        <h1 class="team-title">Meet the Team</h1>
        <p class="team-sub">The awesome people making HAX The Club happen.</p>

        <div class="team-grid">
          <div class="team-member">
            <div class="member-photo">👨‍💼</div>
            <h3 class="member-name">Club President</h3>
            <p class="member-role">Leadership & Vision</p>
            <p class="member-bio">Oversees club direction, events, and community growth.</p>
          </div>

          <div class="team-member">
            <div class="member-photo">👩‍💻</div>
            <h3 class="member-name">Tech Lead</h3>
            <p class="member-role">Project Architecture</p>
            <p class="member-bio">Guides technical decisions and code reviews.</p>
          </div>

          <div class="team-member">
            <div class="member-photo">🎓</div>
            <h3 class="member-name">Mentorship Lead</h3>
            <p class="member-role">Onboarding & Growth</p>
            <p class="member-bio">Helps new members get up to speed and reach their goals.</p>
          </div>

          <div class="team-member">
            <div class="member-photo">🎨</div>
            <h3 class="member-name">Design Lead</h3>
            <p class="member-role">UX & Brand</p>
            <p class="member-bio">Ensures our components and site design are stellar.</p>
          </div>

          <div class="team-member">
            <div class="member-photo">📢</div>
            <h3 class="member-name">Community Manager</h3>
            <p class="member-role">Events & Engagement</p>
            <p class="member-bio">Runs meetings, events, and keeps the community connected.</p>
          </div>

          <div class="team-member">
            <div class="member-photo">🔗</div>
            <h3 class="member-name">You?</h3>
            <p class="member-role">Open Positions</p>
            <p class="member-bio">We're always looking for passionate builders. Join the team!</p>
          </div>
        </div>
      </div>
    `;
  }
}

globalThis.customElements.define(HTCTeamScreen.tag, HTCTeamScreen);