/**
 * Copyright 2025 btopro
 * @license Apache-2.0, see LICENSE for full text.
 */
import { html, css } from "lit";
import { HTCScreen } from "./htc-screen.js";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `synthywavy-htc-screen`
 * This provides a 'screen' as far as sizing and some base requirements discussed in meeting
 * 
 * @demo index.html
 * @element htc-screen
 */
export class SynthyWavyHTCScreen extends HTCScreen    {

  static get tag() {
    return "synthywavy-htc-screen";
  }
  constructor() {
    super();
  }
    static get styles() {
    return [css`
    :host {
        display: flex;
        position: relative;
        width: 100%;
        height: 100vh;
        overflow: hidden;
      }
      .thegrid {
        position: relative;
        height: 100%;
        top: 0;
        width: 100%;
        z-index: 1;
        background:
            linear-gradient(
                transparent 45%,
                white 48%,
                white 52%,
                transparent 55%
            ),
            linear-gradient(to right,
                transparent 45%,
                white 48%,
                white 52%,
                transparent 55%
            );
            background-size: 50px 50px;
            transform: rotateX(90deg);
      }
      .floor {
        perspective: 50vh;
        perspective-origin: top;
        position: absolute;
        top: 50%;
        height: 50%;
        left: 0;
        width: 100%;
      }
      .thebox {
        display: flex;
        position: absolute;
        top: 30vh;
        left: 50vw;
        transform: translate(-50%, -50%);
        background-color: purple;
        z-index: 3;
      }
      .distantfog {
        position: absolute;
        top: 46%;
        width: 100%;
        height: 55%;
      background:
            linear-gradient(
                transparent,
                var(--ddd-theme-default-wonderPurple) 30%,
                var(--ddd-theme-default-wonderPurple) 40%,
                transparent
            );
            z-index: 2;
      }
      .sky {
        position: absolute;
        width: 100%;
        height: 65%;
        background: linear-gradient(
         var(--ddd-theme-default-athertonViolet) 10%,
         var(--ddd-theme-default-wonderPurple) 160% );
         z-index: 0;
      }
      .sun {
        position: absolute;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        background: radial-gradient(circle, var(--ddd-theme-default-keystoneYellow) 50%, transparent 70%);
        top: 55vh;
        left: 50vw;
        transform: translate(-50%, -50%);
        z-index: 1;
      }
      .mountainsleft {
        position: absolute;
        bottom: 35%;
        width: 50%;
        height: 20%;
        clip-path: polygon(9% 77%, 14% 74%, 18% 61%, 21% 68%, 31% 76%, 41% 54%, 46% 40%, 52% 50%, 59% 64%, 65% 75%, 71% 66%, 75% 39%, 81% 54%, 86% 62%, 90% 68%, 93% 57%, 96% 70%, 99% 90%, 100% 100%, 0 100%);
        background-color: var(--ddd-theme-default-nittanyNavy);
      }
      .mountainsright {
        position: absolute;
        bottom: 35%;
        left : 50%;
        width: 50%;
        height: 20%;
        clip-path: polygon(9% 77%, 16% 48%, 21% 35%, 26% 43%, 31% 76%, 41% 74%, 49% 60%, 55% 46%, 61% 43%, 68% 34%, 71% 23%, 75% 39%, 81% 54%, 86% 62%, 90% 68%, 93% 57%, 96% 70%, 99% 90%, 100% 100%, 0 100%);
        background-color: var(--ddd-theme-default-nittanyNavy);
      }
    `];
  }

  render() {
    return html`
    <div class="thebox">
      <slot>
      </slot>
    </div>
    <div class="floor">
      <div class="thegrid"></div>
    </div>
    <div class="sky"></div>
    <div class="distantfog"></div>
    <div class="sun"></div>
    <div class="mountainsleft"></div>
    <div class="mountainsright"></div>
      `;
  }
}

globalThis.customElements.define(SynthyWavyHTCScreen.tag, SynthyWavyHTCScreen);