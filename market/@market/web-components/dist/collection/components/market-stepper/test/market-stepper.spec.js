import { newSpecPage } from "@stencil/core/testing";
import { MarketStepper } from "../market-stepper";
describe('market-stepper', () => {
    it('renders with defaults', async () => {
        const page = await newSpecPage({
            components: [MarketStepper],
            html: '<market-stepper></market-stepper>',
        });
        expect(page.root).toEqualHtml(`
      <market-stepper class="market-stepper" input-aria-label="Number" decrement-aria-label="Decrement" increment-aria-label="Increment">
        <mock:shadow-root>
          <button aria-label="Decrement">
            <svg width="10" height="2" viewBox="0 0 10 2" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.66667 0.333328H0.333336V1.66666H9.66667V0.333328Z" />
            </svg>
          </button>
          <input aria-label="Number" part="native-input" placeholder="0" step="1" type="number" />
          <button aria-label="Increment">
            <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.66665 9.66666V5.66666H9.66665V4.33333H5.66665V0.333328H4.33331V4.33333H0.333313V5.66666H4.33331V9.66666H5.66665Z" />
            </svg>
          </button>
        </mock:shadow-root>
      </market-stepper>
    `);
    });
    it('renders with input props initialized', async () => {
        const page = await newSpecPage({
            components: [MarketStepper],
            html: '<market-stepper value="0" step="5" max="10" min="0"></market-stepper>',
        });
        expect(page.root).toEqualHtml(`
      <market-stepper class="market-stepper" input-aria-label="Number" decrement-aria-label="Decrement" increment-aria-label="Increment" max="10" min="0" step="5" value="0">
        <mock:shadow-root>
          <button aria-label="Decrement" aria-label="Decrement" disabled tabindex="-1">
            <svg width="10" height="2" viewBox="0 0 10 2" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.66667 0.333328H0.333336V1.66666H9.66667V0.333328Z" />
            </svg>
          </button>
          <input aria-label="Number" max="10" min="0" part="native-input" placeholder="0" step="5" type="number" value="0">
          <button aria-label="Increment">
            <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.66665 9.66666V5.66666H9.66665V4.33333H5.66665V0.333328H4.33331V4.33333H0.333313V5.66666H4.33331V9.66666H5.66665Z" />
            </svg>
          </button>
        </mock:shadow-root>
      </market-stepper>
    `);
    });
    it('renders with disabled prop initialized', async () => {
        const page = await newSpecPage({
            components: [MarketStepper],
            html: '<market-stepper disabled></market-stepper>',
        });
        expect(page.root).toEqualHtml(`
      <market-stepper class="market-stepper" disabled input-aria-label="Number" decrement-aria-label="Decrement" increment-aria-label="Increment">
        <mock:shadow-root>
          <button aria-label="Decrement" disabled tabindex="-1">
            <svg width="10" height="2" viewBox="0 0 10 2" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.66667 0.333328H0.333336V1.66666H9.66667V0.333328Z" />
            </svg>
          </button>
          <input aria-label="Number" part="native-input" placeholder="0" step="1" type="number" disabled />
          <button aria-label="Increment" disabled tabindex="-1">
            <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.66665 9.66666V5.66666H9.66665V4.33333H5.66665V0.333328H4.33331V4.33333H0.333313V5.66666H4.33331V9.66666H5.66665Z" />
            </svg>
          </button>
        </mock:shadow-root>
      </market-stepper>
    `);
    });
    it('renders with aria-labels initialized', async () => {
        const page = await newSpecPage({
            components: [MarketStepper],
            html: `
        <market-stepper
          input-aria-label="Quantity"
          decrement-aria-label="Remove 1"
          increment-aria-label="Add 1">
        </market-stepper>
      `,
        });
        expect(page.root).toEqualHtml(`
      <market-stepper class="market-stepper" input-aria-label="Quantity" decrement-aria-label="Remove 1" increment-aria-label="Add 1" >
        <mock:shadow-root>
          <button aria-label="Remove 1">
            <svg width="10" height="2" viewBox="0 0 10 2" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.66667 0.333328H0.333336V1.66666H9.66667V0.333328Z" />
            </svg>
          </button>
          <input aria-label="Quantity" part="native-input" placeholder="0" step="1" type="number">
          <button aria-label="Add 1">
            <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.66665 9.66666V5.66666H9.66665V4.33333H5.66665V0.333328H4.33331V4.33333H0.333313V5.66666H4.33331V9.66666H5.66665Z" />
            </svg>
          </button>
        </mock:shadow-root>
      </market-stepper>
    `);
    });
    it('renders with disabled buttons if initial value matches max and/or min', async () => {
        const page = await newSpecPage({
            components: [MarketStepper],
            html: '<market-stepper value="5" max="5" min="5"></market-stepper>',
        });
        expect(page.root).toEqualHtml(`
      <market-stepper class="market-stepper" input-aria-label="Number" decrement-aria-label="Decrement" increment-aria-label="Increment" value="5" max="5" min="5">
        <mock:shadow-root>
          <button aria-label="Decrement" disabled tabindex="-1">
            <svg width="10" height="2" viewBox="0 0 10 2" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.66667 0.333328H0.333336V1.66666H9.66667V0.333328Z" />
            </svg>
          </button>
          <input aria-label="Number" max="5" min="5" part="native-input" placeholder="0" step="1" type="number" value="5">
          <button aria-label="Increment" disabled tabindex="-1">
            <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.66665 9.66666V5.66666H9.66665V4.33333H5.66665V0.333328H4.33331V4.33333H0.333313V5.66666H4.33331V9.66666H5.66665Z" />
            </svg>
          </button>
        </mock:shadow-root>
      </market-stepper>
    `);
    });
});
//# sourceMappingURL=market-stepper.spec.js.map
