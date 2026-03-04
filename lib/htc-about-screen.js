import { html, css } from "lit";
import { HTCScreen } from "./htc-screen.js";
import cytoscape from "https://cdn.jsdelivr.net/npm/cytoscape@3.27.0/dist/cytoscape.esm.min.js";

export class HTCAboutScreen extends HTCScreen {
  static get tag() {
    return "htc-about-screen";
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

      }

      .about-bg {
        position: fixed;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        background:
          radial-gradient(1200px 700px at 18% 12%, rgba(172, 201, 255, 0.42), transparent 62%),
          radial-gradient(950px 700px at 55% 0%, rgba(158, 130, 255, 0.32), transparent 60%),
          radial-gradient(1100px 800px at 86% 30%, rgba(116, 165, 255, 0.30), transparent 62%),
          radial-gradient(1200px 900px at 30% 88%, rgba(149, 186, 255, 0.24), transparent 64%),
          radial-gradient(1200px 900px at 86% 86%, rgba(147, 115, 255, 0.26), transparent 64%),
          linear-gradient(180deg, rgba(8, 10, 18, 0.94), rgba(8, 10, 18, 0.98));
      }

      .about-haze {
        position: fixed;
        inset: -40px;
        z-index: 1;
        pointer-events: none;
        background:
          radial-gradient(700px 520px at 25% 40%, rgba(255, 255, 255, 0.06), transparent 62%),
          radial-gradient(800px 560px at 70% 55%, rgba(255, 255, 255, 0.05), transparent 64%),
          radial-gradient(700px 520px at 55% 85%, rgba(0, 0, 0, 0.10), transparent 62%);
        filter: blur(18px);
        opacity: 0.85;
      }

      .about-wrap {
        position: relative;
        z-index: 2;
        width: min(1280px, 96vw);
        margin: 0 auto;
        padding: 72px 0 120px;
        color: rgba(255, 255, 255, 0.94);
        box-sizing: border-box;
      }

      .about-toprow {
        position: relative;
        width: 100%;
        height: 700px;
        margin-bottom: 14px;
        margin-left: 0;
        overflow: hidden;
      }

      .carousel-container {
        position: relative;
        width: 100%;
        height: 100%;
      }

      .carousel {
        display: flex;
        width: 100%;
        height: 100%;
        scroll-behavior: smooth;
        overflow-x: auto;
        overflow-y: hidden;
        scroll-snap-type: x mandatory;
      }

      .carousel::-webkit-scrollbar {
        height: 8px;
      }

