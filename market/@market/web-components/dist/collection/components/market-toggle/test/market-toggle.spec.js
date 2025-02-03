import { newSpecPage } from "@stencil/core/testing";
import { MarketToggle } from "../market-toggle";
describe('market-toggle', () => {
    let page;
    describe('unchecked', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [MarketToggle],
                html: '<market-toggle></market-toggle>',
            });
        });
        it('renders correctly', () => {
            expect(page.root).toEqualHtml(`
        <market-toggle class="market-toggle">
          <mock:shadow-root>
            <input role="switch" type="checkbox">
            <svg aria-hidden="true" width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="38" height="22" rx="11" stroke-width="2" />
              <circle cx="12" cy="12" r="7" />
            </svg>
          </mock:shadow-root>
        </market-toggle>
      `);
        });
    });
    describe('checked', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [MarketToggle],
                html: '<market-toggle checked></market-toggle>',
            });
        });
        it('renders correctly', () => {
            expect(page.root).toEqualHtml(`
        <market-toggle checked class="market-toggle">
          <mock:shadow-root>
            <input checked role="switch" type="checkbox">
            <svg aria-hidden="true" width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="38" height="22" rx="11" stroke-width="2" />
              <circle cx="12" cy="12" r="7" />
            </svg>
          </mock:shadow-root>
        </market-toggle>
      `);
        });
    });
});
//# sourceMappingURL=market-toggle.spec.js.map
