import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class counterApp extends DDDSuper(LitElement) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.title = "";
    this.counter = 0;
    this.min = 0;
    this.max = 30;
    this.color= "white";
  }

  static get properties() {
    return {
      title: { type: String },
      counter: {type: Number, reflect: true },
      min: {type: Number},
      max: {type: Number},
      color:{type: String}
    };
  }

  static get styles() {
    return [super.styles,
      css`
      :host {
        display: block;
        color: white;
        background-color: black;
        font-family: var(--ddd-font-navigation);
        font-size: var(--counter-app-font-size, var(--ddd-font-size-l));
      }
      .wrapper {
        text-align: center;
        margin: var(--ddd-spacing-4);
        padding: var(--ddd-spacing-8);
      }
      .counter{
        font-size: var(--ddd-font-size-l);
      }
      
      button {
        font-size: var(--ddd-font-size-s);
        padding: var(--ddd-spacing-2);
        background-color: black;
        border: 1px solid white;
        border-radius: 8px;
      }

      button:hover {
        background-color: black
      }

      button:focus {
        outline: 2px solid black;
      }
      button:disabled {
        background-color: black;
      }

    `];
  }
  increment(){
    if (this.counter < this.max) { 
      this.counter++;
    }
  }
    
  decrement(){
    if (this.counter > this.min) { 
      this.counter--;
  }
}
updated(changedProperties) {
  if (changedProperties.has('counter')) {
    if (this.counter === 21) {
      this.makeItRain();
    }
  }
}

makeItRain() {
  import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(() => {
    const confettiEl = this.shadowRoot.querySelector("#confetti");
    if (confettiEl) { 
      setTimeout(() => {
        confettiEl.setAttribute("popped", "");  // Trigger confetti animation
      }, 0);
    }
  });
}

render() {
  if (this.counter === 18) {
    this.color = 'blue'; 
  } else if (this.counter === 21) {
    this.color = 'red'; 
  } else if (this.counter === 0) {
    this.color = "green"; 
  } else if (this.counter === 30) {
    this.color = "pink"; 
  } else {
    this.color = "white";
  }
  

  return html`
    <div class="wrapper" style="color: ${this.color}">
      <div>${this.title}</div>
      <div class="counter">${this.counter}</div>
      <button @click="${this.increment}" ?disabled="${this.counter === this.max}">Increment</button>
      <button @click="${this.decrement}" ?disabled="${this.counter === this.min}">Decrement</button>
      <div id="confetti"></div> <!-- Confetti container -->
    </div>
  `;
}


  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(counterApp.tag, counterApp);