      .carousel::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
      }

      .carousel::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 4px;
      }

      .carousel::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.5);
      }

      .carousel-slide {
        flex: 0 0 100%;
        min-width: 100%;
        height: 100%;
        scroll-snap-align: start;
        background: linear-gradient(135deg, rgba(100, 150, 200, 0.4), rgba(120, 100, 180, 0.4));
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 48px;
        color: rgba(255, 255, 255, 0.3);
        font-weight: bold;
      }

      .carousel-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        pointer-events: none;
        z-index: 10;
        padding-bottom: 80px;
      }

      .about-headline {
        margin: 0;
        font-size: 42px;
        font-weight: 800;
        color: rgba(255, 255, 255, 0.98);
        text-shadow: 0 10px 28px rgba(0, 0, 0, 0.6);
        text-align: center;
        line-height: 1.3;
        max-width: 850px;
        padding: 32px 40px;
      }

      .about-headline strong {
        display: block;
      }

      .about-corner {
        display: inline-flex;
        gap: 10px;
        align-items: center;
        font-weight: 900;
        font-size: 18px;
        color: rgba(255, 255, 255, 0.92);
        text-shadow: 0 12px 26px rgba(0, 0, 0, 0.18);
        white-space: nowrap;
        user-select: none;
        margin-top: 16px;
      }

      .glass {
        background: rgba(255, 255, 255, 0.10);
        border: 1px solid rgba(255, 255, 255, 0.16);
        border-radius: 16px;
        box-shadow: 0 18px 52px rgba(0, 0, 0, 0.28);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
      }

      .about-bullets {
        padding: 16px 16px 14px;
        margin-top: 12px;
      }

      .about-bullets > p {
        margin: 0 0 12px;
        font-weight: 900;
        font-size: 13px;
        color: rgba(255, 255, 255, 0.84);
        letter-spacing: 0.2px;
      }

      .about-bullets ul {
        margin: 0;
        padding: 0;
        list-style: none;
        display: grid;
        gap: 10px;
      }

      .about-bullets li {
        display: grid;
        grid-template-columns: 14px 1fr;
        gap: 10px;
        align-items: start;
        font-size: 14px;
        line-height: 1.35;
        color: rgba(255, 255, 255, 0.90);
      }

      .dot {
        width: 6px;
        height: 6px;
        border-radius: 999px;
        margin-top: 7px;
        background: rgba(255, 255, 255, 0.62);
        box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.08);
      }

      .about-section {
        margin-top: 22px;
      }

      h2 {
        margin: 18px 0 10px;
        font-size: 22px;
        font-weight: 900;
        color: rgba(255, 255, 255, 0.92);
        text-shadow: 0 14px 30px rgba(0, 0, 0, 0.16);
      }

      .about-sub {
        margin: 0 0 10px;
        font-size: 13px;
        color: rgba(255, 255, 255, 0.78);
        line-height: 1.45;
      }

      .about-note {
        margin: 10px 0 0;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.70);
      }

      .ecosystem-card {
        padding: 12px;
      }

      .ecosystem-grid {
        display: grid;
        grid-template-columns: 1.6fr 0.9fr;
        gap: 12px;
        align-items: stretch;
      }

      @media (max-width: 900px) {
        .ecosystem-grid {
          grid-template-columns: 1fr;
        }
      }

      .ecosystem-graph {
        height: 420px;
        border-radius: 12px;
        background: rgba(0, 0, 0, 0.14);
        border: 1px solid rgba(255, 255, 255, 0.10);
        overflow: hidden;
      }

      .ecosystem-panel {
        border-radius: 12px;
        background: rgba(0, 0, 0, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.10);
        padding: 12px;
        color: rgba(255, 255, 255, 0.92);
      }

      .ecosystem-panel-title {
        font-weight: 900;
        letter-spacing: 0.2px;
        margin-bottom: 8px;
      }

      .ecosystem-panel-body {
        font-size: 13px;
        line-height: 1.45;
        color: rgba(255, 255, 255, 0.82);
      }

      .testimonial-carousel {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: min(300px, 82vw);
        gap: 14px;
        overflow-x: auto;
        overflow-y: hidden;
        padding: 6px 2px 12px;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
      }

      .testimonial-carousel::-webkit-scrollbar {
        height: 10px;
      }
      .testimonial-carousel::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.22);
        border-radius: 999px;
      }
      .testimonial-carousel::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.18);
        border-radius: 999px;
      }

      .testimonial {
        scroll-snap-align: start;
        padding: 14px 14px 12px;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.10);
        border: 1px solid rgba(255, 255, 255, 0.16);
        box-shadow: 0 18px 52px rgba(0, 0, 0, 0.22);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        min-height: 124px;
      }

      .testimonial-top {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
      }

      .testimonial-avatar {
        width: 36px;
        height: 36px;
        border-radius: 999px;
        display: grid;
        place-items: center;
        font-weight: 900;
        letter-spacing: 0.2px;
        color: rgba(255, 255, 255, 0.92);
        background: rgba(255, 255, 255, 0.14);
        border: 1px solid rgba(255, 255, 255, 0.20);
      }

      .testimonial-name {
        margin: 0;
        font-weight: 900;
        font-size: 13px;
        color: rgba(255, 255, 255, 0.92);
      }

      .testimonial-role {
        margin: 2px 0 0;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.75);
        font-weight: 700;
      }

      .testimonial-quote {
        margin: 0;
        font-size: 13px;
        line-height: 1.45;
        color: rgba(255, 255, 255, 0.86);
      }

      .company-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 12px;
        margin-top: 10px;
      }

      @media (max-width: 900px) {
        .company-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 520px) {
        .company-grid {
          grid-template-columns: 1fr;
        }
      }

      .company-pill {
        padding: 12px 14px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.10);
        border: 1px solid rgba(255, 255, 255, 0.16);
        text-align: center;
        font-weight: 800;
        letter-spacing: 0.2px;
        color: rgba(255, 255, 255, 0.92);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
      }
    `];
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this.initEcosystemGraph();
  }

  initEcosystemGraph() {
    const el = this.shadowRoot.getElementById("ecosystemGraph");
    const panel = this.shadowRoot.getElementById("ecosystemPanelBody");
    if (!el || el.dataset.ready === "1") return;
    el.dataset.ready = "1";

    const nodes = [
      { data: { id: "student", label: "👤 Student", body: "Start: No experience needed. Curious about web dev? Join us and ship real code from day one.", category: "learning" }, position: { x: 60, y: 80 } },
      { data: { id: "class", label: "📚 IST Class", body: "Learn: Web fundamentals tied to real projects. Professor mentorship. Connect classroom to production.", category: "learning" }, position: { x: 320, y: 60 } },
      { data: { id: "club", label: "🚀 HAX The Club", body: "Hub: Ship components weekly. Learn with 20+ peers. Get code reviewed. This is where it happens.", category: "building" }, position: { x: 240, y: 180 } },
      { data: { id: "lab", label: "⚙️ HAX Lab", body: "Contribute: Deep dive into platform architecture. Weekly standups. Build core infrastructure.", category: "building" }, position: { x: 420, y: 210 } },
      { data: { id: "projects", label: "📦 Client Projects", body: "Ship: 2-4 week sprints. Real feedback loops. Your work impacts actual users. Portfolio pieces.", category: "building" }, position: { x: 240, y: 320 } },
      { data: { id: "community", label: "🏫 Penn State Web", body: "Impact: Your components live on university sites. Reach 10K+ users. Shape campus digital future.", category: "community" }, position: { x: 80, y: 320 } },
      { data: { id: "industry", label: "🏢 Industry", body: "Opportunities: Partner companies recruiting. Internships and jobs. Build your network. Get hired.", category: "outcome" }, position: { x: 420, y: 340 } },
      { data: { id: "outcome", label: "🎓 HAX Grad", body: "Outcome: Portfolio with 5+ shipped components. Public commits. Job offers. Ready for any role.", category: "outcome" }, position: { x: 520, y: 120 } },
    ];

    const edges = [
      { data: { id: "e1", source: "student", target: "club", label: "joins" } },
      { data: { id: "e2", source: "student", target: "class", label: "enrolls" } },
      { data: { id: "e3", source: "class", target: "club", label: "feeds" } },
      { data: { id: "e4", source: "club", target: "lab", label: "collab" } },
      { data: { id: "e5", source: "club", target: "projects", label: "ships" } },
      { data: { id: "e6", source: "projects", target: "industry", label: "leads to" } },
      { data: { id: "e7", source: "club", target: "community", label: "benefits" } },
      { data: { id: "e8", source: "lab", target: "outcome", label: "builds" } },
      { data: { id: "e9", source: "industry", target: "outcome", label: "becomes" } },
      { data: { id: "e10", source: "projects", target: "outcome", label: "graduates" } },
    ];

    const cy = cytoscape({
      container: el,
      elements: [...nodes, ...edges],
      layout: { name: "preset" },
      wheelSensitivity: 0.25,
      style: [
        {
          selector: "node",
          style: {
            shape: "round-rectangle",
            label: "data(label)",
            "text-valign": "center",
            "text-halign": "center",
            "font-size": 12,
            "font-weight": 700,
            color: "rgba(255,255,255,0.95)",
            "background-color": "rgba(255,255,255,0.14)",
            "border-color": "rgba(255,255,255,0.22)",
            "border-width": 2,
            padding: "12px",
            width: "label",
            height: "label",
            "text-wrap": "wrap",
            "text-max-width": 110,
          },
        },
        {
          selector: "node[category='learning']",
          style: {
            "background-color": "rgba(100, 180, 255, 0.18)",
            "border-color": "rgba(100, 180, 255, 0.45)",
            "box-shadow": "0 0 20px rgba(100, 180, 255, 0.25)",
          },
        },
        {
          selector: "node[category='building']",
          style: {
            "background-color": "rgba(50, 220, 150, 0.16)",
            "border-color": "rgba(50, 220, 150, 0.40)",
            "box-shadow": "0 0 20px rgba(50, 220, 150, 0.22)",
          },
        },
        {
          selector: "node[category='community']",
          style: {
            "background-color": "rgba(200, 160, 255, 0.16)",
            "border-color": "rgba(200, 160, 255, 0.40)",
            "box-shadow": "0 0 20px rgba(200, 160, 255, 0.22)",
          },
        },
        {
          selector: "node[category='outcome']",
          style: {
            "background-color": "rgba(255, 180, 80, 0.18)",
            "border-color": "rgba(255, 180, 80, 0.45)",
            "box-shadow": "0 0 20px rgba(255, 180, 80, 0.28)",
          },
        },
        {
          selector: "edge",
          style: {
            "curve-style": "bezier",
            width: 2.5,
            "line-color": "rgba(255,255,255,0.18)",
            "target-arrow-color": "rgba(255,255,255,0.35)",
            "target-arrow-shape": "triangle",
            "arrow-scale": 1.2,
            label: "data(label)",
            "font-size": 10,
            "text-background-color": "rgba(8, 10, 18, 0.85)",
            "text-background-padding": "3px",
            "text-background-shape": "roundrectangle",
            "edge-text-rotation": "autorotate",
            color: "rgba(255,255,255,0.70)",
          },
        },
        {
          selector: "node:selected",
          style: {
            "background-color": "rgba(255,255,255,0.22)",
            "border-color": "rgba(255,255,255,0.55)",
            "border-width": 3,
            "box-shadow": "0 0 30px rgba(255,255,255,0.40)",
          },
        },
        {
          selector: "edge:selected",
          style: {
            "line-color": "rgba(255,255,255,0.50)",
            width: 3.5,
          },
        },
      ],
    });

    cy.on("tap", "node", (evt) => {
      const n = evt.target;
      const label = n.data("label");
      const body = n.data("body") || "";
      const category = n.data("category") || "";
      const categoryLabel = { learning: "📚 Learning", building: "🚀 Building", community: "🤝 Community", outcome: "🎯 Outcome" }[category] || "";
      panel.innerHTML = `<div style="font-size:11px;color:rgba(255,255,255,0.65);margin-bottom:6px;font-weight:700;letter-spacing:0.5px;">${categoryLabel}</div><div style="font-weight:900;margin-bottom:8px;font-size:14px;">${label}</div><div style="line-height:1.5;font-size:13px;">${body}</div>`;
      cy.animate({ center: { eles: n }, duration: 240 });
    });

    cy.fit(undefined, 30);

    window.addEventListener("resize", () => {
      try {
        cy.resize();
        cy.fit(undefined, 30);
      } catch (e) {}
    });
  }

  render() {
    return html`
      <div class="about-bg" aria-hidden="true"></div>
      <div class="about-haze" aria-hidden="true"></div>

      <div class="about-wrap">
        <div class="about-toprow">
          <div class="carousel-container">
            <div class="carousel">
              <div class="carousel-slide">Image 1</div>
              <div class="carousel-slide">Image 2</div>
              <div class="carousel-slide">Image 3</div>
              <div class="carousel-slide">Image 4</div>
              <div class="carousel-slide">Image 5</div>
            </div>
            <div class="carousel-overlay">
              <p class="about-headline"><strong>In a competitive tech job market, careers aren't built in classrooms—they're built by doing real work.</strong></p>
            </div>
          </div>
        </div>
        <div style="text-align: center; margin-bottom: 28px;">
          <div class="about-corner">About HAX <span class="arrow">→</span></div>
        </div>

        <div class="about-bullets glass">
          <p>HAX The Club is where you:</p>
          <ul>
            <li><span class="dot"></span><span>Build real web components that go into production systems.</span></li>
            <li><span class="dot"></span><span>Work in teams like you would at any tech company.</span></li>
            <li><span class="dot"></span><span>Get public commits and portfolio pieces to talk about in interviews.</span></li>
            <li><span class="dot"></span><span>Connect with mentors and land internships through shipped work.</span></li>
          </ul>
        </div>

        <div class="about-section">
          <h2>How HAX works</h2>
          <p class="about-sub">The club exists within a larger ecosystem that spans classes, labs, real projects, and industry outcomes.</p>

          <div class="ecosystem-card glass">
            <div class="ecosystem-grid">
              <div id="ecosystemGraph" class="ecosystem-graph" aria-label="Interactive HAX ecosystem diagram"></div>
              <div class="ecosystem-panel">
                <div class="ecosystem-panel-title">The Pipeline</div>
                <div class="ecosystem-panel-body" id="ecosystemPanelBody">
                  Click a node to learn how each part connects.
                </div>
              </div>
            </div>
          </div>

          <p class="about-note">(Drag to pan • Scroll to zoom • Click nodes for details)</p>
        </div>

        <div class="about-section">
          <h2>What club members say</h2>

          <div class="testimonial-carousel">
            <div class="testimonial">
              <div class="testimonial-top">
                <div class="testimonial-avatar">AL</div>
                <div>
                  <p class="testimonial-name">Drew Ronk</p>
                  <p class="testimonial-role">Software Engineer</p>
                </div>
              </div>
              <p class="testimonial-quote">"“As an intern at HAX lab, I had responsibility over impactful features, the mentorship of one of the most passionate and driven people I’ve ever met in Bryan Ollendyke, and the opportunity to work with bleeding edge technology while contributing to a production-level system. Any one of those three makes for a rewarding internship. Having all of them is almost unheard of. This experience prepared me to approach complex problems with humility and confidence, which made the transition from academia to industry feel very natural. To this day, I consider that internship one of the best professional opportunities I’ve said ‘yes’ to.”"</p>
            </div>

            <div class="testimonial">
              <div class="testimonial-top">
                <div class="testimonial-avatar">JK</div>
                <div>
                  <p class="testimonial-name">Zachary Dodson.</p>
                  <p class="testimonial-role">Software Developer</p>
                </div>
              </div>
              <p class="testimonial-quote">"My time working at HAX provided me with the push and sense of direction I needed to connect the skills I had learned in my classes to the real world projects I now create and contribute to across various subjects and technologies. The open-source philosophy of HAX also provided a way to gain practical project experience that can be openly shared with potential future employers."</p>
            </div>

            <div class="testimonial">
              <div class="testimonial-top">
                <div class="testimonial-avatar">MR</div>
                <div>
                  <p class="testimonial-name">Morgan R.</p>
                  <p class="testimonial-role">Full Stack Engineer</p>
                </div>
              </div>
              <p class="testimonial-quote">"I learned more in 6 months here than in a year of online courses."</p>
            </div>

            <div class="testimonial">
              <div class="testimonial-top">
                <div class="testimonial-avatar">CP</div>
                <div>
                  <p class="testimonial-name">Casey P.</p>
                  <p class="testimonial-role">Software Engineering Intern</p>
                </div>
              </div>
              <p class="testimonial-quote">"Working with mentors and shipping real stuff made me actually confident as a developer."</p>
            </div>
          </div>
        </div>

        <div class="about-section">
          <h2>Where HAX members work</h2>
          <p class="about-sub">Our community has launched careers at:</p>

          <div class="company-grid">
            <div class="company-pill">Google</div>
            <div class="company-pill">Microsoft</div>
            <div class="company-pill">Meta</div>
            <div class="company-pill">Amazon</div>
            <div class="company-pill">GitHub</div>
            <div class="company-pill">Figma</div>
          </div>

          <p class="about-note">(...and many more. Got a company story? Let us know.)</p>
        </div>
      </div>
    `;
  }
}

globalThis.customElements.define(HTCAboutScreen.tag, HTCAboutScreen);