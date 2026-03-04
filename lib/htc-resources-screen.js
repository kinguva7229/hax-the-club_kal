import { html, css } from "lit";
import { HTCScreen } from "./htc-screen.js";

export class HTCResourcesScreen extends HTCScreen {
  static get tag() {
    return "htc-resources-screen";
  }

  constructor() {
    super();
    this.resources = {
      learning: [
        { title: "Web Fundamentals Guide", description: "Master HTML, CSS, and JavaScript basics.", url: "https://PLACEHOLDER.com" },
        { title: "Component Design Patterns", description: "Learn how to build reusable web components.", url: "https://PLACEHOLDER.com" },
        { title: "Git & GitHub Essentials", description: "Version control and collaboration best practices.", url: "https://PLACEHOLDER.com" },
        { title: "Web Performance Tips", description: "Optimize and speed up your applications.", url: "https://PLACEHOLDER.com" },
      ],
      tools: [
        { title: "HAX CMS", description: "Official HAX platform for building sites.", url: "https://PLACEHOLDER.com" },
        { title: "VS Code Setup", description: "Recommended extensions and configuration.", url: "https://PLACEHOLDER.com" },
        { title: "Design System", description: "HAX design tokens and component library.", url: "https://PLACEHOLDER.com" },
        { title: "Deployment Guide", description: "Get your projects live on the web.", url: "https://PLACEHOLDER.com" },
      ],
      community: [
        { title: "Contributing Guide", description: "How to contribute to HAX projects.", url: "https://PLACEHOLDER.com" },
        { title: "Code of Conduct", description: "Community standards and expectations.", url: "https://PLACEHOLDER.com" },
        { title: "FAQ", description: "Frequently asked questions answered.", url: "https://PLACEHOLDER.com" },
        { title: "Office Hours", description: "Schedule time with team members.", url: "https://PLACEHOLDER.com" },
      ],
    };
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

      .resources-bg {
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

      .resources-haze {
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

      .resources-wrap {
        position: relative;
        z-index: 2;
        width: min(1280px, 96vw);
        margin: 0 auto;
        padding: 72px 0 120px;
        color: rgba(255, 255, 255, 0.94);
        box-sizing: border-box;
      }

      .resources-title {
        margin: 0 0 10px;
        font-size: 28px;
        font-weight: 900;
        color: rgba(255, 255, 255, 0.94);
        text-shadow: 0 14px 30px rgba(0, 0, 0, 0.16);
      }

      .resources-sub {
        margin: 0 0 32px;
        font-size: 13px;
        color: rgba(255, 255, 255, 0.78);
        line-height: 1.45;
      }

      .resource-category {
        margin-bottom: 32px;
      }

      .resource-category h2 {
        margin: 0 0 16px;
        font-size: 20px;
        font-weight: 900;
        color: rgba(255, 255, 255, 0.92);
      }

      .resource-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 12px;
      }

      .resource-item {
        padding: 14px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 10px;
        backdrop-filter: blur(10px);
      }

      .resource-item a {
        color: rgba(255, 255, 255, 0.92);
        text-decoration: none;
        font-weight: 700;
        font-size: 13px;
        display: block;
        margin-bottom: 6px;
        transition: color 0.2s ease;
      }

      .resource-item a:hover {
        color: rgba(255, 255, 255, 0.99);
      }

      .resource-desc {
        margin: 0;
        font-size: 12px;
        line-height: 1.4;
        color: rgba(255, 255, 255, 0.70);
      }
    `];
  }

  static get properties() {
    return {
      ...super.properties,
      resources: { type: Object },
    };
  }

  render() {
    return html`
      <div class="resources-bg" aria-hidden="true"></div>
      <div class="resources-haze" aria-hidden="true"></div>

      <div class="resources-wrap">
        <h1 class="resources-title">Resources</h1>
        <p class="resources-sub">Essential tools, guides, and links to level up your web development skills.</p>
        ${this.renderCategory("Community & Support", [
          { title: "Code of Conduct", description: "Community standards and values.", url: "https://github.com/haxtheweb/hax-the-club/blob/main/CODE_OF_CONDUCT.md" },
          { title: "Contributing Guide", description: "How to contribute to HAX projects.", url: "https://github.com/haxtheweb" },
          { title: "Discord Community", description: "Ask questions and get help from members.", url: "https://discord.com/channels/1032350524315537429/1339967821425147995" },
          { title: "Weekly Office Hours", description: "Get mentorship from experienced builders.", url: "https://calendar.google.com" },
        ])}
        ${this.renderCategory("Web Development Fundamentals", [
          { title: "Web Fundamentals", description: "HTML, CSS, JavaScript from the ground up.", url: "https://developer.mozilla.org/" },
          { title: "Web Components", description: "Build reusable, framework-agnostic components.", url: "https://web.dev/web-components/" },
          { title: "Version Control with Git", description: "Master Git workflows and GitHub collaboration.", url: "https://git-scm.com/doc" },
          { title: "Modern Web Performance", description: "Make your apps fast and efficient.", url: "https://web.dev/performance/" },
        ])}
        ${this.renderCategory("HAX-Specific Tools", [
          { title: "HAX CMS", description: "Official headless CMS powering Penn State web.", url: "https://hax.psu.edu/" },
          { title: "HAX Design System", description: "DDD tokens, components, and patterns.", url: "https://haxtheweb.org/documentation/ddd" },
          { title: "Lit Documentation", description: "Web components library we use.", url: "https://lit.dev/" },
          { title: "HAX Tooling", description: "Modern web component development.", url: "https://github.com/haxtheweb/crea" },
        ])}
        
      </div>
    `;
  }

  renderCategory(title, items) {
    return html`
      <div class="resource-category">
        <h2>${title}</h2>
        <div class="resource-list">
          ${items.map(item => html`
            <div class="resource-item">
              <a href="${item.url}">${item.title}</a>
              <p class="resource-desc">${item.description}</p>
            </div>
          `)}
        </div>
      </div>
    `;
  }
}

globalThis.customElements.define(HTCResourcesScreen.tag, HTCResourcesScreen);