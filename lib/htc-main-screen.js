/**
 * Copyright 2025 btopro
 * @license Apache-2.0, see LICENSE for full text.
 */
import { html, css, unsafeCSS } from "lit";
import { HTCScreen } from "./htc-screen.js";
import "@haxtheweb/future-terminal-text/lib/future-terminal-text-lite.js";
import "@haxtheweb/type-writer/type-writer.js";
import "@haxtheweb/simple-icon/lib/simple-icon-button-lite.js";

const staticBg = new URL("../assets/images/tv-static-bg.gif", import.meta.url).href;
const bmload = new URL("../assets/images/bmload.svg", import.meta.url).href;


/**
 * `htc-screen`
 * This provides a 'screen' as far as sizing and some base requirements discussed in meeting
 * 
 * @demo index.html
 * @element htc-screen
 */

export class HTCMainScreen extends HTCScreen {

  static get tag() {
    return "htc-main-screen";
  }
  constructor() {
    super();
    this.tagLine = "Future loading..";
    this.loading = true;
    this.skipIntro = false;
  }

  static get styles() {
    return [super.styles,
    css`
    :host([active]) .bgwrapper {
      background-color: #000000;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-image: url(${unsafeCSS(staticBg)});
      z-index: 0;
      height: 100vh;
      width: 100%;
      max-width: 100vw;
      position: fixed;
      overflow-x: hidden;
    }
    :host([loading]) .wrapper {
      background-color: #000000ee;
    }
    .wrapper {
      background-color: #000000cc;
      width: 100%;
      max-width: 100%;
      display: flex;
      flex-direction: column;
      z-index: 1;
      height: 100vh;
      justify-content: center;
      align-items: center;
      transition: all 0.5s ease-in-out;
      overflow-x: hidden;
      box-sizing: border-box;
    }
    .message-content {
      color: white;
      font-family: "Press Start 2P", Roboto, Helvetica, Arial, Lucida, sans-serif;
      font-size: 28px;
      margin: 20px;
      padding: 8px;
    }

    simple-icon-button-lite {
      --simple-icon-width: 80px;
      --simple-icon-height: 80px;
      margin: 20px;
      color: white;
    }

    :host([dark-mode]) .message-content {
      border-color: var(--ddd-theme-default-slateGray);
      color: var(--ddd-theme-default-white);
      background-color: var(--ddd-theme-default-coalyGray);
    }
    
    future-terminal-text-lite {
      overflow-wrap: break-all;
      text-align: start;
      display: block;
      --future-terminal-text-color: #ffffff88;
      font-weight: bold;
      font-style: italic;
      font-family: "Press Start 2P", Roboto, Helvetica, Arial, Lucida, sans-serif;
      font-size: 100px;
      height: 100px;
      line-height: 100px;
      vertical-align: middle;
      margin: 8px 0;
    }
    future-terminal-text-lite::part(text) {
      filter: blur(2px);
    }
    future-terminal-text-lite::part(text):hover {
      filter: blur(0px);
      transition: all 0.5s ease-in-out;
      box-shadow: 0px 0px 40px 20px #00ffff44;
      background-color: #00ffff44;
      border-radius: 10px;
    }
    type-writer {
      display: block;
    }
    @media (max-height: 500px) and (orientation: landscape) {
      future-terminal-text-lite {
        font-size: 32px;
        height: 32px;
        line-height: 32px;
      }
    }

    @media (max-width: 640px) {
      future-terminal-text-lite {
        display: block;
        font-size: 64px;
        height: 64px;
        line-height: 64px;
      }
      simple-icon-button-lite {
        --simple-icon-width: 64px;
        --simple-icon-height: 64px;
        margin: 8px;
      }

      .message-content {
        font-size: 22px;
        margin: 10px;
        padding: 4px;
      }
    }
    @media (max-width: 400px) {
      future-terminal-text-lite {
        display: block;
        font-size: 32px;
        height: 32px;
        line-height: 32px;
      }
      simple-icon-button-lite {
        --simple-icon-width: 32px;
        --simple-icon-height: 32px;
        margin: 4px;
      }

      .message-content {
        font-size: 20px;
        margin: 4px;
        padding: 4px;
      }
    }
    .bmloading {
      visibility: hidden;
      opacity: 0;
      filter: blur(10px);
      transition: all 3s ease-in-out;
      font-size: 10vh;
      position: fixed;
      top: 50%;
      left: 50%;
      z-index: 2;
    }
    :host([loading]) .bmloading {
      opacity: 1;
      visibility: visible;
      --dur: 3;
      font-size: 120vh;
      filter: blur(2px);
    }
    .bmloading-part {
      --pos: 0em;
      position: absolute;
      top: 50%;
      left: 50%;
      width: .16em;
      height: .32em;
      margin: -.16em 0 0 -.08em;
      background: center no-repeat;
      background-image: url(${unsafeCSS(bmload)});
      animation: calc( var( --dur ) * 1s ) linear infinite bmloading-anim;
      opacity: 0;
    }
    @keyframes bmloading-anim {
      0% {
        --pos: .04em;
        opacity: 1;
        filter: drop-shadow( 0 0 12px #fff );
      }
      20% {
        --pos: 0em;
      }
      100% {
        --pos: 0em;
        opacity: .2;
      }
    }
    .bmloading-part:nth-child( 1 ) { transform: rotate(   0deg ) translate( calc( .4em + var( --pos ) ) ); animation-delay: calc( var( --dur ) / 8 * 1s ); }
    .bmloading-part:nth-child( 2 ) { transform: rotate(  45deg ) translate( calc( .4em + var( --pos ) ) ); animation-delay: calc( var( --dur ) / 8 * 2s ); }
    .bmloading-part:nth-child( 3 ) { transform: rotate(  90deg ) translate( calc( .4em + var( --pos ) ) ); animation-delay: calc( var( --dur ) / 8 * 3s ); }
    .bmloading-part:nth-child( 4 ) { transform: rotate( 135deg ) translate( calc( .4em + var( --pos ) ) ); animation-delay: calc( var( --dur ) / 8 * 4s ); }
    .bmloading-part:nth-child( 5 ) { transform: rotate( 180deg ) translate( calc( .4em + var( --pos ) ) ); animation-delay: calc( var( --dur ) / 8 * 5s ); }
    .bmloading-part:nth-child( 6 ) { transform: rotate( 225deg ) translate( calc( .4em + var( --pos ) ) ); animation-delay: calc( var( --dur ) / 8 * 6s ); }
    .bmloading-part:nth-child( 7 ) { transform: rotate( 270deg ) translate( calc( .4em + var( --pos ) ) ); animation-delay: calc( var( --dur ) / 8 * 7s ); }
    .bmloading-part:nth-child( 8 ) { transform: rotate( 315deg ) translate( calc( .4em + var( --pos ) ) ); animation-delay: calc( var( --dur ) / 8 * 8s ); }


    :host([loading]) simple-icon-button-lite {
      opacity: 0;
      visibility: hidden;
      filter: blur(50px);
      transition: all 2s ease-in-out;
    }
    simple-icon-button-lite {
      opacity: 1;
      visibility: visible;
      filter: blur(3px);
    }
    
    simple-icon-button-lite:hover,
    simple-icon-button-lite:focus {
      filter: blur(0px);
    }
    .btn-wrapper simple-icon-button-lite {
      display: inline-block;
    }
    `];
  }

