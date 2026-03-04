import { html, css } from "lit";
import { HTCScreen } from "./htc-screen.js";
import "@haxtheweb/simple-icon/lib/simple-icon-button-lite.js";

export class HTCLandpageScreen extends HTCScreen {
  static get tag() {
    return "htc-landpage-screen";
  }

  constructor() {
    super();
    this.upcomingEvents = [
      {
        title: "Build Night #42",
        date: "March 15, 2026",
        description: "Weekly open coding session. Bring your ideas and collaborate.",
        icon: "icons:build",
      },
      {
        title: "Web Components Workshop",
        date: "March 22, 2026",
        description: "Learn the fundamentals of building reusable web components.",
        icon: "icons:school",
      },
      {
        title: "Hackathon Kickoff",
        date: "April 5, 2026",
        description: "24-hour coding challenge with prizes and mentorship.",
        icon: "icons:emoji-events",
      },
    ];

    this.featuredResources = [
      {
        title: "Web Components 101",
        description: "Essential guide to building modern, reusable web components.",
      },
      {
        title: "HAX Design System",
        description: "Official design tokens and component library for theming.",
      },
      {
        title: "Deployment Guide",
        description: "Get your projects live with our step-by-step tutorial.",
      },
    ];

    this.teamPreview = [
      {
        name: "Alex Chen",
        role: "Lead Developer",
      },
      {
        name: "Jordan Smith",
        role: "Community Manager",
      },
      {
        name: "Casey Tech",
        role: "Design Lead",
      },
    ];

    this.offerings = [
      {
        title: "Build Nights",
        description: "Weekly collaborative coding sessions with mentorship and peer feedback.",
        emoji: "💻",
      },
      {
        title: "Workshops",
        description: "Structured learning on web components, design systems, and open source.",
        emoji: "🚀",
      },
      {
        title: "Community",
        description: "Join a supportive network of student developers building real products.",
        emoji: "🤝",
      },
    ];
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          justify-content: flex-start !important;
          align-items: stretch !important;
          overflow-y: auto !important;
          overflow-x: hidden !important;
          scrollbar-gutter: stable !important;
        }

