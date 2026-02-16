import { LitElement, html, css } from "lit";

export class HTCFooter extends LitElement {
  static get tag() {
    return "htc-footer";
  }

  static get styles() {
    return css`
      :host {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 60px;
        background: rgba(8, 10, 18, 0.95);
        border-top: 1px solid rgba(255, 255, 255, 0.10);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 24px;
        z-index: 10;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.70);
        backdrop-filter: blur(10px);
      }

      .footer-link {
        color: rgba(255, 255, 255, 0.70);
        text-decoration: none;
        transition: color 0.2s ease;
      }

      .footer-link:hover {
        color: rgba(255, 255, 255, 0.92);
      }

      .footer-divider {
        width: 1px;
        height: 20px;
        background: rgba(255, 255, 255, 0.15);
      }

      @media (max-width: 600px) {
        :host {
          flex-wrap: wrap;
          height: auto;
          padding: 12px 0;
          gap: 12px;
        }
      }
    `;
  }

  render() {
    return html`
      <span>&copy; 2026 HAX The Club. All rights reserved.</span>
      <div class="footer-divider"></div>
      <a href="#" class="footer-link">Privacy</a>
      <a href="#" class="footer-link">Terms</a>
      <a href="#" class="footer-link">Code of Conduct</a>
    `;
  }
}

globalThis.customElements.define(HTCFooter.tag, HTCFooter);