  // Lit reactive properties
  static get properties() {
    return {
      sid: { type: Number, reflect: true }, // id of the screen
      tagLine: { type: String, attribute: 'tag-line' },
      loading: { type: Boolean, reflect: true },
      skipIntro: { type: Boolean, reflect: true, attribute: 'skip-intro' },
    };
  }

  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  firstUpdated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
    this.__intro = setTimeout(() => {
      this.tagLine = "we need you"
      setTimeout(() => {
        this.tagLine = "time to wake"
        setTimeout(() => {
          this.tagLine = "time to build"
          setTimeout(() => {
            this.tagLine = "WAKE UP!"
          }, 1500);
        }, 1500);
      }, 1500);
    }, 1500);
    this.__introLoading = setTimeout(() => {
      this.shadowRoot.querySelectorAll('.hax').forEach((item) => {
        for (let i=0; i < 3; i++) {
          setTimeout(() => {
            item._doGlitch();
            item.style.setProperty('--future-terminal-text-color', `#${this.randomNumber(0, 9)}f${this.randomNumber(0, 9)}f${this.randomNumber(0, 9)}f88`)
          }, this.randomNumber(3000, 5000));
          setTimeout(() => {
            item.innerHTML = item.getAttribute('title');
            this.tagLine = "Build future you."
            this.loading = false;
            item.style.setProperty('--future-terminal-text-color', `#ffffff88`);
          }, 8000);
        }
      });
    }, 0);
  }

  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    // ability to skip intro
    if (changedProperties.has('skipIntro') && this.skipIntro) {
      this.tagLine = "Build future you."
      this.loading = false;
      clearTimeout(this.__intro);
      clearTimeout(this.__introLoading);
    }
  }

  glitchItem(item) {
    clearTimeout(this._timeout);
    this._timeout = setTimeout(() => {
      item._doGlitch();
      item.style.setProperty('--future-terminal-text-color', `#${this.randomNumber(0, 9)}f${this.randomNumber(0, 9)}f${this.randomNumber(0, 9)}f88`)
      setTimeout(() => {
        item.innerHTML = item.getAttribute('title');
        item.style.setProperty('--future-terminal-text-color', `#ffffff88`);
      }, 3000);
    }, this.randomNumber(100, 500));
  }

  playSound(e) {
    let sound = "coin2";
    return new Promise((resolve) => {
      let playSound = ["coin2"].includes(sound) ? sound : "coin2";
      this.audio = new Audio(
        new URL(`../assets/sounds/${playSound}.mp3`, import.meta.url).href,
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

  render() {
    return html`
      <div class="bgwrapper"></div>
      ${this.active ? html`
              <div class="bmloading">
        <div class="bmloading-part"></div>
        <div class="bmloading-part"></div>
        <div class="bmloading-part"></div>
        <div class="bmloading-part"></div>
        <div class="bmloading-part"></div>
        <div class="bmloading-part"></div>
        <div class="bmloading-part"></div>
        <div class="bmloading-part"></div>
      </div>
          `: ``}
      <div class="wrapper">
      <future-terminal-text-lite
        fadein
        glitch
        white
        @mouseover="${(e) => this.glitchItem(e.target)}"
        title="HAX"
       class="hax">HAX</future-terminal-text-lite>
       <future-terminal-text-lite
        fadein
        glitch
        @mouseover="${(e) => this.glitchItem(e.target)}"
        title="The"
       class="hax">The</future-terminal-text-lite>
       <future-terminal-text-lite
        fadein
        glitch
        blue
        @mouseover="${(e) => this.glitchItem(e.target)}"
        title="Club"
       class="hax">Club</future-terminal-text-lite>
      <type-writer
        class="message-content"
        text="${this.tagLine}"
        delay="1500"
        speed="120"
        erase-speed="10"
        cursor-duration="1500"
      ></type-writer>
      <div class="btn-wrapper">
        <simple-icon-button-lite
        icon="icons:arrow-forward"
        @click="${this.arrowClick}"
        data-direction="right"
        ></simple-icon-button-lite>
      </div>
      <div class="slot-wrapper">
        <slot></slot>
      </div>
      </div>`;
  }
}

globalThis.customElements.define(HTCMainScreen.tag, HTCMainScreen);