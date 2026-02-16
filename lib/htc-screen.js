/**
 * Copyright 2025 btopro
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";

/**
 * `htc-screen`
 * This provides a 'screen' as far as sizing and some base requirements discussed in meeting
 * 
 * @demo index.html
 * @element htc-screen
 */
export class HTCScreen extends LitElement {

  static get tag() {
    return "htc-screen";
  }
  constructor() {
    super();
    this.sid = null;
    this.title = null;
    this.isScreen = true;
    this.active = false;
  }

  static get styles() {
    return [css`
      :host {
        display: flex;
        width: 100%;
        max-width: 100vw;
        height: 100%;
        overflow: hidden;
        overflow-x: hidden;
        position: absolute;
        top: 0;             
        left: 0;            
        right: 0;           
        bottom: 0;  
        align-items: center;
        justify-content: center;
        background-color: var(--htc-screen-background-color, black);
        box-sizing: border-box;
    }

      .wrapper {
        width: 100%;
        max-width: 100%;
        height: 100%;
        display: flex;
        box-sizing: border-box;
        overflow-x: hidden;
      }
    `];
  }



  // Lit reactive properties
  static get properties() {
    return {
      sid: { type: Number }, // id of the screen
      title: { type: String }, // title of the screen
      isScreen: { type: Boolean, reflect: true, attribute: "is-screen" }, // is this a screen
      active: { type: Boolean, reflect: true }, // is this screen active
    };
  }

  firstUpdated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
    this.dispatchEvent(
      new CustomEvent("screen-ready", {
        bubbles: true,
        detail: {
          screen: this,
        },
      })
    );
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("keydown", this.handleKeydown.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("keydown", this.handleKeydown.bind(this));
  }

  handleKeydown(e) {
    if (e.key === "ArrowRight") {
      this.dispatchEvent(
        new CustomEvent("screen-change", {
          bubbles: true,
          composed: true,
          detail: { direction: 1 },
        })
      );
    } else if (e.key === "ArrowLeft") {
      this.dispatchEvent(
        new CustomEvent("screen-change", {
          bubbles: true,
          composed: true,
          detail: { direction: -1 },
        })
      );
    }
  }

  render() {
    return html`
      <div class="wrapper">
        <slot></slot>
      </div>`;
  }
}

globalThis.customElements.define(HTCScreen.tag, HTCScreen);