        .landpage-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background:
            radial-gradient(1200px 700px at 18% 12%, rgba(172, 201, 255, 0.40), transparent 62%),
            radial-gradient(950px 700px at 55% 0%, rgba(158, 130, 255, 0.30), transparent 60%),
            radial-gradient(1100px 800px at 86% 30%, rgba(116, 165, 255, 0.28), transparent 62%),
            radial-gradient(1200px 900px at 30% 88%, rgba(149, 186, 255, 0.24), transparent 64%),
            linear-gradient(180deg, rgba(8, 10, 18, 0.94), rgba(8, 10, 18, 0.98));
        }

        .landpage-haze {
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

        .landpage-wrap {
          position: relative;
          z-index: 2;
          width: min(1280px, 96vw);
          margin: 0 auto;
          padding: 0 0 120px;
          color: rgba(255, 255, 255, 0.94);
          box-sizing: border-box;
        }

        /* Hero Section */
        .hero {
          padding: 120px 32px 80px;
          text-align: center;
          margin-bottom: 60px;
        }

        .hero-content {
          max-width: 900px;
          margin: 0 auto;
        }

        .hero h1 {
          margin: 0 0 20px;
          font-size: 52px;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.98);
          line-height: 1.2;
          letter-spacing: -1px;
        }

        .hero-subtitle {
          margin: 0 0 40px;
          font-size: 18px;
          color: rgba(255, 255, 255, 0.75);
          line-height: 1.6;
        }

        .hero-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }

        .btn {
          padding: 14px 32px;
          border-radius: 8px;
          border: none;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .btn-primary {
          background: linear-gradient(135deg, rgba(110, 150, 255, 0.9), rgba(140, 120, 255, 0.9));
          color: rgba(255, 255, 255, 0.98);
          border: 1px solid rgba(150, 170, 255, 0.4);
          box-shadow: 0 8px 24px rgba(110, 150, 255, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(110, 150, 255, 0.4);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
        }

        /* Section Titles */
        .section-title {
          margin: 0 0 10px 32px;
          font-size: 32px;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.94);
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .section-subtitle {
          margin: 0 0 32px 32px;
          font-size: 15px;
          color: rgba(255, 255, 255, 0.68);
          line-height: 1.5;
        }

        /* Quick Overview Grid */
        .overview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          padding: 0 32px;
          margin-bottom: 80px;
        }

        .overview-card {
          padding: 32px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 16px;
          box-shadow: 0 18px 52px rgba(0, 0, 0, 0.28);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .overview-card:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-4px);
        }

        .overview-emoji {
          font-size: 40px;
          margin-bottom: 12px;
        }

        .overview-card h3 {
          margin: 0 0 12px;
          font-size: 20px;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.95);
        }

        .overview-card p {
          margin: 0;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.72);
          line-height: 1.6;
          flex-grow: 1;
        }

        /* Events Section */
        .events-section {
          margin-bottom: 80px;
        }

        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          padding: 0 32px;
        }

        .event-card {
          padding: 24px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .event-card:hover {
          background: rgba(255, 255, 255, 0.12);
          transform: translateY(-2px);
        }

        .event-date {
          font-size: 12px;
          color: rgba(110, 150, 255, 0.9);
          font-weight: 700;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .event-card h4 {
          margin: 0 0 8px;
          font-size: 18px;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.95);
        }

        .event-card p {
          margin: 0;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.68);
          line-height: 1.5;
        }

        /* Resources Section */
        .resources-section {
          margin-bottom: 80px;
        }

        .resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          padding: 0 32px;
          margin-bottom: 32px;
        }

        .resource-tile {
          padding: 28px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .resource-tile:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.16);
          transform: translateY(-2px);
        }

        .resource-tile h4 {
          margin: 0 0 10px;
          font-size: 17px;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.95);
        }

        .resource-tile p {
          margin: 0;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.5;
        }

        .resources-cta {
          padding: 0 32px;
        }

        /* Team Section */
        .team-section {
          margin-bottom: 80px;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          padding: 0 32px;
          margin-bottom: 32px;
        }

        .team-card {
          padding: 24px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          text-align: center;
        }

        .team-avatar {
          width: 64px;
          height: 64px;
          margin: 0 auto 16px;
          background: linear-gradient(135deg, rgba(110, 150, 255, 0.4), rgba(140, 120, 255, 0.4));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.5);
        }

        .team-card h4 {
          margin: 0 0 6px;
          font-size: 16px;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.95);
        }

        .team-card p {
          margin: 0;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.65);
          font-weight: 600;
        }

        .team-cta {
          padding: 0 32px;
        }

        /* Final CTA */
        .final-cta {
          padding: 60px 32px;
          margin: 80px 32px 0;
          background: linear-gradient(135deg, rgba(110, 150, 255, 0.15), rgba(140, 120, 255, 0.15));
          border: 1px solid rgba(150, 170, 255, 0.2);
          border-radius: 16px;
          text-align: center;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .final-cta h2 {
          margin: 0 0 16px;
          font-size: 32px;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.95);
        }

        .final-cta p {
          margin: 0 0 32px;
          font-size: 15px;
          color: rgba(255, 255, 255, 0.72);
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .final-cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero {
            padding: 80px 24px 60px;
            margin-bottom: 40px;
          }

          .hero h1 {
            font-size: 36px;
          }

          .hero-subtitle {
            font-size: 15px;
            margin-bottom: 32px;
          }

          .hero-buttons {
            gap: 12px;
          }

          .btn {
            padding: 12px 24px;
            font-size: 14px;
          }

          .section-title {
            margin-left: 24px;
            font-size: 24px;
          }

          .section-subtitle {
            margin-left: 24px;
            margin-bottom: 24px;
          }

          .overview-grid,
          .events-grid,
          .resources-grid,
          .team-grid {
            padding: 0 24px;
            gap: 16px;
          }

          .overview-card,
          .event-card,
          .resource-tile,
          .team-card {
            padding: 20px;
          }

          .overview-emoji {
            font-size: 32px;
            margin-bottom: 8px;
          }

          .final-cta {
            padding: 40px 24px;
            margin: 60px 24px 0;
          }

          .final-cta h2 {
            font-size: 24px;
          }

          .final-cta p {
            font-size: 13px;
            margin-bottom: 24px;
          }

          .resources-cta,
          .team-cta {
            padding: 0 24px;
          }
        }

        @media (max-width: 520px) {
          .hero {
            padding: 60px 16px 40px;
            margin-bottom: 30px;
          }

          .hero h1 {
            font-size: 28px;
            margin-bottom: 16px;
          }

          .hero-subtitle {
            font-size: 14px;
            margin-bottom: 24px;
          }

          .hero-buttons {
            gap: 10px;
          }

          .btn {
            padding: 10px 18px;
            font-size: 13px;
            width: 100%;
            justify-content: center;
          }

          .section-title {
            margin-left: 16px;
            font-size: 20px;
            margin-bottom: 8px;
          }

          .section-subtitle {
            margin-left: 16px;
            font-size: 13px;
            margin-bottom: 20px;
          }

          .overview-grid,
          .events-grid,
          .resources-grid,
          .team-grid {
            padding: 0 16px;
            gap: 12px;
            grid-template-columns: 1fr;
          }

          .overview-card,
          .event-card,
          .resource-tile,
          .team-card {
            padding: 16px;
          }

          .overview-emoji {
            font-size: 28px;
          }

          .section-title {
            font-size: 18px;
          }

          .final-cta {
            padding: 32px 16px;
            margin: 40px 16px 0;
          }

          .final-cta h2 {
            font-size: 20px;
          }

          .final-cta p {
            font-size: 12px;
            margin-bottom: 20px;
          }

          .resources-cta,
          .team-cta {
            padding: 0 16px;
          }
        }
      `,
    ];
  }

  static get properties() {
    return {
      ...super.properties,
    };
  }

  render() {
    return html`
      <div class="landpage-bg"></div>
      <div class="landpage-haze"></div>
      <div class="landpage-wrap">
        <!-- Hero Section -->
        <div class="hero">
          <div class="hero-content">
            <h1>Build Real Products. Ship with Real Teams.</h1>
            <p class="hero-subtitle">
              Join HAX The Club — where Penn State students build web components, collaborate on
              real projects, and turn their code into career proof.
            </p>
            <div class="hero-buttons">
              <button class="btn btn-primary" @click="${this._navigateToInvolved}">
                <span>→</span> Get Involved
              </button>
              <button class="btn btn-secondary" @click="${this._navigateToAbout}">
                Learn More
              </button>
            </div>
          </div>
        </div>

        <!-- Quick Overview -->
        <div class="overview-grid">
          ${this.offerings.map(
            (offering) => html`
              <div class="overview-card">
                <div class="overview-emoji">${offering.emoji}</div>
                <h3>${offering.title}</h3>
                <p>${offering.description}</p>
              </div>
            `
          )}
        </div>

        <!-- Upcoming Events Section -->
        <div class="events-section">
          <h2 class="section-title">Upcoming Events</h2>
          <p class="section-subtitle">
            Join us for regular build nights, workshops, and community events.
          </p>
          <div class="events-grid">
            ${this.upcomingEvents.map(
              (event) => html`
                <div class="event-card">
                  <div class="event-date">${event.date}</div>
                  <h4>${event.title}</h4>
                  <p>${event.description}</p>
                </div>
              `
            )}
          </div>
        </div>

        <!-- Featured Resources Section -->
        <div class="resources-section">
          <h2 class="section-title">Featured Resources</h2>
          <p class="section-subtitle">
            Explore guides, tutorials, and tools to accelerate your learning journey.
          </p>
          <div class="resources-grid">
            ${this.featuredResources.map(
              (resource) => html`
                <div class="resource-tile">
                  <h4>${resource.title}</h4>
                  <p>${resource.description}</p>
                </div>
              `
            )}
          </div>
          <div class="resources-cta">
            <button class="btn btn-secondary" @click="${this._navigateToResources}">
              View All Resources →
            </button>
          </div>
        </div>

        <!-- Team Preview Section -->
        <div class="team-section">
          <h2 class="section-title">Meet the Team</h2>
          <p class="section-subtitle">
            Get to know the passionate students and mentors behind HAX The Club.
          </p>
          <div class="team-grid">
            ${this.teamPreview.map(
              (member) => html`
                <div class="team-card">
                  <div class="team-avatar">${member.name.charAt(0)}</div>
                  <h4>${member.name}</h4>
                  <p>${member.role}</p>
                </div>
              `
            )}
          </div>
          <div class="team-cta">
            <button class="btn btn-secondary" @click="${this._navigateToTeam}">
              See Full Team →
            </button>
          </div>
        </div>

        <!-- Final CTA -->
        <div class="final-cta">
          <h2>Ready to Join?</h2>
          <p>
            Whether you're brand new to web development or an experienced builder, there's a place
            for you in HAX The Club.
          </p>
          <div class="final-cta-buttons">
            <button class="btn btn-primary" @click="${this._navigateToInvolved}">
              Get Started Today
            </button>
            <button class="btn btn-secondary" @click="${this._navigateToAbout}">
              Learn Our Mission
            </button>
          </div>
        </div>
      </div>
    `;
  }

  _navigateToScreen(targetSid) {
    const club = document.querySelector("hax-the-club");
    if (club && typeof club.goToScreen === "function") {
      club.goToScreen(targetSid);
    }
  }

  _navigateToInvolved() {
    this._navigateToScreen(4); // htc-involved-screen sid="4"
  }

  _navigateToAbout() {
    this._navigateToScreen(0); // htc-main-screen sid="0"
  }

  _navigateToResources() {
    this._navigateToScreen(5); // htc-resources-screen sid="5"
  }

  _navigateToTeam() {
    this._navigateToScreen(3); // htc-team-screen sid="3"
  }
}

globalThis.customElements.define(HTCLandpageScreen.tag, HTCLandpageScreen);
