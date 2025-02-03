import { newSpecPage } from "@stencil/core/testing";
import { MarketRadio } from "../market-radio";
describe('market-radio', () => {
    let page;
    describe('unselected', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [MarketRadio],
                html: '<market-radio></market-radio>',
            });
        });
        it('renders correctly', () => {
            expect(page.root).toEqualHtml(`
        <market-radio class="market-radio">
          <mock:shadow-root>
            <input type="radio">
          </mock:shadow-root>
        </market-radio>
      `);
        });
    });
    describe('selected', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [MarketRadio],
                html: '<market-radio selected></market-radio>',
            });
        });
        it('renders correctly', () => {
            expect(page.root).toEqualHtml(`
        <market-radio selected class="market-radio">
          <mock:shadow-root>
            <input checked type="radio">
            <svg height="6" viewBox="0 0 6 6" width="6" xmlns="http://www.w3.org/2000/svg">
              <circle cx="3" cy="3" r="3"></circle>
            </svg>
          </mock:shadow-root>
        </market-radio>
      `);
        });
    });
});
//# sourceMappingURL=market-radio.spec.js.map
