import { newSpecPage } from "@stencil/core/testing";
import { MarketCheckbox } from "../market-checkbox";
describe('market-checkbox', () => {
    let page;
    describe('unchecked', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [MarketCheckbox],
                html: '<market-checkbox></market-checkbox>',
            });
        });
        it('renders correctly', () => {
            expect(page.root).toEqualHtml(`
        <market-checkbox class="market-checkbox">
          <mock:shadow-root>
            <input type="checkbox">
          </mock:shadow-root>
        </market-checkbox>
      `);
        });
    });
    describe('checked', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [MarketCheckbox],
                html: '<market-checkbox checked></market-checkbox>',
            });
        });
        it('renders correctly', () => {
            expect(page.root).toEqualHtml(`
        <market-checkbox checked class="market-checkbox">
          <mock:shadow-root>
            <input checked type="checkbox">
            <svg data-testid="check" fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 10L8.85714 13L14 7" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
            </svg>
          </mock:shadow-root>
        </market-checkbox>
      `);
        });
    });
    describe('indeterminate', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [MarketCheckbox],
                html: '<market-checkbox indeterminate></market-checkbox>',
            });
        });
        it('renders correctly', () => {
            expect(page.root).toEqualHtml(`
        <market-checkbox indeterminate class="market-checkbox">
          <mock:shadow-root>
            <input indeterminate type="checkbox">
            <svg data-testid="indeterminate" fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 10H14" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
            </svg>
          </mock:shadow-root>
        </market-checkbox>
      `);
        });
    });
});
//# sourceMappingURL=market-checkbox.spec.js.map
