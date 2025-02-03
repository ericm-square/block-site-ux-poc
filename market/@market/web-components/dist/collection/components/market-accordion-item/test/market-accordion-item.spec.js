import { newSpecPage } from "@stencil/core/testing";
import { MarketAccordionItem } from "../market-accordion-item";
describe('market-accordion-item', () => {
    it('renders a market accordion', async () => {
        const page = await newSpecPage({
            components: [MarketAccordionItem],
            html: '<market-accordion-item name="mockId"><span slot="label">mockLabel</span><p>mockContent</p></market-accordion-item>',
        });
        expect(page.root).toEqualHtml(`
      <market-accordion-item class="market-accordion-item" name="mockId" size="medium">
        <mock:shadow-root>
          <h3>
           <button aria-controls="mockId__content" id="mockId__button" type="button">
             <slot name="label"></slot>
             <market-icon name="chevron-down"></market-icon>
           </button>
         </h3>
        </mock:shadow-root>
        <span slot="label">mockLabel</span>
        <p>mockContent</p>
      </market-accordion-item>
    `);
    });
    it('renders an expanded market accordion', async () => {
        const page = await newSpecPage({
            components: [MarketAccordionItem],
            html: `
        <market-accordion-item name="mockId" expanded>
            <span slot="label">mockLabel</span>
            <p>mockContent</p>
        </market-accordion-item>
      `,
        });
        expect(page.root).toEqualHtml(`
      <market-accordion-item class="market-accordion-item" name="mockId" expanded size="medium">
        <mock:shadow-root>
          <h3>
           <button aria-controls="mockId__content" id="mockId__button" aria-expanded="" type="button">
             <slot name="label"></slot>
             <market-icon name="chevron-down"></market-icon>
           </button>
          </h3>
          <div aria-labelledby="mockId__button" class="accordion-content" id="mockId__content" role="region">
           <slot></slot>
          </div>
        </mock:shadow-root>
        <span slot="label">mockLabel</span>
        <p>mockContent</p>
      </market-accordion-item>
    `);
    });
    it('renders a small market accordion', async () => {
        const page = await newSpecPage({
            components: [MarketAccordionItem],
            html: `
        <market-accordion-item name="mockId" size="small">
          <span slot="label">mockLabel</span>
          <p>mockContent</p>
        </market-accordion-item>
      `,
        });
        expect(page.root).toEqualHtml(`
      <market-accordion-item class="market-accordion-item" name="mockId" size="small">
        <mock:shadow-root>
          <h4>
           <button aria-controls="mockId__content" id="mockId__button" type="button">
             <slot name="label"></slot>
             <market-icon name="chevron-down"></market-icon>
           </button>
         </h4>
        </mock:shadow-root>
        <span slot="label">mockLabel</span>
        <p>mockContent</p>
      </market-accordion-item>
    `);
    });
    it('renders a disabled market accordion', async () => {
        const page = await newSpecPage({
            components: [MarketAccordionItem],
            html: '<market-accordion-item name="mockId" disabled><span slot="label">mockLabel</span><p>mockContent</p></market-accordion-item>',
        });
        expect(page.root).toEqualHtml(`
      <market-accordion-item class="market-accordion-item" name="mockId" size="medium" disabled="">
        <mock:shadow-root>
          <h3>
           <button aria-controls="mockId__content" id="mockId__button" aria-disabled="" disabled="" type="button">
             <slot name="label"></slot>
             <market-icon name="chevron-down"></market-icon>
           </button>
         </h3>
        </mock:shadow-root>
        <span slot="label">mockLabel</span>
        <p>mockContent</p>
      </market-accordion-item>
    `);
    });
});
//# sourceMappingURL=market-accordion-item.spec.js.map
